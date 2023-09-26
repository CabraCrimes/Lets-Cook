from flask import Blueprint, jsonify, request
from app.models import Users, Favourites, db
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api_route = Blueprint('api_route', __name__)

CORS(api_route, resources={r"/api/*": {"origins": "http://localhost:3000"}})

#Create a user
@api_route.route("/create/user", methods=['POST'])
def create_user():
    data = request.get_json()
    already_have_email = Users.query.filter_by(email=data["email"]).first()
    if already_have_email:
        return jsonify({'message': 'User email already exists'}), 400
    new_user = Users(username = data["username"], email = data["email"], password = data["password"])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

#Get all users
@api_route.route("/get/all/users", methods=['GET'])
def get_all_users():
    users = Users.query.all()
    user_list = []
    for user in users:
        user_list.append({'id':user.id ,'username': user.username, 'email': user.email})
    return jsonify({'users': user_list})

#Get one user
@api_route.route("/get/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = Users.query.get_or_404(user_id)
    if user:
        return jsonify({'id':user.id ,'username': user.username, 'email': user.email})
    else:
        return jsonify({'message': 'No user found'})

#Update user
@api_route.route("/update/user/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.get_json()
    user = Users.query.get_or_404(user_id)
    user.username = data['username']
    user.email = data['email']
    user.password = data['password']
    db.session.commit()
    return jsonify({'message': 'user updated'})

#Delete user
@api_route.route("/user/delete/<int:user_id>", methods=['DELETE'])
def delete_user(user_id):
    user = Users.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted'})

#JWT Login
@api_route.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    user = Users.query.filter_by(email=data["email"], password=data["password"]).first()
    if user:
        token = create_access_token(identity=user.id)
        return jsonify({'token': token, 'user': user.username, 'id': user.id})
    return  jsonify({'message': "No matching user"}),200

# Add favourite
@api_route.route("/add/favourite", methods=['POST'])
def add_favourite():
    data = request.get_json()

    existing_favourite = Favourites.query.filter_by(user_id=data['user_id'], recipe_label=data['recipe_label']).first()
    if existing_favourite:
        return jsonify({'message': "Favourite already exists"}),200
    
    user_favourite = Favourites.query.filter_by(user_id=data['user_id'], recipe_label=data['recipe_label']).first()
    db.session.add(user_favourite)
    db.session.commit()
    return jsonify({'message': 'Favourite added'})
        
# Get Favourite
@api_route.route("/get/<favourite>", methods=['GET'])
@jwt_required()
def get_favourite(favourite):
    current_user_id = get_jwt_identity()
    user_favourite = Favourites.query.filter_by(user_id=current_user_id).all()
    favourite_list = []
    for favourite in user_favourite:
        favourite_list.append({'id':favourite.id ,'recipe_label': favourite.recipe_label})
    return jsonify({'favourite': favourite_list})