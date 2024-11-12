# # app.py
# from flask import Flask
# from flask_cors import CORS
# from routes.player_routes import player_bp

# from routes.team_routes import team_bp
# from routes.tournament_routes import tournament_bp 
# from routes.player_batting_stats_routes import player_batting_bp 
# from routes.batting_routes import batting_bp
# from routes.ball_by_ball_routes import ball_by_ball_bp
# from routes.cricket_match_routes import cricket_match_bp
# from routes.bowling_routes import bowling_bp
# from routes.inning_routes import inning_bp
# from routes.player_bowling_stats_routes import bowling_stats_bp
# from routes.squad_routes import squad_bp
# from routes.teams_list_routes import teams_list_bp
# from routes.scorecard_routes import scorecard_bp


# app = Flask(__name__)
# CORS(app)
# app.register_blueprint(player_bp)
# app.register_blueprint(team_bp)
# app.register_blueprint(tournament_bp)
# app.register_blueprint(player_batting_bp)
# app.register_blueprint(batting_bp)
# app.register_blueprint(cricket_match_bp)
# app.register_blueprint(ball_by_ball_bp)
# app.register_blueprint(bowling_bp)
# app.register_blueprint(inning_bp)
# app.register_blueprint(bowling_stats_bp)
# app.register_blueprint(squad_bp)
# app.register_blueprint(teams_list_bp)
# app.register_blueprint(scorecard_bp)

# @app.route('/')
# def home():
#     return "Welcome to the Cricket Team Selector!"  
# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes, restricted to 'http://localhost:3000'
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Import and register blueprints
from routes.player_routes import player_bp
from routes.team_routes import team_bp
from routes.tournament_routes import tournament_bp
from routes.player_batting_stats_routes import player_batting_bp
from routes.batting_routes import batting_bp
from routes.ball_by_ball_routes import ball_by_ball_bp
from routes.cricket_match_routes import cricket_match_bp
from routes.bowling_routes import bowling_bp
from routes.inning_routes import inning_bp
from routes.player_bowling_stats_routes import bowling_stats_bp
from routes.squad_routes import squad_bp
from routes.teams_list_routes import teams_list_bp
from routes.scorecard_routes import scorecard_bp
from routes.user_routes import user_bp

# Register all blueprints with the app
app.register_blueprint(player_bp)
app.register_blueprint(team_bp)
app.register_blueprint(tournament_bp)
app.register_blueprint(player_batting_bp)
app.register_blueprint(batting_bp)
app.register_blueprint(cricket_match_bp)
app.register_blueprint(ball_by_ball_bp)
app.register_blueprint(bowling_bp)
app.register_blueprint(inning_bp)
app.register_blueprint(bowling_stats_bp)
app.register_blueprint(squad_bp)
app.register_blueprint(teams_list_bp)
app.register_blueprint(scorecard_bp)
app.register_blueprint(user_bp)

@app.route('/')
def home():
    return "Welcome to the Cricket Team Selector!"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
