from sqlalchemy import Table, Column, Integer, String
from database import metadata

users = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("email", String, unique=True, index=True),
    Column("full_name", String),
    Column("hashed_password", String),
    Column("role", String, default="user")  # NEW
)
