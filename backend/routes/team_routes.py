from flask import Blueprint, request, jsonify
from models.team import Team

team_bp = Blueprint('team_bp', __name__)

@team_bp.route('/teams', methods=['GET'])
def get_all_teams():
    """Retrieve all teams."""
    try:
        teams = Team.get_all_teams()
        return jsonify(teams), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@team_bp.route('/teams/<int:team_id>', methods=['GET'])
def get_team_by_id(team_id):
    """Retrieve a team by its ID."""
    team = Team.get_team_by_id(team_id)
    if team:
        return jsonify(team), 200
    return jsonify({"error": "Team not found"}), 404

@team_bp.route('/teams', methods=['POST'])
def add_team():
    """Add a new team."""
    data = request.get_json()
    team = Team(
        team_name=data.get('Team_Name'),
        team_type=data.get('Team_Type'),
        captain_id=data.get('Captain_ID')
    )
    try:
        team.add_to_db()
        return jsonify(team.to_dict()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@team_bp.route('/teams/<int:team_id>', methods=['PUT'])
def update_team(team_id):
    """Update an existing team."""
    team_data = Team.get_team_by_id(team_id)
    if not team_data:
        return jsonify({"error": "Team not found"}), 404

    data = request.get_json()
    team = Team(
        team_id=team_id,
        team_name=data.get('Team_Name', team_data['Team_Name']),
        team_type=data.get('Team_Type', team_data['Team_Type']),
        captain_id=data.get('Captain_ID', team_data['Captain_ID'])
    )

    try:
        team.update_in_db()
        return jsonify(team.to_dict()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@team_bp.route('/teams/<int:team_id>', methods=['DELETE'])
def delete_team(team_id):
    """Delete a team."""
    team = Team.get_team_by_id(team_id)
    if not team:
        return jsonify({"error": "Team not found"}), 404

    try:
        Team.delete_team(team_id)
        return jsonify({"message": "Team deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
