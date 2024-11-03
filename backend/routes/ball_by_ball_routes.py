# routes/ball_by_ball_routes.py

from flask import Blueprint, request, jsonify
from models.ball_by_ball import BallByBall

ball_by_ball_bp = Blueprint('ball_by_ball', __name__)

@ball_by_ball_bp.route('/ball-by-ball', methods=['GET'])
def get_ball_by_ball_stats():
    data = BallByBall.get_ball_by_ball_stats()
    return jsonify(data)

@ball_by_ball_bp.route('/ball-by-ball', methods=['POST'])
def add_ball_by_ball_stats():
    data = request.json
    ball = BallByBall(
        over_no=data['over_no'],
        bowl_no=data['bowl_no'],
        run_taken=data.get('run_taken', 0),
        wicket=data.get('wicket'),
        on_strike=data.get('on_strike'),
        other_end=data.get('other_end'),
        bowler=data.get('bowler'),
        match_id=data['Match_ID'],
        inning_number=data['Inning_Number']
    )
    BallByBall.add_ball_by_ball_stats(ball)
    return jsonify({'message': 'Ball by ball stats added successfully'}), 201

@ball_by_ball_bp.route('/ball-by-ball/<int:match_id>/<int:inning_number>/<int:over_no>/<int:bowl_no>', methods=['PUT'])
def update_ball_by_ball_stats(match_id, inning_number, over_no, bowl_no):
    data = request.json
    BallByBall.update_ball_by_ball_stats(match_id, inning_number, over_no, bowl_no, data)
    return jsonify({'message': 'Ball by ball stats updated successfully'})

@ball_by_ball_bp.route('/ball-by-ball/<int:match_id>/<int:inning_number>/<int:over_no>/<int:bowl_no>', methods=['DELETE'])
def delete_ball_by_ball_stats(match_id, inning_number, over_no, bowl_no):
    BallByBall.delete_ball_by_ball_stats(match_id, inning_number, over_no, bowl_no)
    return jsonify({'message': 'Ball by ball stats deleted successfully'})
