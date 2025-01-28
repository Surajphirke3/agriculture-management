from app.config import Config
from app.inventory.models.user import create_user, find_user_by_username

def register_user(username, password, role="farmer"):
    if role not in ["farmer", "distributor", "retailer"]:
        raise ValueError("Invalid role. Role must be 'farmer', 'distributor', or 'retailer'")

    if find_user_by_username(username):
        raise ValueError("Username already exists")

    create_user({"username": username, "password": password, "role": role})
    return True, f"User '{username}' registered successfully with role '{role}'"

def login_user(username, password):
    user = find_user_by_username(username)
    if user and password == user["password"]:
        return user
    return None
