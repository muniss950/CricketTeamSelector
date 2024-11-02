# models/cricket_match.py

import mysql.connector
from config import db_config

class CricketMatch:
    def __init__(self, match_date, tournament_id, team1_id, team2_id, winner=None, stage=None):
        self.match_date = match_date
        self.tournament_id = tournament_id
        self.team1_id = team1_id
        self.team2_id = team2_id
        self.winner = winner
        self.stage = stage

    @staticmethod
    def get_all_matches():
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute('SELECT * FROM Cricket_Match')
        matches = cursor.fetchall()
        cursor.close()
        connection.close()
        return matches

    @staticmethod
    def add_match(match):
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute('''
            INSERT INTO Cricket_Match (Match_Date, Tournament_ID, Team1_ID, Team2_ID, Winner, Stage)
            VALUES (%s, %s, %s, %s, %s, %s)
        ''', (match.match_date, match.tournament_id, match.team1_id, match.team2_id, match.winner, match.stage))
        connection.commit()
        cursor.close()
        connection.close()

