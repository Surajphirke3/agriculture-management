from app.inventory.models.items import Item
from app.db import get_items_collection
from flask import request, jsonify
from bson import ObjectId

from app.db import get_items_collection
from flask import jsonify
from bson import ObjectId

def add_item(item):
    items_collection = get_items_collection()
    
    if item.get("quantity") is None:
        item["quantity"] = "kg"
    if "userId" not in item:
        return jsonify({"error": "User ID required"}), 400  
    if "location" not in item:
        return jsonify({"error": "Location required"}), 400

    try:
        item["userId"] = ObjectId(item["userId"])  # Convert userId to ObjectId
    except:
        return jsonify({"error": "Invalid User ID format"}), 400  

    items_collection.insert_one(item)
    return jsonify({"message": "Item added successfully"}), 201  

def get_item(item_id):
    items_collection = get_items_collection()
    item = items_collection.find_one({"_id": ObjectId(item_id)})  
    if item:
        item["_id"] = str(item["_id"])  
        item["userId"] = str(item["userId"])  
        return jsonify(item), 200  
    return jsonify({"error": "Item not found"}), 404

def get_items(userId):
    items_collection = get_items_collection()
    try:
        userId = ObjectId(userId)  # Convert to ObjectId
    except:
        return jsonify({"error": "Invalid User ID format"}), 400
    
    items = list(items_collection.find({"userId": userId}))  
    
    for item in items:
        item["_id"] = str(item["_id"])  
        item["userId"] = str(item["userId"])  

    return jsonify(items), 200

def update_item_service(item_id, item):
    items_collection = get_items_collection()
    
    if item.get("quantity") is None:
        item["quantity"] = "kg"
    if "userId" not in item:
        return jsonify({"error": "User ID required"}), 400
    if "location" not in item:
        return jsonify({"error": "Location required"}), 400

    try:
        item["userId"] = ObjectId(item["userId"])  # Convert userId
    except:
        return jsonify({"error": "Invalid User ID format"}), 400

    result = items_collection.update_one({"_id": ObjectId(item_id)}, {"$set": item})
    
    if result.matched_count == 0:
        return jsonify({"error": "Item not found"}), 404
    
    return jsonify({"message": "Item updated successfully"}), 200

def delete_item_service(item_id):
    items_collection = get_items_collection()
    result = items_collection.delete_one({"_id": ObjectId(item_id)})

    if result.deleted_count == 0:
        return jsonify({"error": "Item not found"}), 404
    
    return jsonify({"message": "Item deleted successfully"}), 200
