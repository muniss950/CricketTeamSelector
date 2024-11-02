# routes/cricket_match_routes.py

from flask import Blueprint, jsonify, request
from models.cricket_match import CricketMatch

cricket_match_bp = Blueprint('cricket_match', __name__)

@cricket_match_bp.route('/matches', methods=['GET'])
def get_matches():
    """Route to retrieve all cricket matches."""
    matches = CricketMatch.get_all_matches()
    return jsonify(matches)

@cricket_match_bp.route('/matches', methods=['POST'])
def add_match():
    """Route to add a new cricket match."""
    data = request.json
    new_match = CricketMatch(
        match_date=data['match_date'],
        tournament_id=data['tournament_id'],
        team1_id=data['team1_id'],
        team2_id=data['team2_id'],
        winner=data.get('winner'),
        stage=data.get('stage')
    )
    CricketMatch.add_match(new_match)
    return jsonify({"message": "Match added successfully!"}), 201

