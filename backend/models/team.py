import mysql.connector
from config import db_config

class Team:
    def __init__(self, team_id=None, team_name=None, team_type=None, captain_id=None):
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

    def to_dict(self):
        """Convert the Team instance to a dictionary for JSON responses."""
        return {
            "Team_ID": self.team_id,
            "Team_Name": self.team_name,
            "Team_Type": self.team_type,
            "Captain_ID": self.captain_id
        }

    @staticmethod
    def get_all_teams():
        """Retrieve all teams from the database."""
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute('SELECT * FROM Team')
        teams = [Team.from_row(row).to_dict() for row in cursor.fetchall()]
        cursor.close()
        connection.close()
        return teams

    @staticmethod
    def get_team_by_id(team_id):
        """Retrieve a team by its ID."""
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute('SELECT * FROM Team WHERE Team_ID = %s', (team_id,))
        team_row = cursor.fetchone()
        cursor.close()
        connection.close()
        return Team.from_row(team_row).to_dict() if team_row else None

    def add_to_db(self):
        """Add a new team to the database."""
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute('''
            INSERT INTO Team (Team_Name, Team_Type, Captain_ID)
            VALUES (%s, %s, %s)
        ''', (self.team_name, self.team_type, self.captain_id))
        connection.commit()
        self.team_id = cursor.lastrowid
        cursor.close()
        connection.close()

    def update_in_db(self):
        """Update an existing team in the database."""
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute('''
            UPDATE Team SET Team_Name = %s, Team_Type = %s, Captain_ID = %s
            WHERE Team_ID = %s
        ''', (self.team_name, self.team_type, self.captain_id, self.team_id))
        connection.commit()
        cursor.close()
        connection.close()

    @staticmethod
    def delete_team(team_id):
        """Delete a team from the database by its ID."""
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute('DELETE FROM Team WHERE Team_ID = %s', (team_id,))
        connection.commit()
        cursor.close()
        connection.close()
