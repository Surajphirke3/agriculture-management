from bson import ObjectId

class Item:
    def __init__(self, name, unit, status, expiryDate, userId, location, alerts, quantity="kg"):
        self.name = name
        self.quantity = quantity
        self.unit = unit
        self.status = status
        self.expiryDate = expiryDate
        self.userId = ObjectId(userId) if isinstance(userId, str) else userId
        self.location = location
        self.alerts = alerts

    def to_dict(self):
        return {
            "name": self.name,
            "quantity": self.quantity,
            "unit": self.unit,
            "status": self.status,
            "expiryDate": self.expiryDate,
            "userId": str(self.userId),
            "location": self.location,
            "alerts": self.alerts
        }
