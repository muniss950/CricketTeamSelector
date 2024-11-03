# routes/inning_routes.py
from flask import Blueprint, jsonify, request
from models.inning import Inning

inning_bp = Blueprint('inning', __name__)

@inning_bp.route('/innings', methods=['GET'])
def get_innings():
    """Route to retrieve all innings."""
    innings = Inning.get_all_innings()
    return jsonify(innings), 200

@inning_bp.route('/innings', methods=['POST'])
def add_inning():
    """Route to add a new inning."""
    data = request.json
    Inning.add_inning(
        match_id=data['Match_ID'],
        inning_number=data['Inning_Number'],
        total_score=data.get('Total_Score'),
        overs=data.get('Overs'),
        total_wickets=data.get('Total_wickets')
    )
    return jsonify({"message": "Inning added successfully!"}), 201
