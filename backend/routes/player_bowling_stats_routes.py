# routes/player_bowling_routes.py
from flask import Blueprint, jsonify, request
from models.player_bowling_stats import PlayerBowlingStats

player_bowling_bp = Blueprint('player_bowling', __name__)

@player_bowling_bp.route('/player_bowling', methods=['GET'])
def get_player_bowling_stats():
    """Route to retrieve all player bowling statistics."""
    stats = PlayerBowlingStats.get_all_bowling_stats()
    return jsonify(stats), 200

@player_bowling_bp.route('/player_bowling', methods=['POST'])
def add_player_bowling_stats():
    """Route to add new player bowling statistics."""
    data = request.json
    PlayerBowlingStats.add_bowling_stats(
        player_id=data['Player_ID'],
        player_name=data['Player_Name'],
        matches_played=data.get('Matches_Played', 0),
        total_overs_bowled=data.get('Total_Overs_Bowled'),
        total_balls_bowled=data.get('Total_Balls_Bowled'),
        total_runs_conceded=data.get('Total_Runs_Conceded'),
        total_wickets_taken=data.get('Total_Wickets_Taken'),
        total_maiden_overs=data.get('Total_Maiden_Overs')
    )
    return jsonify({"message": "Player bowling stats added successfully!"}), 201

