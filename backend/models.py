from app import db

class Workouts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    #role = db.Column(db.String(50), nullable=False)
    desc = db.Column(db.Text, nullable=False)
    bodyPart = db.Column(db.String(10), nullable=False)
    img_url = db.Column(db.String(200), nullable=True)


    def to_json(self):
        return{
            "id":self.id,
            "name":self.name,
            #"role":self.role,
            "desc":self.desc,
            "bodyPart":self.bodyPart,
            "imgUrl":self.img_url,

        }