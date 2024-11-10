# from flask import Blueprint, jsonify, request
# from models.player_batting_stats import PlayerBattingStats

# bp = Blueprint('player_batting_stats_bp', __name__)

# @bp.route('/player_batting_stats', methods=['GET'])
# def get_all_batting_stats():
#     """Get all player batting stats."""
#     stats = PlayerBattingStats.fetch_all()
#     return jsonify([vars(stat) for stat in stats]), 200

# @bp.route('/player_batting_stats/<int:player_id>', methods=['GET'])
# def get_batting_stats(player_id):
#     """Get batting stats for a specific player by ID."""
#     stats = PlayerBattingStats.fetch_by_player_id(player_id)
#     if stats:
#         return jsonify(vars(stats)), 200
#     else:
#         return jsonify({"message": "Player batting stats not found"}), 404


# from flask import Blueprint, jsonify
# from models.player_batting_stats import PlayerBattingStats

# player_batting_bp = Blueprint('player_batting_stats_bp', __name__)

# # Route to get all player batting stats
# @player_batting_bp.route('/player_batting_stats', methods=['GET'])
# def get_all_player_batting_stats():
#     stats = PlayerBattingStats.fetch_all()
#     return jsonify([vars(stat) for stat in stats]), 200

# # Route to get specific player batting stats by player ID
# @player_batting_bp.route('/player_batting_stats/<int:player_id>', methods=['GET'])
# def get_player_batting_stats(player_id):
#     stats = PlayerBattingStats.fetch_by_player_id(player_id)
#     if stats:
#         return jsonify([vars(stat) for stat in stats]), 200
#     else:
#         return jsonify({"message": "Player batting stats not found"}), 404



# from flask import Blueprint, jsonify
# from models.player_batting_stats import PlayerBattingStats

# player_batting_bp = Blueprint('player_batting_stats_bp', __name__)

# # Route to get all player batting stats
# @player_batting_bp.route('/player_batting_stats', methods=['GET'])
# def get_all_player_batting_stats():
#     stats = PlayerBattingStats.fetch_all()
#     return jsonify([vars(stat) for stat in stats]), 200

# # Route to get specific player batting stats by player ID
# @player_batting_bp.route('/player_batting_stats/<int:player_id>', methods=['GET'])
# def get_player_batting_stats(player_id):
#     stat = PlayerBattingStats.fetch_by_player_id(player_id)
#     if stat:
#         return jsonify(vars(stat)), 200  # Return the single stat as an object, not as a list
#     else:
#         return jsonify({"message": "Player batting stats not found"}), 404


from flask import Blueprint, jsonify, make_response
from models.player_batting_stats import PlayerBattingStats

player_batting_bp = Blueprint('player_batting_stats_bp', __name__)

@player_batting_bp.route('/player_batting_stats/<int:player_id>', methods=['GET'])
def get_player_batting_stats(player_id):
    stats = PlayerBattingStats.fetch_by_player_id(player_id)
    if stats:
        response = make_response(jsonify([vars(stats)]), 200)
        response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
        return response
    else:
        response = make_response(jsonify({"message": "Player batting stats not found"}), 404)
        response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
        return response
