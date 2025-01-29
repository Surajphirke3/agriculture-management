from bson import ObjectId

class WasteRecord:
    def __init__(self, product, quantity, reason, status, location,userId, date,Env_impact):
        self.product = product
        self.quantity = quantity
        self.reason = reason
        self.status = status
        self.location = location
        self.date = date
        self.userId = userId
        self.Env_impact = Env_impact

    def to_dict(self):
        return{
            "product" : self.product,
            "quantity" : self.quantity,
            "reason" : self.reason,
            "status" : self.status,
            "location" : self.location,
            "userId": ObjectId(self.userId) ,
            "date" : self.date,
            "Env_impact" : self.Env_impact

        }