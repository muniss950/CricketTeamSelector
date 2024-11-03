# routes/squad_routes.py
from flask import Blueprint, jsonify, request
from models.squad import Squad

squad_bp = Blueprint('squad_bp', __name__)

@squad_bp.route('/squad', methods=['GET'])
def get_all_squad_entries():
    squads = Squad.get_all_squad_entries()
    return jsonify(squads)

@squad_bp.route('/squad', methods=['POST'])
def add_squad_entry():
    data = request.get_json()
    Squad.add_squad_entry(data['Player_ID'], data['Team_ID'], data['Match_ID'])
    return jsonify({"message": "Squad entry added successfully"}), 201

@squad_bp.route('/squad/<int:player_id>/<int:team_id>/<int:match_id>', methods=['GET'])
def get_squad_entry(player_id, team_id, match_id):
    squad_entry = Squad.get_squad_entry(player_id, team_id, match_id)
    if squad_entry:
        return jsonify(squad_entry)
    else:
        return jsonify({"error": "Squad entry not found"}), 404

@squad_bp.route('/squad/<int:player_id>/<int:team_id>/<int:match_id>', methods=['PUT'])
def update_squad_entry(player_id, team_id, match_id):
    data = request.get_json()
    Squad.update_squad_entry(
        player_id, team_id, match_id,
        new_player_id=data.get('Player_ID'),
        new_team_id=data.get('Team_ID'),
        new_match_id=data.get('Match_ID')
    )
    return jsonify({"message": "Squad entry updated successfully"})

@squad_bp.route('/squad/<int:player_id>/<int:team_id>/<int:match_id>', methods=['DELETE'])
def delete_squad_entry(player_id, team_id, match_id):
    Squad.delete_squad_entry(player_id, team_id, match_id)
    return jsonify({"message": "Squad entry deleted successfully"})
