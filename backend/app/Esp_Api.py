from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Store sensor data
sensor_data = {"temperature": None, "humidity": None}

@app.route("/data", methods=["POST"])
def receive_data():
    global sensor_data
    data = request.json
    sensor_data["temperature"] = data.get("temperature")
    sensor_data["humidity"] = data.get("humidity")
    return jsonify({"message": "Data received"}), 200

@app.route("/data", methods=["GET"])
def send_data():
    return jsonify(sensor_data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
