# app.py
from flask import Flask
from routes.player_routes import player_bp
from routes.team_routes import team_bp
from routes.tournament_routes import tournament_bp 
from routes.player_batting_stats_routes import bp as batting_stats_bp
from routes.batting_routes import batting_bp
from routes.ball_by_ball_routes import ball_by_ball_bp
from routes.cricket_match_routes import cricket_match_bp

# Import other model routes here when needed

app = Flask(__name__)

# Register blueprints for routes
app.register_blueprint(player_bp, url_prefix='/players')
app.register_blueprint(team_bp,url_prefix='/teams')
app.register_blueprint(tournament_bp,url_prefix='/tournaments')
app.register_blueprint(batting_stats_bp,url_prefix='/player_batting_stats')
app.register_blueprint(batting_bp,url_prefix='/batting')
app.register_blueprint(cricket_match_bp)
app.register_blueprint(ball_by_ball_bp)

# Registering the batting routes

if __name__ == '__main__':
    app.run(debug=True)
