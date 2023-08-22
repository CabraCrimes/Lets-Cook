from flask import Blueprint, jsonify

api_bp = Blueprint('api', __name__)

@api_bp.route('/api')
def get_data():
    data = {
        'msg': 'API test', 
        'data': [1,2,3,4,5]
        }
    return jsonify(data)