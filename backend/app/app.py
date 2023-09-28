from flask import Flask
from flask_migrate import Migrate
from app.models import db
from api.api import api_bp
from routes.routes import api_route
from decouple import config 
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app)
sql_database_uri = config('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_DATABASE_URI'] = sql_database_uri

jwt_key = config('JWT_SECRET_KEY')
app.config["JWT_SECRET_KEY"] = jwt_key  
jwt = JWTManager(app)

db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(api_bp, url_prefix='/api')
app.register_blueprint(api_route, url_prefix='/api')

if __name__ == '__main__':
    app.run()