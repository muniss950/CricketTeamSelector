# app.py
from flask import Flask
from routes.player_routes import player_bp
# Import other model routes here when needed

app = Flask(__name__)

# Register blueprints for routes
app.register_blueprint(player_bp, url_prefix='/players')
# app.register_blueprint(other_model_bp, url_prefix='/other_model')  # Register other models

if __name__ == '__main__':
    app.run(debug=True)
