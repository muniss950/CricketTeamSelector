# routes/squad_routes.py
from flask import Blueprint, jsonify, request
from models.squad import Squad

squad_bp = Blueprint('squad', __name__)

@squad_bp.route('/squad', methods=['GET'])
def get_squad_entries():
    """Route to retrieve all squad entries."""
    squads = Squad.get_all_squad_entries()
    return jsonify(squads), 200

@squad_bp.route('/squad', methods=['POST'])
def add_squad_entry():
    """Route to add a new squad entry."""
    data = request.json
    Squad.add_squad_entry(
        player_id=data['Player_ID'],
        team_id=data['Team_ID'],
        match_id=data['Match_ID']
    )
    return jsonify({"message": "Squad entry added successfully!"}), 201
