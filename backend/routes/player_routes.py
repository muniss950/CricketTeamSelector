
from flask import Blueprint, jsonify, request
from models.player import Player  # Import the Player model

player_bp = Blueprint('player_bp', __name__)

@player_bp.route('/players', methods=['GET'])
def get_players():
    """Get all players."""
    players = Player.get_all()
    return jsonify(players), 200

@player_bp.route('/players/<int:player_id>', methods=['GET'])
def get_player(player_id):
    """Get a specific player by ID."""
    player = Player.get_by_id(player_id)
    if player:
        return jsonify(player), 200
    return jsonify({"error": "Player not found"}), 404

@player_bp.route('/players', methods=['POST'])
def create_player():
    """Create a new player."""
    data = request.get_json()
    new_player = Player(
        name=data['Player_Name'],
        gender=data.get('Gender'),
        role=data.get('Role'),
        team_id=data.get('Team_ID'),
        dob=data.get('DOB')
    )
    new_player.save_to_db()
    return jsonify(new_player.to_dict()), 201


@player_bp.route('/players/<int:player_id>', methods=['PUT'])
def update_player(player_id):
    """Update an existing player with any provided fields."""
    player = Player.get_by_id(player_id)
    if not player:
        return jsonify({"error": "Player not found"}), 404
    
    data = request.get_json()

    # Create a Player instance with the existing values, updating only the fields provided in `data`
    player_instance = Player(
        player_id=player_id,
        name=data.get('Player_Name', player['Player_Name']),
        gender=data.get('Gender', player['Gender']),
        role=data.get('Role', player['Role']),
        team_id=data.get('Team_ID', player['Team_ID']),
        dob=data.get('DOB', player['DOB'])
    )
    
    # Update the player in the database
    player_instance.update_in_db()
    return jsonify(player_instance.to_dict()), 200
@player_bp.route('/players/<int:player_id>', methods=['DELETE'])
def delete_player(player_id):
    """Delete a specific player."""
    player = Player.get_by_id(player_id)
    if not player:
        return jsonify({"error": "Player not found"}), 404
    
    Player.delete_by_id(player_id)
    return jsonify({"message": "Player deleted successfully"}), 204
