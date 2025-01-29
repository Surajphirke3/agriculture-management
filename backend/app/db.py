from app.extensions import mongo

def get_items_collection():
    return mongo.db.items