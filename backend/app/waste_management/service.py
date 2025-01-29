from app.waste_management.models import WasteRecord
from app.db import get_waste_record_collection
from flask import request, jsonify
from bson import ObjectId

def add_waste_record(record):
    waste_record_collection = get_waste_record_collection()

    # if record.get("location")  not in record:
    #     return jsonify({"message":"Location is required"}),400
    
    # if record.get("date") not in record:
    #     return jsonify({"message":"Date is required"}), 400
    
    try:
        record["userId"] = ObjectId(record["userId"])
    except:
        return jsonify({"error": "Invalid User ID format"}), 400  
    
    waste_record_collection.insert_one(record)
    return jsonify({"message": "Record added successfully"}), 201

def get_record(record_id):
    waste_record_collection = get_waste_record_collection()
    item = waste_record_collection.find_one({"_id": ObjectId(record_id)})  
    if item:
        item["_id"] = str(item["_id"])  
        item["userId"] = str(item["userId"])  
        return jsonify(item), 200  
    return jsonify({"error": "record not found"}), 404

def get_records(userId):
    waste_record_collection = get_waste_record_collection()
    try:
        userId = ObjectId(userId)  # Convert to ObjectId
    except:
        return jsonify({"error": "Invalid User ID format"}), 400
    
    items = list(waste_record_collection.find({"userId": userId}))  
    
    for item in items:
        item["_id"] = str(item["_id"])  
        item["userId"] = str(item["userId"])  

    return jsonify(items), 200

def update_record_service(record_id, record):
    waste_record_collection = get_waste_record_collection()
    
    # if record.get("location")  not in record:
    #     return jsonify({"message":"Location is required"}),400
    
    # if record.get("date") not in record:
        # return jsonify({"message":"Date is required"}), 400
    
    
    try:
        record["userId"] = ObjectId(record["userId"])  # Convert userId
    except:
        return jsonify({"error": "Invalid User ID format"}), 400

    result = waste_record_collection.update_one({"_id": ObjectId(record_id)}, {"$set": record})
    
    if result.matched_count == 0:
        return jsonify({"error": "record not found"}), 404
    
    return jsonify({"message": "record updated successfully"}), 200

def delete_record_service(record_id):
    waste_record_collection = get_waste_record_collection()
    result = waste_record_collection.delete_one({"_id": ObjectId(record_id)})

    if result.deleted_count == 0:
        return jsonify({"error": "record not found"}), 404
    
    return jsonify({"message": "record deleted successfully"}), 200

def get_total_waste_reduction():
    waste_record_collection = get_waste_record_collection()
    records = list(waste_record_collection.find())

    # Ensure 'quantity' is numeric and not None
    total_waste = sum(
        int(record["quantity"]) for record in records if isinstance(record.get("quantity"), (int, float))
    )

    reduced_waste = sum(
        int(record["quantity"]) for record in records if record.get("status") in ["Reused", "Composting"] and isinstance(record.get("quantity"), (int, float))
    )

    # Avoid division by zero
    if total_waste == 0:
        return jsonify({"total_waste": 0, "reduced_waste": 0, "waste_reduction_percentage": "0%"}), 200

    # Correct percentage calculation
    reduction_percentage = (reduced_waste / total_waste) * 100

    return jsonify({
        "total_waste": total_waste,
        "reduced_waste": reduced_waste,
        "waste_reduction_percentage": f"{reduction_percentage:.2f}%"
    }), 200


def get_total_waste_quantity():
    waste_record_collection = get_waste_record_collection()

    # Fetch all waste records and sum the "quantity" field
    total_quantity = sum(record.get("quantity", 0) for record in waste_record_collection.find())

    return jsonify({"total_waste_quantity": total_quantity}), 200
