# models/teams_list.py
from config import get_db_connection

class TeamsList:
    @staticmethod
    def get_all_teams():
        """Fetch all team entries from the Teams_List table."""
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Teams_List")
        teams = cursor.fetchall()
        cursor.close()
        connection.close()
        return teams

    @staticmethod
    def add_team_entry(team_id, tournament_id):
        """Add a new team entry to the Teams_List table."""
        connection = get_db_connection()
        cursor = connection.cursor()
        query = """
            INSERT INTO Teams_List (Team_ID, Tournament_ID)
            VALUES (%s, %s)
        """
        cursor.execute(query, (team_id, tournament_id))
        connection.commit()
        cursor.close()
        connection.close()

    @staticmethod
    def get_team_entry(team_id, tournament_id):
        """Fetch a specific team entry by team and tournament IDs."""
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM Teams_List WHERE Team_ID = %s AND Tournament_ID = %s"
        cursor.execute(query, (team_id, tournament_id))
        team_entry = cursor.fetchone()
        cursor.close()
        connection.close()
        return team_entry

    @staticmethod
    def update_team_entry(team_id, tournament_id, new_team_id=None, new_tournament_id=None):
        """Update an existing team entry in the Teams_List table."""
        connection = get_db_connection()
        cursor = connection.cursor()
        query = """
            UPDATE Teams_List
            SET Team_ID = COALESCE(%s, Team_ID),
                Tournament_ID = COALESCE(%s, Tournament_ID)
            WHERE Team_ID = %s AND Tournament_ID = %s
        """
        cursor.execute(query, (new_team_id, new_tournament_id, team_id, tournament_id))
        connection.commit()
        cursor.close()
        connection.close()

    @staticmethod
    def delete_team_entry(team_id, tournament_id):
        """Delete a specific team entry by team and tournament IDs."""
        connection = get_db_connection()
        cursor = connection.cursor()
        query = "DELETE FROM Teams_List WHERE Team_ID = %s AND Tournament_ID = %s"
        print("hi")
        cursor.execute(query, (team_id, tournament_id))
        print("lol")
        connection.commit()
        cursor.close()
        connection.close()
