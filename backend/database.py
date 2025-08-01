import os
from sqlalchemy import create_engine, MetaData
from databases import Database
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Get URL from env
DATABASE_URL = os.getenv("DATABASE_URL")

# Async DB connection for FastAPI
database = Database(DATABASE_URL)

# SQLAlchemy engine for migrations, metadata
engine = create_engine(DATABASE_URL)
metadata = MetaData()
