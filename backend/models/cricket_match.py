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
        cursor = connection.cursor(dictionary=True)
        cursor.execute('SELECT * FROM Cricket_Match')
        matches = cursor.fetchall()
        cursor.close()
        connection.close()
        return matches

    @staticmethod
    def get_match_by_id(match_id):
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        cursor.execute('SELECT * FROM Cricket_Match WHERE Match_ID = %s', (match_id,))
        match = cursor.fetchone()
        cursor.close()
        connection.close()
        return match

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

    @staticmethod
    def update_match(match_id, match_data):
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = '''
            UPDATE Cricket_Match 
            SET 
                Match_Date = COALESCE(%s, Match_Date),
                Tournament_ID = COALESCE(%s, Tournament_ID),
                Team1_ID = COALESCE(%s, Team1_ID),
                Team2_ID = COALESCE(%s, Team2_ID),
                Winner = COALESCE(%s, Winner),
                Stage = COALESCE(%s, Stage)
            WHERE Match_ID = %s
        '''
        cursor.execute(
            query,
            (
                match_data.get('Match_Date'),
                match_data.get('Tournament_ID'),
                match_data.get('Team1_ID'),
                match_data.get('Team2_ID'),
                match_data.get('Winner'),
                match_data.get('Stage'),
                match_id
            )
        )
        connection.commit()
        cursor.close()
        connection.close()

    @staticmethod
    def delete_match(match_id):
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute('DELETE FROM Cricket_Match WHERE Match_ID = %s', (match_id,))
        connection.commit()
        cursor.close()
        connection.close()
