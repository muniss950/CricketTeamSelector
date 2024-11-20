from flask import Blueprint, jsonify, request
from models.player import Player  # Import the Player model

player_bp = Blueprint('player_bp', __name__)

@player_bp.route('/players', methods=['GET'])
def get_players():
    """Get all players."""
    response = Player.get_all()
    if response['success']:
        return jsonify(response['data']), 200
    return jsonify({"error": response['message']}), 500


@player_bp.route('/players/<int:player_id>', methods=['GET'])
def get_player(player_id):
    """Get a specific player by ID."""
    response = Player.get_by_id(player_id)
    if response['success']:
        return jsonify(response['data']), 200
    return jsonify({"error": response['message']}), 404


@player_bp.route('/players', methods=['POST'])
def create_player():
    """Create a new player."""
    data = request.get_json()
    new_player = Player(
        name=data.get('Player_Name'),
        gender=data.get('Gender'),
        role=data.get('Role'),
        team_id=data.get('Team_ID'),
        dob=data.get('DOB')
    )
    response = new_player.save_to_db()
    if response['success']:
        return jsonify({"message": response['message'], "player": new_player.to_dict()}), 201
    return jsonify({"error": response['message']}), 400


@player_bp.route('/players/<int:player_id>', methods=['PUT'])
def update_player(player_id):
    """Update an existing player."""
    existing_player = Player.get_by_id(player_id)
    if not existing_player['success']:
        return jsonify({"error": existing_player['message']}), 404

    data = request.get_json()
    player_instance = Player(
        player_id=player_id,
        name=data.get('Player_Name', existing_player['data']['Player_Name']),
        gender=data.get('Gender', existing_player['data']['Gender']),
        role=data.get('Role', existing_player['data']['Role']),
        team_id=data.get('Team_ID', existing_player['data']['Team_ID']),
        dob=data.get('DOB', existing_player['data']['DOB'])
    )

    response = player_instance.update_in_db()
    if response['success']:
        return jsonify({"message": response['message'], "player": player_instance.to_dict()}), 200
    return jsonify({"error": response['message']}), 400


@player_bp.route('/players/<int:player_id>', methods=['DELETE'])
def delete_player(player_id):
    """Delete a specific player."""
    existing_player = Player.get_by_id(player_id)
    if not existing_player['success']:
        return jsonify({"error": existing_player['message']}), 404

    response = Player.delete_by_id(player_id)
    if response['success']:
        return jsonify({"message": response['message']}), 204
    return jsonify({"error": response['message']}), 400

