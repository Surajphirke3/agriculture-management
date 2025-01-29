import os
from urllib.parse import quote_plus

class Config:
    username = quote_plus("dhruvjaink07")
    password = quote_plus("12345678@abc")
    MONGO_URI = f"mongodb+srv://{username}:{password}@cluster0.p2x54.mongodb.net/food_safety?retryWrites=true&w=majority"
    DEBUG = True
    SECRET_KEY = os.getenv("SECRET_KEY", "Hello_world")  # Secure session key
