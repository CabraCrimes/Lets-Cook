from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    favourites = db.relationship('Favourites', backref='users', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'
    
    
class Favourites (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_label = db.Column(db.String(140), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)