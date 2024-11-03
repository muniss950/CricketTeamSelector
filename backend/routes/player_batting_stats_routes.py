from flask import Blueprint, jsonify, request
from models.player_batting_stats import PlayerBattingStats

bp = Blueprint('player_batting_stats', __name__)

@bp.route('/', methods=['GET'])
def get_all_batting_stats():
    """Get all player batting stats."""
    stats = PlayerBattingStats.fetch_all()
    return jsonify([vars(stat) for stat in stats]), 200

@bp.route('/<int:player_id>', methods=['GET'])
def get_batting_stats(player_id):
    """Get batting stats for a specific player by ID."""
    stats = PlayerBattingStats.fetch_by_player_id(player_id)
    if stats:
        return jsonify(vars(stats)), 200
    else:
        return jsonify({"message": "Player batting stats not found"}), 404


