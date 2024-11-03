from flask import Blueprint, request, jsonify
from models.cricket_match import CricketMatch

cricket_match_bp = Blueprint('cricket_match', __name__)

@cricket_match_bp.route('/matches', methods=['GET'])
def get_all_matches():
    matches = CricketMatch.get_all_matches()
    return jsonify(matches)

@cricket_match_bp.route('/matches/<int:match_id>', methods=['GET'])
def get_match(match_id):
    match = CricketMatch.get_match_by_id(match_id)
    if match:
        return jsonify(match)
    return jsonify({'message': 'Match not found'}), 404

@cricket_match_bp.route('/matches', methods=['POST'])
def add_match():
    data = request.json
    new_match = CricketMatch(
        match_date=data['Match_Date'],
        tournament_id=data['Tournament_ID'],
        team1_id=data['Team1_ID'],
        team2_id=data['Team2_ID'],
        winner=data.get('Winner'),
        stage=data.get('Stage')
    )
    CricketMatch.add_match(new_match)
    return jsonify({'message': 'Match added successfully'}), 201

@cricket_match_bp.route('/matches/<int:match_id>', methods=['PUT'])
def update_match(match_id):
    data = request.json
    CricketMatch.update_match(match_id, data)
    return jsonify({'message': 'Match updated successfully'}), 200

@cricket_match_bp.route('/matches/<int:match_id>', methods=['DELETE'])
def delete_match(match_id):
    CricketMatch.delete_match(match_id)
    return jsonify({'message': 'Match deleted successfully'}), 200
