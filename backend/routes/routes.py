from flask import Blueprint
from app.models import User

api_route = Blueprint('api_route', __name__)

@api_route.route("/")
def hello_world():
    return "<h1>Hello, World!</h1>"

