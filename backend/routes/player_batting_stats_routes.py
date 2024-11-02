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

@bp.route('/add-player-batting-stats', methods=['POST'])
def add_player_batting_stats():
    """Add new player batting stats."""
    data = request.json
    new_stats = PlayerBattingStats(
        player_id=data['Player_ID'],
        player_name=data['Player_Name'],
        matches_played=data.get('Matches_Played', 0),
        total_runs=data.get('Total_Runs'),
        total_balls=data.get('Total_Balls'),
        total_fours=data.get('Total_Fours'),
        total_sixes=data.get('Total_Sixes'),
        average_runs_scored=data.get('Average_Runs_Scored')
    )

    PlayerBattingStats.add_stats(new_stats)
    return jsonify({"message": "Player batting stats added successfully"}), 201

