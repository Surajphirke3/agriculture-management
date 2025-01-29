from flask import Blueprint, request,jsonify
from app.waste_management.service import (add_waste_record, get_record, get_records, update_record_service,delete_record_service,get_total_waste_reduction,get_total_waste_quantity)

waste_management_bp = Blueprint("waste_management", __name__)

@waste_management_bp.route("/records", methods=["POST"])
def add_item_route():
    data = request.json
    return add_waste_record(data)  

@waste_management_bp.route("/records/<record_id>", methods=["GET"])
def get_item_route(item_id):
    return get_record(item_id)  

@waste_management_bp.route("/records", methods=["GET"])
def get_items_route():
    user_id = request.args.get("userId")
    return get_records(user_id)  

@waste_management_bp.route("/records/<record_id>", methods=["PUT"])
def update_item_route(item_id):
    data = request.json
    return update_record_service(item_id, data)  

@waste_management_bp.route("/records/<record_id>", methods=["DELETE"])
def delete_item_route(item_id):
    return delete_record_service(item_id)  

@waste_management_bp.route("/total_waste_reduc", methods=["GET"])
def total_waste_reduction(): 
    return get_total_waste_reduction()

@waste_management_bp.route("/total-compost-material", methods=["GET"])
def total_waste_quantity():
    return get_total_waste_quantity()