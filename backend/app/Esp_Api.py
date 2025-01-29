from flask import Blueprint, request, jsonify

esp_api = Blueprint("esp_api", __name__)
# Store sensor data
sensor_data = {"temperature": None, "humidity": None}

@esp_api.route("/data", methods=["POST"])
def receive_data():
    global sensor_data
    data = request.json
    sensor_data["temperature"] = data.get("temperature")
    sensor_data["humidity"] = data.get("humidity")
    return jsonify({"message": "Data received"}), 200

@esp_api.route("/data", methods=["GET"])
def send_data():
    return jsonify(sensor_data)
