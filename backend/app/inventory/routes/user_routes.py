from flask import Blueprint, request, jsonify
from app.inventory.services.user_service import register_user, login_user

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    username = data.get("username")
    password = data.get("password")
    role = data.get("role")

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400
    
    success, message = register_user(username, password, role)
    status = 201 if success else 400
    return jsonify({"message": message}), status

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    user = login_user(username, password)
    if user:
        user["_id"] = str(user["_id"])     
        return jsonify(user), 200
    return jsonify({"error": "Invalid username or password"}), 400