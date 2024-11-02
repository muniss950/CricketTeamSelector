# routes/ball_by_ball_routes.py

from flask import Blueprint, jsonify, request
from models.ball_by_ball import BallByBall

ball_by_ball_bp = Blueprint('ball_by_ball', __name__)

@ball_by_ball_bp.route('/ball_by_ball', methods=['GET'])
def get_ball_by_ball():
    """Route to retrieve all ball by ball statistics."""
    ball_by_ball_stats = BallByBall.get_ball_by_ball_stats()
    return jsonify(ball_by_ball_stats)

@ball_by_ball_bp.route('/ball_by_ball', methods=['POST'])
def add_ball_by_ball():
    """Route to add new ball by ball statistics."""
    data = request.json
    new_ball_by_ball = BallByBall(
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
    BallByBall.add_ball_by_ball_stats(new_ball_by_ball)
    return jsonify({"message": "Ball by ball stats added successfully!"}), 201

