# models/inning.py

import mysql.connector
from config import db_config

def get_db_connection():
    connection = mysql.connector.connect(**db_config)
    return connection
class Inning:
    @staticmethod
    def get_all_innings():
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Inning")
        innings = cursor.fetchall()
        cursor.close()
        connection.close()
        return innings

    @staticmethod
    def add_inning(match_id, inning_number, total_score, overs, total_wickets):
        connection = get_db_connection()
        cursor = connection.cursor()
        query = """
            INSERT INTO Inning (Match_ID, Inning_Number, Total_Score, Overs, Total_wickets)
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(query, (match_id, inning_number, total_score, overs, total_wickets))
        connection.commit()
        cursor.close()
        connection.close()
