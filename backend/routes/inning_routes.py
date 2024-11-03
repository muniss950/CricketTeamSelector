# routes/inning_routes.py

from flask import Blueprint, request, jsonify
from models.inning import Inning

inning_bp = Blueprint('inning', __name__)

@inning_bp.route('/innings', methods=['GET'])
def get_all_innings():
    innings = Inning.get_all_innings()
    return jsonify(innings)

@inning_bp.route('/innings', methods=['POST'])
def add_inning():
    data = request.json
    Inning.add_inning(data['Match_ID'], data['Inning_Number'], data['Total_Score'], data['Overs'], data['Total_Wickets'])
    return jsonify({'message': 'Inning added successfully'}), 201

@inning_bp.route('/innings/<int:match_id>/<int:inning_number>', methods=['PUT'])
def update_inning(match_id, inning_number):
    data = request.json
    Inning.update_inning(match_id, inning_number, data)
    return jsonify({'message': 'Inning updated successfully'})

@inning_bp.route('/innings/<int:match_id>/<int:inning_number>', methods=['DELETE'])
def delete_inning(match_id, inning_number):
    Inning.delete_inning(match_id, inning_number)
    return jsonify({'message': 'Inning deleted successfully'})
