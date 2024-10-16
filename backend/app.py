
from flask import Flask, jsonify, request
import mysql.connector
from config import db_config  # Import database configuration from config.py

app = Flask(__name__)

# Function to get a database connection
def get_db_connection():
    connection = mysql.connector.connect(**db_config)
    return connection

@app.route('/')
def index():
    """Default route to test the database connection and retrieve players."""
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        # Example query: Select all players
        cursor.execute('SELECT * FROM Player')
        players = cursor.fetchall()

        cursor.close()
        connection.close()

        # Return player data as JSON
        return jsonify(players)
    except mysql.connector.Error as err:
        return f"Error: {err}", 500

@app.route('/add-player', methods=['POST'])
def add_player():
    """Route to add a new player to the Player table."""
    data = request.json
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        # Example insert query
        cursor.execute('''
            INSERT INTO Player (Player_ID, Player_Name, Team_ID)
            VALUES (%s, %s, %s)
        ''', (data['Player_ID'], data['Player_Name'], data['Team_ID']))

        connection.commit()  # Commit the transaction
        cursor.close()
        connection.close()

        return jsonify({"message": "Player added successfully"}), 201
    except mysql.connector.Error as err:
        return f"Error: {err}", 500

@app.route('/players/<int:player_id>', methods=['GET'])
def get_player(player_id):
    """Route to get a specific player's details by ID."""
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        # Select a specific player by ID
        cursor.execute('SELECT * FROM Player WHERE Player_ID = %s', (player_id,))
        player = cursor.fetchone()

        cursor.close()
        connection.close()

        if player:
            return jsonify(player)
        else:
            return jsonify({"message": "Player not found"}), 404
    except mysql.connector.Error as err:
        return f"Error: {err}", 500

if __name__ == '__main__':
    app.run(debug=True)
