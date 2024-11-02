import mysql.connector
from config import db_config  # Import database configuration from config.py

class PlayerBattingStats:
    def __init__(self, player_id, player_name, matches_played=0, total_runs=None, total_balls=None,
                 total_fours=None, total_sixes=None, average_runs_scored=None):
        self.player_id = player_id
        self.player_name = player_name
        self.matches_played = matches_played
        self.total_runs = total_runs
        self.total_balls = total_balls
        self.total_fours = total_fours
        self.total_sixes = total_sixes
        self.average_runs_scored = average_runs_scored

    @staticmethod
    def get_db_connection():
        return mysql.connector.connect(**db_config)

    @classmethod
    def fetch_all(cls):
        connection = cls.get_db_connection()
        cursor = connection.cursor()

        cursor.execute("SELECT * FROM Player_Batting_Stats")
        results = cursor.fetchall()
        
        cursor.close()
        connection.close()

        return [cls(*row) for row in results]  # Convert each row to a PlayerBattingStats instance

    @classmethod
    def fetch_by_player_id(cls, player_id):
        connection = cls.get_db_connection()
        cursor = connection.cursor()

        cursor.execute("SELECT * FROM Player_Batting_Stats WHERE Player_ID = %s", (player_id,))
        result = cursor.fetchone()

        cursor.close()
        connection.close()

        return cls(*result) if result else None

    @classmethod
    def add_stats(cls, stats):
        connection = cls.get_db_connection()
        cursor = connection.cursor()

        cursor.execute('''
            INSERT INTO Player_Batting_Stats (Player_ID, Player_Name, Matches_Played, Total_Runs, 
            Total_Balls, Total_Fours, Total_Sixes, Average_Runs_Scored)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        ''', (stats.player_id, stats.player_name, stats.matches_played, stats.total_runs,
              stats.total_balls, stats.total_fours, stats.total_sixes, stats.average_runs_scored))

        connection.commit()
        cursor.close()
        connection.close()
