# routes/bowling_routes.py

from flask import Blueprint, jsonify, request, current_app
from models.bowling import Bowling

bowling_bp = Blueprint('bowling', __name__)

def get_bowling_model():
    connection = current_app.config['db_connection']()
    return Bowling(connection)

@bowling_bp.route('/', methods=['GET'])
def get_bowling():
    """Route to retrieve all bowling statistics."""
    bowling_model = get_bowling_model()
    bowling_stats = bowling_model.get_bowling_stats()
    return jsonify(bowling_stats)

@bowling_bp.route('/<int:match_id>/<int:player_id>', methods=['GET'])
def get_bowling_stats(match_id, player_id):
    """Route to retrieve bowling stats for a specific player in a match."""
    bowling_model = get_bowling_model()
    bowling_stats = bowling_model.get_bowling_stats_by_player(match_id, player_id)
    if bowling_stats:
        return jsonify(bowling_stats)
    return jsonify({"message": "Bowling stats not found"}), 404

@bowling_bp.route('/', methods=['POST'])
def add_bowling():
    """Route to add new bowling statistics."""
    bowling_model = get_bowling_model()
    data = request.json
    bowling_model.add_bowling_stats(data)
    return jsonify({"message": "Bowling stats added successfully!"}), 201

@bowling_bp.route('/<int:match_id>/<int:player_id>', methods=['PUT'])
def update_bowling_stats(match_id, player_id):
    """Route to update existing bowling statistics."""
    bowling_model = get_bowling_model()
    data = request.json
    bowling_model.update_bowling_stats(match_id, player_id, data)
    return jsonify({"message": "Bowling stats updated successfully!"}), 200

@bowling_bp.route('/<int:match_id>/<int:player_id>', methods=['DELETE'])
def delete_bowling_stats(match_id, player_id):
    """Route to delete bowling statistics for a specific player in a match."""
    bowling_model = get_bowling_model()
    bowling_model.delete_bowling_stats(match_id, player_id)
    return jsonify({"message": "Bowling stats deleted successfully!"}), 204
