# models/player_bowling_stats.py
from config import get_db_connection

class PlayerBowlingStats:
    def __init__(self, matches_played, player_id, player_name, total_balls_bowled, total_maiden_overs, total_overs_bowled, total_runs_conceded, total_wickets_taken):
        self.matches_played = int(matches_played)
        self.player_id = int(player_id)
        self.player_name = player_name
        self.total_balls_bowled = int(total_balls_bowled)
        self.total_maiden_overs = int(total_maiden_overs)
        self.total_overs_bowled = int(total_overs_bowled)
        self.total_runs_conceded = int(total_runs_conceded)
        self.total_wickets_taken = int(total_wickets_taken)
    @classmethod
    def from_db_row(cls, row):
        """Initialize a PlayerStats instance from a database row."""
        return cls(
            player_id=row[0],
            player_name=row[1],
            matches_played=row[2],
            total_balls_bowled=row[3],
            total_maiden_overs=row[4],
            total_overs_bowled=row[5],
            total_runs_conceded=row[6],
            total_wickets_taken=row[7]
        )

    def to_dict(self):
        """Convert the PlayerStats instance to a dictionary for JSON responses."""
        return {
            "Matches_Played": self.matches_played,
            "Player_ID": self.player_id,
            "Player_Name": self.player_name,
            "Total_Balls_Bowled": self.total_balls_bowled,
            "Total_Maiden_Overs": self.total_maiden_overs,
            "Total_Overs_Bowled": self.total_overs_bowled,
            "Total_Runs_Conceded": self.total_runs_conceded,
            "Total_Wickets_Taken": self.total_wickets_taken
        }
    @staticmethod
    def get_all_bowling_stats():
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Player_Bowling_Stats")
        stats = cursor.fetchall()
        cursor.close()
        connection.close()
        return stats
        # return [cls.from_db_row(row).to_dict() for row in stats]

    @classmethod
    def fetch_by_player_id(cls, player_id):
        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute("SELECT * FROM Player_Bowling_Stats WHERE Player_ID = %s", (player_id,))
        result = cursor.fetchone()

        cursor.close()
        connection.close()

        # return result
        # return cls(*result) if result else None
        #
        return cls.from_db_row(result).to_dict() if result else None
