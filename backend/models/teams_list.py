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

