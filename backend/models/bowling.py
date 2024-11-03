# models/bowling.py

class Bowling:
    def __init__(self, connection):
        self.connection = get_db_connection()

    def get_bowling_stats(self):
        with self.connection.cursor(dictionary=True) as cursor:
            cursor.execute("SELECT * FROM Bowling")
            return cursor.fetchall()

    def get_bowling_stats_by_player(self, match_id, player_id):
        with self.connection.cursor(dictionary=True) as cursor:
            cursor.execute("SELECT * FROM Bowling WHERE Match_ID = %s AND Player_ID = %s", (match_id, player_id))
            return cursor.fetchone()

    def add_bowling_stats(self, bowling_data):
        with self.connection.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO Bowling (Player_ID, Match_ID, Overs_Bowled, Balls_Bowled, Runs_Conceded, Wickets_Taken, Maiden_Overs)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """,
                (
                    bowling_data['Player_ID'], bowling_data['Match_ID'], bowling_data['Overs_Bowled'],
                    bowling_data['Balls_Bowled'], bowling_data['Runs_Conceded'], bowling_data['Wickets_Taken'],
                    bowling_data['Maiden_Overs']
                )
            )
            self.connection.commit()

    def update_bowling_stats(self, match_id, player_id, bowling_data):
        with self.connection.cursor() as cursor:
            cursor.execute(
                """
                UPDATE Bowling SET Overs_Bowled = %s, Balls_Bowled = %s, Runs_Conceded = %s, Wickets_Taken = %s, Maiden_Overs = %s
                WHERE Match_ID = %s AND Player_ID = %s
                """,
                (
                    bowling_data['Overs_Bowled'], bowling_data['Balls_Bowled'], bowling_data['Runs_Conceded'],
                    bowling_data['Wickets_Taken'], bowling_data['Maiden_Overs'], match_id, player_id
                )
            )
            self.connection.commit()

    def delete_bowling_stats(self, match_id, player_id):
        with self.connection.cursor() as cursor:
            cursor.execute("DELETE FROM Bowling WHERE Match_ID = %s AND Player_ID = %s", (match_id, player_id))
            self.connection.commit()
