from flask import Blueprint, request, jsonify
from bson import ObjectId
from app.inventory.services.items_service import (
    add_item, get_item, get_items, update_item_service, delete_item_service
)

inventory_bp = Blueprint("inventory", __name__)

@inventory_bp.route("/items", methods=["POST"])
def add_item_route():
    data = request.json
    return add_item(data)  

@inventory_bp.route("/items/<item_id>", methods=["GET"])
def get_item_route(item_id):
    return get_item(item_id)  

@inventory_bp.route("/items", methods=["GET"])
def get_items_route():
    user_id = request.args.get("userId")
    return get_items(user_id)  

@inventory_bp.route("/items/<item_id>", methods=["PUT"])
def update_item_route(item_id):
    data = request.json
    return update_item_service(item_id, data)  

@inventory_bp.route("/items/<item_id>", methods=["DELETE"])
def delete_item_route(item_id):
    return delete_item_service(item_id)  
