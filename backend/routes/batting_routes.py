# from flask import Blueprint, jsonify, request
# from models.batting import Batting
#
# batting_bp = Blueprint('batting_bp', __name__)
#
# # Route to get all batting stats
# @batting_bp.route('/batting', methods=['GET'])
# def get_all_batting_stats():
#     batting_stats = Batting.get_batting_stats()
#     return jsonify(batting_stats)
#
# # Route to get batting stats by player ID
# @batting_bp.route('/batting/<int:player_id>', methods=['GET'])
# def get_batting_stats_by_player_id(player_id):
#     batting_data = Batting.get_batting_stats_by_player(player_id)
#     if batting_data:
#         return jsonify(batting_data)
#     else:
#         return jsonify({"error": "Batting stats not found"}), 404
#
# # Route to add batting stats (requires player_id and inning_number, but not match_id)
# @batting_bp.route('/batting', methods=['POST'])
# def add_batting_stats():
#     data = request.get_json()
#     batting = Batting(
#         player_id=data['Player_ID'],
#         inning_number=data['Inning_Number'],
#         runs_scored=data.get('Runs_Scored', 0),
#         balls_faced=data.get('Balls_Faced', 0),
#         fours=data.get('Fours', 0),
#         sixes=data.get('Sixes', 0),
#         position=data.get('Position', -1)
#     )
#     Batting.add_batting_stats(batting)
#     return jsonify({"message": "Batting stats added successfully"}), 201
#
# # Route to update batting stats for a specific player and inning (without match_id)
# @batting_bp.route('/batting/<int:player_id>/<int:inning_number>', methods=['PUT'])
# def update_batting_stats(player_id, inning_number):
#     data = request.get_json()
#     Batting.update_batting_stats(
#         player_id=player_id,
#         inning_number=inning_number,
#         runs_scored=data.get('Runs_Scored'),
#         balls_faced=data.get('Balls_Faced'),
#         fours=data.get('Fours'),
#         sixes=data.get('Sixes'),
#         position=data.get('Position')
#     )
#     return jsonify({"message": "Batting stats updated successfully"})
#
# # Route to delete batting stats for a specific player and inning (without match_id)
# @batting_bp.route('/batting/<int:player_id>/<int:inning_number>', methods=['DELETE'])
# def delete_batting_stats(player_id, inning_number):
#     Batting.delete_batting_stats(player_id, inning_number)
#     return jsonify({"message": "Batting stats deleted successfully"})
#
from flask import Blueprint, jsonify, request
from models.batting import Batting

batting_bp = Blueprint('batting_bp', __name__)

# Route to get all batting stats with player names
@batting_bp.route('/batting', methods=['GET'])
def get_all_batting_stats():
    batting_stats = Batting.get_batting_stats()
    if batting_stats:
        return jsonify(batting_stats)
    else:
        return jsonify({"error": "No batting stats found"}), 404

# Route to get batting stats by player ID with player name
@batting_bp.route('/batting/<int:player_id>', methods=['GET'])
def get_batting_stats_by_player_id(player_id):
    batting_data = Batting.get_batting_stats_by_player(player_id)
    if batting_data:
        return jsonify(batting_data)
    else:
        return jsonify({"error": "Batting stats not found"}), 404

# Route to add batting stats with player name (requires player_id and inning_number, but not match_id)
@batting_bp.route('/batting', methods=['POST'])
def add_batting_stats():
    data = request.get_json()
    batting = Batting(
        player_id=data['Player_ID'],
        inning_number=data['Inning_Number'],
        runs_scored=data.get('Runs_Scored', 0),
        balls_faced=data.get('Balls_Faced', 0),
        fours=data.get('Fours', 0),
        sixes=data.get('Sixes', 0),
        position=data.get('Position', -1)
    )
    Batting.add_batting_stats(batting)
    return jsonify({"message": "Batting stats added successfully"}), 201

# Route to update batting stats for a specific player and inning (without match_id)
@batting_bp.route('/batting/<int:player_id>/<int:inning_number>', methods=['PUT'])
def update_batting_stats(player_id, inning_number):
    data = request.get_json()
    Batting.update_batting_stats(
        player_id=player_id,
        inning_number=inning_number,
        runs_scored=data.get('Runs_Scored'),
        balls_faced=data.get('Balls_Faced'),
        fours=data.get('Fours'),
        sixes=data.get('Sixes'),
        position=data.get('Position')
    )
    return jsonify({"message": "Batting stats updated successfully"})

# Route to delete batting stats for a specific player and inning (without match_id)
@batting_bp.route('/batting/<int:player_id>/<int:inning_number>', methods=['DELETE'])
def delete_batting_stats(player_id, inning_number):
    Batting.delete_batting_stats(player_id, inning_number)
    return jsonify({"message": "Batting stats deleted successfully"})
