from fastapi import APIRouter, Request
from pydantic import BaseModel
from openai_client import ask_gpt 

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat_endpoint(request: Request):
    data = await request.json()
    user_message = data.get("message", "").lower()

    reply = ask_gpt(user_message)

    return {"reply": reply}
