import os

class Config:
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/food_safety")
    DEBUG = True
    SECRET_KEY = os.getenv("SECRET_KEY", "Hello_world")  # Secure session key
