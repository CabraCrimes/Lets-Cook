from flask import Blueprint, jsonify, request, Flask
from flask_cors import CORS
from decouple import config 
import requests

api_bp = Blueprint('api_bp', __name__)

CORS(api_bp, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# API EDAMAM
@api_bp.route('/recipes/<ingredient>')
def get_recipes(ingredient):
    app_id = config('API_ID')
    app_key = config('API_KEY')
    api_url = f'https://api.edamam.com/search?q={ingredient}&app_id={app_id}&app_key={app_key}'
    
    response = requests.get(api_url)
    data = response.json()
    
    return jsonify(data)

# Get Favourite From EDAMAM
# @api_bp.route('/recipes/favourite/<favourite>')
# def get_favourite(favourite):
#     app_id = config('API_ID')
#     app_key = config('API_KEY')
#     api_url = f'https://api.edamam.com/search?q={favourite}&app_id={app_id}&app_key={app_key}'
    
#     response = requests.get(api_url)
#     data = response.json()
    
#     return jsonify(data)

