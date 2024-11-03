# models/player_bowling_stats.py
from config import get_db_connection

class PlayerBowlingStats:
    @staticmethod
    def get_all_bowling_stats():
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Player_Bowling_Stats")
        stats = cursor.fetchall()
        cursor.close()
        connection.close()
        return stats

