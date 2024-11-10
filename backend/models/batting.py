# # models/batting.py

# import mysql.connector
# from config import db_config

# class Batting:
#     def __init__(self, player_id, match_id,inning_number, runs_scored=0, balls_faced=0, fours=0, sixes=0, position=-1):
#         self.player_id = player_id
#         self.match_id = match_id
#         self.runs_scored = runs_scored
#         self.balls_faced = balls_faced
#         self.fours = fours
#         self.sixes = sixes
#         self.position = position
#         self.inning_number=inning_number

#     @staticmethod
#     def get_batting_stats():
#         """Fetch all batting stats from the Batting table."""
#         connection = mysql.connector.connect(**db_config)
#         cursor = connection.cursor(dictionary=True)
#         cursor.execute('SELECT * FROM Batting')
#         batting_data = cursor.fetchall()
#         cursor.close()
#         connection.close()
#         return batting_data
#     @staticmethod
#     def get_batting_scorecard(match_id, inning_number):
#         connection = mysql.connector.connect(**db_config)
#         cursor = connection.cursor(dictionary=True)
#         query = """
#             SELECT Player_ID, Runs_Scored, Balls_Faced, Fours, Sixes,Position
#             FROM Batting
#             WHERE Match_ID = %s AND Inning_Number = %s
#         """
#         cursor.execute(query, (match_id, inning_number))
#         batting_data = cursor.fetchall()
#         cursor.close()
#         connection.close()
#         return batting_data
#     @staticmethod
#     def get_batting_stats_by_id(player_id, match_id):
#         """Fetch a specific batting entry by player and match ID."""
#         connection = mysql.connector.connect(**db_config)
#         cursor = connection.cursor(dictionary=True)
#         cursor.execute('SELECT * FROM Batting WHERE Player_ID = %s AND Match_ID = %s', (player_id, match_id))
#         batting_data = cursor.fetchone()
#         cursor.close()
#         connection.close()
#         return batting_data

#     @staticmethod
#     def add_batting_stats(batting):
#         """Add a new batting entry to the Batting table."""
#         connection = mysql.connector.connect(**db_config)
#         cursor = connection.cursor()
#         cursor.execute('''
#             INSERT INTO Batting (Player_ID, Match_ID, Runs_Scored, Balls_Faced, Fours, Sixes, Position,Inning_Number)
#             VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
#         ''', (batting.player_id, batting.match_id, batting.runs_scored, batting.balls_faced,
#               batting.fours, batting.sixes, batting.position,batting.inning_number))
#         connection.commit()
#         cursor.close()
#         connection.close()

#     @staticmethod
#     def update_batting_stats(player_id, match_id, inning_number,runs_scored=None, balls_faced=None, fours=None, sixes=None, position=None):
#         """Update an existing batting entry in the Batting table."""
#         connection = mysql.connector.connect(**db_config)
#         cursor = connection.cursor()
#         cursor.execute('''
#             UPDATE Batting
#             SET Runs_Scored = COALESCE(%s, Runs_Scored),
#                 Balls_Faced = COALESCE(%s, Balls_Faced),
#                 Fours = COALESCE(%s, Fours),
#                 Sixes = COALESCE(%s, Sixes),
#                 Position = COALESCE(%s, Position)
#                 Inning_Number=COALESCE(%s, Inning_Number)
#             WHERE Player_ID = %s AND Match_ID = %s
#         ''', (runs_scored, balls_faced, fours, sixes, position, player_id, match_id,inning_number))
#         connection.commit()
#         cursor.close()
#         connection.close()

#     @staticmethod
#     def delete_batting_stats(player_id, match_id,inning_number):
#         """Delete a specific batting entry by player and match ID."""
#         connection = mysql.connector.connect(**db_config)
#         cursor = connection.cursor()
#         cursor.execute('DELETE FROM Batting WHERE Player_ID = %s AND Match_ID = %s AND Inning_Number = %s', (player_id, match_id,inning_number))
#         connection.commit()
#         cursor.close()
#         connection.close()


import mysql.connector
from config import db_config

class Batting:
    def __init__(self, player_id, match_id, inning_number, runs_scored=0, balls_faced=0, fours=0, sixes=0, position=-1):
        self.player_id = player_id
        self.match_id = match_id
        self.runs_scored = runs_scored
        self.balls_faced = balls_faced
        self.fours = fours
        self.sixes = sixes
        self.position = position
        self.inning_number = inning_number

    @staticmethod
    def get_batting_stats():
        """Fetch all batting stats from the Batting table."""
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        cursor.execute('SELECT * FROM Batting')
        batting_data = cursor.fetchall()
        cursor.close()
        connection.close()
        return batting_data

    @staticmethod
    def get_batting_stats_by_player(player_id):
        """Fetch all batting stats for a specific player."""
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        cursor.execute('SELECT * FROM Batting WHERE Player_ID = %s', (player_id,))
        batting_data = cursor.fetchall()
        cursor.close()
        connection.close()
        return batting_data

    @staticmethod
    def get_batting_scorecard(match_id, inning_number):
        """Fetch scorecard for a particular match and inning."""
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT Player_ID, Runs_Scored, Balls_Faced, Fours, Sixes, Position
            FROM Batting
            WHERE Match_ID = %s AND Inning_Number = %s
        """
        cursor.execute(query, (match_id, inning_number))
        batting_data = cursor.fetchall()
        cursor.close()
        connection.close()
        return batting_data

    @staticmethod
    def get_batting_stats_by_id(player_id, match_id):
        """Fetch a specific batting entry by player and match ID."""
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        cursor.execute('SELECT * FROM Batting WHERE Player_ID = %s AND Match_ID = %s', (player_id, match_id))
        batting_data = cursor.fetchone()
        cursor.close()
        connection.close()
        return batting_data

    @staticmethod
    def add_batting_stats(batting):
        """Add a new batting entry to the Batting table."""
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute(''' 
            INSERT INTO Batting (Player_ID, Match_ID, Runs_Scored, Balls_Faced, Fours, Sixes, Position, Inning_Number) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        ''', (batting.player_id, batting.match_id, batting.runs_scored, batting.balls_faced, 
              batting.fours, batting.sixes, batting.position, batting.inning_number))
        connection.commit()
        cursor.close()
        connection.close()

    @staticmethod
    def update_batting_stats(player_id, match_id, inning_number, runs_scored=None, balls_faced=None, fours=None, sixes=None, position=None):
        """Update an existing batting entry in the Batting table."""
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute(''' 
            UPDATE Batting 
            SET Runs_Scored = COALESCE(%s, Runs_Scored), 
                Balls_Faced = COALESCE(%s, Balls_Faced), 
                Fours = COALESCE(%s, Fours), 
                Sixes = COALESCE(%s, Sixes), 
                Position = COALESCE(%s, Position),
                Inning_Number = COALESCE(%s, Inning_Number)
            WHERE Player_ID = %s AND Match_ID = %s AND Inning_Number = %s
        ''', (runs_scored, balls_faced, fours, sixes, position, inning_number, player_id, match_id))
        connection.commit()
        cursor.close()
        connection.close()

    @staticmethod
    def delete_batting_stats(player_id, match_id, inning_number):
        """Delete a specific batting entry by player and match ID."""
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute('DELETE FROM Batting WHERE Player_ID = %s AND Match_ID = %s AND Inning_Number = %s', (player_id, match_id, inning_number))
        connection.commit()
        cursor.close()
        connection.close()
