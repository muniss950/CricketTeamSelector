# routes/batting_routes.py

from flask import Blueprint, jsonify, request
from models.batting import Batting

batting_bp = Blueprint('batting', __name__)

@batting_bp.route('/', methods=['GET'])
def get_batting():
    """Route to retrieve all batting statistics."""
    batting_stats = Batting.get_batting_stats()
    return jsonify(batting_stats)

@batting_bp.route('/', methods=['POST'])
def add_batting():
    """Route to add new batting statistics."""
    data = request.json
    new_batting = Batting(
        player_id=data['Player_ID'],
        match_id=data['Match_ID'],
        runs_scored=data.get('Runs_Scored', 0),
        balls_faced=data.get('Balls_Faced', 0),
        fours=data.get('Fours', 0),
        sixes=data.get('Sixes', 0),
        position=data.get('Position', -1)
    )
    Batting.add_batting_stats(new_batting)
    return jsonify({"message": "Batting stats added successfully!"}), 201
