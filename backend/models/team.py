# models/team.py

import mysql.connector
from config import db_config

class Team:
    def __init__(self, team_id, team_name, team_type=None, captain_id=None):
        self.team_id = team_id
        self.team_name = team_name
        self.team_type = team_type
        self.captain_id = captain_id

    @staticmethod
    def from_row(row):
        return Team(
            team_id=row[0],
            team_name=row[1],
            team_type=row[2],
            captain_id=row[3]
        )

    @staticmethod
    def get_all_teams():
        """Retrieve all teams from the database."""
        try:
            connection = mysql.connector.connect(**db_config)
            cursor = connection.cursor()
            cursor.execute('SELECT * FROM Team')
            teams = [Team.from_row(row) for row in cursor.fetchall()]
            cursor.close()
            connection.close()
            return teams
        except mysql.connector.Error as err:
            raise Exception(f"Error: {err}")

    @staticmethod
    def add_team(team_name, team_type=None, captain_id=None):
        """Add a new team to the database."""
        try:
            connection = mysql.connector.connect(**db_config)
            cursor = connection.cursor()
            cursor.execute('''
                INSERT INTO Team (Team_Name, Team_Type, Captain_ID)
                VALUES (%s, %s, %s)
            ''', (team_name, team_type, captain_id))
            connection.commit()
            cursor.close()
            connection.close()
        except mysql.connector.Error as err:
            raise Exception(f"Error: {err}")

    @staticmethod
    def get_team_by_id(team_id):
        """Retrieve a team by its ID."""
        try:
            connection = mysql.connector.connect(**db_config)
            cursor = connection.cursor()
            cursor.execute('SELECT * FROM Team WHERE Team_ID = %s', (team_id,))
            team_row = cursor.fetchone()
            cursor.close()
            connection.close()
            return Team.from_row(team_row) if team_row else None
        except mysql.connector.Error as err:
            raise Exception(f"Error: {err}")
