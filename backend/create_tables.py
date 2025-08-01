from dotenv import load_dotenv
load_dotenv()

from models import users
from database import engine, metadata

print("Creating database tables...")
metadata.create_all(engine)
print("Tables created successfully.")
