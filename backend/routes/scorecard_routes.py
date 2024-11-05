from flask import Blueprint, jsonify, request
from models.inning import Inning
from models.batting import Batting
from models.bowling import Bowling

scorecard_bp = Blueprint('scorecard_bp', __name__)

@scorecard_bp.route('/scorecard', methods=['GET'])
def get_scorecard():
    match_id = request.args.get('match_id')
    inning_number = request.args.get('inning_number')

    if not match_id or not inning_number:
        return jsonify({"error": "Please provide match_id and inning_number"}), 400

    try:
        # Fetch scorecard data from each model
        inning_data = Inning.get_inning_scorecard(match_id, inning_number)
        batting_data = Batting.get_batting_scorecard(match_id, inning_number)
        bowling_data = Bowling.get_bowling_scorecard(match_id, inning_number)

        # Structure the scorecard
        scorecard = {
            "Inning": inning_data,
            "Batting": batting_data,
            "Bowling": bowling_data
        }

        return jsonify(scorecard), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

