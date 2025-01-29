from app.assistant.chatbot_routes import generate_response
from flask import Blueprint, request, jsonify


assistant_bp = Blueprint("assistant", __name__)

@assistant_bp.route("/chatbot", methods=["POST"])
def chatbot_route():
    data = request.json
    prompt = data.get("prompt")
    result = generate_response(prompt=prompt)
    return jsonify(result)