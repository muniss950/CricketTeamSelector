# routes/team_routes.py

from flask import Blueprint, jsonify, request
from models.team import Team

team_bp = Blueprint('team_bp', __name__)

@team_bp.route('/', methods=['GET'])
def get_teams():
    """Route to retrieve all teams."""
    try:
        teams = Team.get_all_teams()
        return jsonify([team.__dict__ for team in teams])
    except Exception as e:
        return str(e), 500

@team_bp.route('/add-team', methods=['POST'])
def add_team():
    """Route to add a new team to the Team table."""
    data = request.json
    try:
        Team.add_team(data['Team_Name'], data.get('Team_Type'), data.get('Captain_ID'))
        return jsonify({"message": "Team added successfully"}), 201
    except Exception as e:
        return str(e), 500

@team_bp.route('/<int:team_id>', methods=['GET'])
def get_team(team_id):
    """Route to get a specific team's details by ID."""
    try:
        team = Team.get_team_by_id(team_id)
        if team:
            return jsonify(team.__dict__)
        else:
            return jsonify({"message": "Team not found"}), 404
    except Exception as e:
        return str(e), 500
