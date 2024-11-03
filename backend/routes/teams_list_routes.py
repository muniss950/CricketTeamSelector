# routes/teams_list_routes.py
from flask import Blueprint, jsonify, request
from models.teams_list import TeamsList

teams_list_bp = Blueprint('teams_list_bp', __name__)

@teams_list_bp.route('/teams_list', methods=['GET'])
def get_all_teams():
    teams = TeamsList.get_all_teams()
    return jsonify(teams)

@teams_list_bp.route('/teams_list', methods=['POST'])
def add_team_entry():
    data = request.get_json()
    TeamsList.add_team_entry(data['Team_ID'], data['Tournament_ID'])
    return jsonify({"message": "Team entry added successfully"}), 201

@teams_list_bp.route('/teams_list/<int:team_id>/<int:tournament_id>', methods=['GET'])
def get_team_entry(team_id, tournament_id):
    team_entry = TeamsList.get_team_entry(team_id, tournament_id)
    if team_entry:
        return jsonify(team_entry)
    else:
        return jsonify({"error": "Team entry not found"}), 404

@teams_list_bp.route('/teams_list/<int:team_id>/<int:tournament_id>', methods=['PUT'])
def update_team_entry(team_id, tournament_id):
    data = request.get_json()
    TeamsList.update_team_entry(
        team_id, tournament_id,
        new_team_id=data.get('Team_ID'),
        new_tournament_id=data.get('Tournament_ID')
    )
    return jsonify({"message": "Team entry updated successfully"})

@teams_list_bp.route('/teams_list/<int:team_id>/<int:tournament_id>', methods=['DELETE'])
def delete_team_entry(team_id, tournament_id):
    TeamsList.delete_team_entry(team_id, tournament_id)
    return jsonify({"message": "Team entry deleted successfully"})
