# routes/player_routes.py
from flask import Blueprint, jsonify, request
from models.player import Player

player_bp = Blueprint('player', __name__)

@player_bp.route('/')
def index():
    """Default route to retrieve all players."""
    try:
        players = Player.get_all()
        return jsonify(players)
    except Exception as err:
        return f"Error: {err}", 500

@player_bp.route('/add', methods=['POST'])
def add_player():
    """Route to add a new player to the Player table."""
    data = request.json
    try:
        Player.add(data['Player_Name'], data['Team_ID'])
        return jsonify({"message": "Player added successfully"}), 201
    except Exception as err:
        return f"Error: {err}", 500

@player_bp.route('/<int:player_id>', methods=['GET'])
def get_player(player_id):
    """Route to get a specific player's details by ID."""
    try:
        player = Player.get_by_id(player_id)
        if player:
            return jsonify(player)
        else:
            return jsonify({"message": "Player not found"}), 404
    except Exception as err:
        return f"Error: {err}", 500
