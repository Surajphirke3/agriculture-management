from flask import request, jsonify, Blueprint

esp_api = Blueprint("esp_api",__name__)

# Store received data
sensor_data = {"temperature": None, "humidity": None}

@esp_api.route("/", methods=["POST"])
def receive_data():
    global sensor_data
    data = request.json

    # Extract temperature and humidity
    sensor_data["temperature"] = data.get("temperature")
    sensor_data["humidity"] = data.get("humidity")

    print(f"Received Data -> Temperature: {sensor_data['temperature']}°C, Humidity: {sensor_data['humidity']}%")
    
    return jsonify({"message": "Data received successfully"}), 200

@esp_api.route("/", methods=["GET"])
def fetch_data():
    return jsonify(sensor_data)  # Returns the latest data
