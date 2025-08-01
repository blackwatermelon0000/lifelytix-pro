from fastapi import FastAPI, HTTPException, Depends, status, Request
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

from database import database
from models import users
from chat import router as chat_router  # GPT chat logic

# === Load env variables ===
load_dotenv()

# === JWT config ===
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# === FastAPI app ===
app = FastAPI()

# === Enable CORS (for frontend) ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === DB connection events ===
@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# === Password hashing ===
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# === Token helpers ===
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# === OAuth2 token ===
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    query = users.select().where(users.c.email == email)
    user = await database.fetch_one(query)

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return user

# === Schemas ===
class RegisterUser(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    role: str = "user"

class LoginUser(BaseModel):
    email: EmailStr
    password: str

# === Routes ===
@app.get("/")
def root():
    return {"message": "Lifelytix API is running!"}

@app.post("/register")
async def register_user(user: RegisterUser):
    existing = await database.fetch_one(users.select().where(users.c.email == user.email))
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered.")
    hashed_pw = hash_password(user.password)
    insert_query = users.insert().values(
        email=user.email,
        full_name=user.full_name,
        hashed_password=hashed_pw,
        role=user.role
    )
    await database.execute(insert_query)
    return {"message": "User registered successfully!"}

@app.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db_user = await database.fetch_one(users.select().where(users.c.email == form_data.username))
    if not db_user or not verify_password(form_data.password, db_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials.")
    token_data = {"sub": db_user["email"]}
    access_token = create_access_token(data=token_data)
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/me")
async def read_current_user(current_user: dict = Depends(get_current_user)):
    return {
        "email": current_user["email"],
        "full_name": current_user["full_name"]
    }

@app.get("/admin")
async def admin_dashboard(current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Access forbidden: Admins only")
    return {
        "message": "Welcome, admin!",
        "email": current_user["email"],
        "role": current_user["role"]
    }

# === Mount GPT chat router ===
app.include_router(chat_router)
