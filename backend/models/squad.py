# models/squad.py
from config import get_db_connection

class Squad:
    @staticmethod
    def get_all_squad_entries():
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Squad")
        squads = cursor.fetchall()
        cursor.close()
        connection.close()
        return squads

    @staticmethod
    def add_squad_entry(player_id, team_id, match_id):
        connection = get_db_connection()
        cursor = connection.cursor()
        query = """
            INSERT INTO Squad (Player_ID, Team_ID, Match_ID)
            VALUES (%s, %s, %s)
        """
        cursor.execute(query, (player_id, team_id, match_id))
        connection.commit()
        cursor.close()
        connection.close()
