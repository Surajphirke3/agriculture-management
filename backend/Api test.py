# from flask import Flask, request, jsonify
# import numpy as np
# import tensorflow as tf

# app = Flask(__name__)

# # Load your custom .h5 model
# yield_model = tf.keras.models.load_model("E:\Hackathons\OdooXNirman\code\my_custom_model.h5")

# @app.route('/predict_yield', methods=['POST'])
# def predict_yield():
#     data = request.json
#     try:
#         soil_data = np.array(data['soil']).reshape(1, -1)
#         weather_data = np.array(data['weather']).reshape(1, -1)
        
#         # Combine data for yield prediction
#         input_data = np.concatenate([soil_data, weather_data], axis=1)
#         predicted_yield = yield_model.predict(input_data)
        
#         return jsonify({'predicted_yield': predicted_yield.tolist()})
#     except Exception as e:
#         return jsonify({'error': str(e)})

