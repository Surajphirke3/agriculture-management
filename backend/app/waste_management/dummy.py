


    # Avoid division by zero

    change = 0

    if previous_quantity != 0:

        change = ((current_quantity - previous_quantity) / previous_quantity) * 100



    # Update the latest record with the change percentage

    waste_collection.update_one(

        {"_id": ObjectId(waste_entries[0]["_id"])},

        {"$set": {"percentageChange": round(change, 2)}}

    )



    return {"product": product_name, "percentageChange": round(change, 2)}



@app.route("/update_waste", methods=["POST"])

def update_waste():

    """API to add waste entry and calculate change"""

    data = request.json

    if not data or "product" not in data or "quantity" not in data:

        return jsonify({"error": "Invalid request data"}), 400



    # Insert new waste entry

    new_entry = {

        "product": data["product"],

        "quantity": data["quantity"],

        "reason": data.get("reason", ""),

        "status": data.get("status", ""),

        "location": data.get("location", ""),

        "date": data.get("date", ""),

        "env_impact": data.get("env_impact", "")

    }



    waste_collection.insert_one(new_entry)



    # Calculate percentage change

    result = calculate_waste_change(data["product"])

    return jsonify(result)



if _name_ == "_main_":

    app.run(debug=True)
