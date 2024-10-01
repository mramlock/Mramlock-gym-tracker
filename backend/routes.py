from app import app, db
from flask import request, jsonify
from models import Workouts

#get all workouts
@app.route("/api/workouts", methods=["GET"])
def get_workouts():
    workouts = Workouts.query.all() 
    result = [workout.to_json() for workout in workouts]
    return jsonify(result)

#create a wrkout
@app.route("/api/workouts",methods=["POST"])
def create_workout():
    try:
        data = request.json
        #validations
        required_fields = ["name", "desc", "bodyPart"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error":f'Missing required field: {field}'}), 400
        name = data.get("name")
        #role = data.get("role")
        desc = data.get("desc")
        bodyPart = data.get("bodyPart")

        #fetch image based on bodypart
        if bodyPart == "legs":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif bodyPart== "back":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None

        new_workout = Workouts(name=name, desc = desc, bodyPart = bodyPart, img_url = img_url)
        db.session.add(new_workout)
        db.session.commit()

        return jsonify(new_workout.to_json()),201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500

# Delete a Workout
@app.route("/api/workouts/<int:id>", methods=["DELETE"])
def delete_friend(id):
  try:
    workout = Workouts.query.get(id)
    if workout is None:
      return jsonify({"error":"workout not found"}), 404
    
    db.session.delete(workout)
    db.session.commit()
    return jsonify({"msg":"workout deleted"}), 200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500
  
#update workout
@app.route("/api/workouts/<int:id>",methods=["PATCH"])
def update_friend(id):
  try:
    workout = Workouts.query.get(id)
    if workout is None:
      return jsonify({"error":"Workout not found"}), 404
    
    data = request.json

    workout.name = data.get("name",workout.name)
    #friend.role = data.get("role",.role)
    workout.desc = data.get("desc",workout.desc)
    workout.bodyPart = data.get("bodyPart",workout.bodyPart)

    db.session.commit()
    return jsonify(workout.to_json()),200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500