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

    @staticmethod
    def add_bowling_stats(player_id, player_name, matches_played, total_overs_bowled, total_balls_bowled, total_runs_conceded, total_wickets_taken, total_maiden_overs):
        connection = get_db_connection()
        cursor = connection.cursor()
        query = """
            INSERT INTO Player_Bowling_Stats (Player_ID, Player_Name, Matches_Played, Total_Overs_Bowled, Total_Balls_Bowled, Total_Runs_Conceded, Total_Wickets_Taken, Total_Maiden_Overs)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (player_id, player_name, matches_played, total_overs_bowled, total_balls_bowled, total_runs_conceded, total_wickets_taken, total_maiden_overs))
        connection.commit()
        cursor.close()
        connection.close()

