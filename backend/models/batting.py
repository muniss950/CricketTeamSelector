# models/batting.py

import mysql.connector
from config import db_config

class Batting:
    def __init__(self, player_id, match_id, runs_scored=0, balls_faced=0, fours=0, sixes=0, position=-1):
        self.player_id = player_id
        self.match_id = match_id
        self.runs_scored = runs_scored
        self.balls_faced = balls_faced
        self.fours = fours
        self.sixes = sixes
        self.position = position

    @staticmethod
    def get_batting_stats():
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute('SELECT * FROM Batting')
        batting_data = cursor.fetchall()
        cursor.close()
        connection.close()
        return batting_data

    @staticmethod
    def add_batting_stats(batting):
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute('''
            INSERT INTO Batting (Player_ID, Match_ID, Runs_Scored, Balls_Faced, Fours, Sixes, Position)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        ''', (batting.player_id, batting.match_id, batting.runs_scored, batting.balls_faced,
              batting.fours, batting.sixes, batting.position))
        connection.commit()
        cursor.close()
        connection.close()
