from flask import Blueprint, jsonify, request, Flask
from flask_cors import CORS
import requests

api_bp = Blueprint('api_bp', __name__)

CORS(api_bp, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# API EDAMAM
@api_bp.route('/recipes/<ingredient>')
def get_recipes(ingredient):
    app_id = '9528e0a9'
    app_key = '5c5fe2ef71d1c1e1ef728246cb78f0e1'
    api_url = f'https://api.edamam.com/search?q={ingredient}&app_id={app_id}&app_key={app_key}'
    
    response = requests.get(api_url)
    data = response.json()
    
    return jsonify(data)


