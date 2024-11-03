from config import get_db_connection

class Bowling:
    @staticmethod
    def get_bowling_stats():
        connection = get_db_connection()
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute("SELECT * FROM Bowling")
            return cursor.fetchall()

    @staticmethod
    def get_bowling_stats_by_player(match_id, player_id):
        connection = get_db_connection()
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute("SELECT * FROM Bowling WHERE Match_ID = %s AND Player_ID = %s", (match_id, player_id))
            return cursor.fetchone()

    @staticmethod
    def add_bowling_stats(bowling_data):
        connection = get_db_connection()
        with connection.cursor() as cursor:
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
            connection.commit()

    @staticmethod
    def update_bowling_stats(match_id, player_id, bowling_data):
        connection = get_db_connection()
        with connection.cursor() as cursor:
            query = """
                UPDATE Bowling 
                SET 
                    Overs_Bowled = COALESCE(%s, Overs_Bowled),
                    Balls_Bowled = COALESCE(%s, Balls_Bowled),
                    Runs_Conceded = COALESCE(%s, Runs_Conceded),
                    Wickets_Taken = COALESCE(%s, Wickets_Taken),
                    Maiden_Overs = COALESCE(%s, Maiden_Overs)
                WHERE Match_ID = %s AND Player_ID = %s
            """
            cursor.execute(
                query,
                (
                    bowling_data.get('Overs_Bowled'), 
                    bowling_data.get('Balls_Bowled'), 
                    bowling_data.get('Runs_Conceded'),
                    bowling_data.get('Wickets_Taken'), 
                    bowling_data.get('Maiden_Overs'), 
                    match_id, 
                    player_id
                )
            )
            connection.commit()
    @staticmethod
    def delete_bowling_stats(match_id, player_id):
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM Bowling WHERE Match_ID = %s AND Player_ID = %s", (match_id, player_id))
            connection.commit()
