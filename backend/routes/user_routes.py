
from flask import Blueprint, jsonify, request
from models.user import User

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/users', methods=['GET'])
def get_all_users():
    users = User.get_all_users()
    return jsonify(users)

@user_bp.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    User.add_user(
        username=data['username'],
        email=data['email'],
        password=data['password'],
        role=data.get('role', 'user')  # Defaults to 'user' if no role specified
    )
    return jsonify({"message": "User added successfully"}), 201

@user_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.get_user(user_id)
    if user:
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 404

@user_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    updated = User.update_user(
        username=data.get('username'),
        email=data.get('email'),
        password=data.get('password'),
    )
    if updated:
        return jsonify({"message": "User updated successfully"})
    else:
        return jsonify({"error": "User not found"}), 404

@user_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    deleted = User.delete_user(user_id)
    if deleted:
        return jsonify({"message": "User deleted successfully"})
    else:
        return jsonify({"error": "User not found"}), 404
