from flask import Flask, jsonify, request
from api.api import api_bp
from routes.routes import api_route
from .models import db
from flask_migrate import Migrate


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Bigboobs00%40@localhost/Lets-Cook-Database'

db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(api_bp, url_prefix='/api')
app.register_blueprint(api_route, url_prefix='/api')

if __name__ == '__main__':
    app.run()