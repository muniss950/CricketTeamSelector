# routes/teams_list_routes.py
from flask import Blueprint, jsonify, request
from models.teams_list import TeamsList

teams_list_bp = Blueprint('teams_list', __name__)

@teams_list_bp.route('/team_list', methods=['GET'])
def get_teams():
    """Route to retrieve all team entries."""
    teams = TeamsList.get_all_teams()
    return jsonify(teams), 200

@teams_list_bp.route('/team_list', methods=['POST'])
def add_team():
    """Route to add a new team entry."""
    data = request.json
    TeamsList.add_team_entry(
        team_id=data['Team_ID'],
        tournament_id=data['Tournament_ID']
    )
    return jsonify({"message": "Team entry added successfully!"}), 201

