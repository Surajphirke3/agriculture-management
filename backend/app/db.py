from app.extensions import mongo

def get_items_collection():
    return mongo.db.items

def get_waste_record_collection():
    return mongo.db.waste_record