
from flask import Blueprint, jsonify, request
from models.tournament import Tournament

tournament_bp = Blueprint('tournament_bp', __name__)

@tournament_bp.route('/', methods=['GET'])
def get_tournaments():
    """Route to retrieve all tournaments."""
    try:
        tournaments = Tournament.get_all_tournaments()
        return jsonify([tournament.__dict__ for tournament in tournaments])
    except Exception as e:
        return str(e), 500

@tournament_bp.route('/add-tournament', methods=['POST'])
def add_tournament():
    """Route to add a new tournament to the Tournament table."""
    data = request.json
    try:
        Tournament.add_tournament(
            data['Tournament_Name'],
            data.get('Format'),
            data.get('Level'),
            data.get('Start_Date'),
            data.get('End_Date')
        )
        return jsonify({"message": "Tournament added successfully"}), 201
    except Exception as e:
        return str(e), 500

@tournament_bp.route('/<int:tournament_id>', methods=['GET'])
def get_tournament(tournament_id):
    """Route to get a specific tournament's details by ID."""
    try:
        tournament = Tournament.get_tournament_by_id(tournament_id)
        if tournament:
            return jsonify(tournament.__dict__)
        else:
            return jsonify({"message": "Tournament not found"}), 404
    except Exception as e:
        return str(e), 500
