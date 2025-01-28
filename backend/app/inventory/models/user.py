from app.extensions import mongo
from bson.objectid import ObjectId

def create_user(data):
    if "role" not in data:
        data["role"] = "user"
    mongo.db.users.insert_one(data)

def find_user_by_username(username):
    return mongo.db.users.find_one({"username": username})

def find_user_by_id(user_id):
    return mongo.db.users.find_one({"_id": ObjectId(user_id)})

# Find a user by their role (for admin check)
def find_user_by_role(role):
    return mongo.db.users.find_one({"role": role})