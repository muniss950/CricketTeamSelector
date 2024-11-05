# routes/player_bowling_routes.py
from flask import Blueprint, jsonify, request
from models.player_bowling_stats import PlayerBowlingStats

bowling_stats_bp = Blueprint('player_bowling_stats', __name__)

@bowling_stats_bp.route('/player_bowling_stats', methods=['GET'])
def get_player_bowling_stats():
    """Route to retrieve all player bowling statistics."""
    stats = PlayerBowlingStats.get_all_bowling_stats()
    return jsonify(stats), 200

