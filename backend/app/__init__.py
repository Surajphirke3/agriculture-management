from flask import Flask
from app.extensions import mongo
from app.config import Config
from app.inventory.routes.user_routes import auth_bp
from app.inventory.routes.item_routes import inventory_bp
# from app.chatbot_routes import assistant_bp
from app.assistant.chatbot import assistant_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.secret_key = app.config["SECRET_KEY"]

    # Initialize extension
    mongo.init_app(app)
    print("Database Connected")
    # Register blueprints
    app.register_blueprint(auth_bp,url_prefix="/api/auth")
    app.register_blueprint(inventory_bp, url_prefix="/api/inventory")
    app.register_blueprint(assistant_bp, url_prefix="/api/assistant")
    
    # app.register_blueprint(assistant_bp1, url_prefix="/api/assistant")
    return app