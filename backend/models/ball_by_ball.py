# models/ball_by_ball.py

import mysql.connector
from config import db_config
from routes import ball_by_ball_routes

class BallByBall:
    def __init__(self, over_no, bowl_no, run_taken=None, wicket=None, on_strike=None, other_end=None, bowler=None, match_id=None, inning_number=None):
        self.over_no = over_no
        self.bowl_no = bowl_no
        self.run_taken = run_taken
        self.wicket = wicket
        self.on_strike = on_strike
        self.other_end = other_end
        self.bowler = bowler
        self.match_id = match_id
        self.inning_number = inning_number

    @staticmethod
    def get_ball_by_ball_stats():
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        cursor.execute('SELECT * FROM ball_by_ball')
        ball_by_ball_data = cursor.fetchall()
        cursor.close()
        connection.close()
        return ball_by_ball_data

    def add_ball_by_ball_stats(self):
        ball_by_ball=self
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute('''
            INSERT INTO ball_by_ball (over_no, bowl_no, run_taken, wicket, on_strike, other_end, bowler, Match_ID, Inning_Number)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        ''', (ball_by_ball.over_no, ball_by_ball.bowl_no, ball_by_ball.run_taken, ball_by_ball.wicket,
              ball_by_ball.on_strike, ball_by_ball.other_end, ball_by_ball.bowler, ball_by_ball.match_id, ball_by_ball.inning_number))
        connection.commit()
        cursor.close()
        connection.close()
    @staticmethod
    def update_ball_by_ball_stats(match_id, inning_number, over_no, bowl_no, ball_data):
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = '''
            UPDATE ball_by_ball
            SET run_taken = COALESCE(%s, run_taken),
                wicket = COALESCE(%s, wicket),
                on_strike = COALESCE(%s, on_strike),
                other_end = COALESCE(%s, other_end),
                bowler = COALESCE(%s, bowler)
            WHERE Match_ID = %s AND Inning_Number = %s AND over_no = %s AND bowl_no = %s
        '''
        cursor.execute(query, (
            ball_data.get('run_taken'),
            ball_data.get('wicket'),
            ball_data.get('on_strike'),
            ball_data.get('other_end'),
            ball_data.get('bowler'),
            match_id,
            inning_number,
            over_no,
            bowl_no
        ))
        connection.commit()
        cursor.close()
        connection.close()

    @staticmethod
    def delete_ball_by_ball_stats(match_id, inning_number, over_no, bowl_no):
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute("DELETE FROM ball_by_ball WHERE Match_ID = %s AND Inning_Number = %s AND over_no = %s AND bowl_no = %s",
                       (match_id, inning_number, over_no, bowl_no))
        connection.commit()
        cursor.close()
        connection.close()
