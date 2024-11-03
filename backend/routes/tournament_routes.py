from flask import Blueprint, jsonify, request
from models.tournament import Tournament

tournament_bp = Blueprint('tournament_bp', __name__)

@tournament_bp.route('/tournaments/', methods=['GET'])
def get_all_tournaments():
    tournaments = Tournament.get_all_tournaments()
    return jsonify([tournament.to_dict() for tournament in tournaments])

@tournament_bp.route('/tournaments/<int:tournament_id>', methods=['GET'])
def get_tournament(tournament_id):
    tournament = Tournament.get_tournament_by_id(tournament_id)
    if tournament:
        return jsonify(tournament.to_dict())
    else:
        return jsonify({"error": "Tournament not found"}), 404

@tournament_bp.route('/tournaments', methods=['POST'])
def create_tournament():
    data = request.get_json()
    Tournament.add_tournament(
        tournament_name=data.get('Tournament_Name'),
        format=data.get('Format'),
        level=data.get('Level'),
        start_date=data.get('Start_Date'),
        end_date=data.get('End_Date')
    )
    return jsonify({"message": "Tournament added successfully"}), 201

@tournament_bp.route('/tournaments/<int:tournament_id>', methods=['PUT'])
def update_tournament(tournament_id):
    tournament = Tournament.get_tournament_by_id(tournament_id)
    if not tournament:
        return jsonify({"error": "Tournament not found"}), 404

    data = request.get_json()
    tournament.tournament_name = data.get('Tournament_Name', tournament.tournament_name)
    tournament.format = data.get('Format', tournament.format)
    tournament.level = data.get('Level', tournament.level)
    tournament.start_date = data.get('Start_Date', tournament.start_date)
    tournament.end_date = data.get('End_Date', tournament.end_date)

    tournament.update_in_db()
    return jsonify(tournament.to_dict())

@tournament_bp.route('/tournaments/<int:tournament_id>', methods=['DELETE'])
def delete_tournament(tournament_id):
    tournament = Tournament.get_tournament_by_id(tournament_id)
    if not tournament:
        return jsonify({"error": "Tournament not found"}), 404

    Tournament.delete_tournament(tournament_id)
    return jsonify({"message": "Tournament deleted successfully"})
