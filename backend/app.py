from flask import Flask, jsonify, request
from api.api import api_bp
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Bigboobs00%40@localhost/Lets-Cook-Database'

app.register_blueprint(api_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run()