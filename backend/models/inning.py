# models/inning.py
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
    def get_inning_scorecard(match_id, inning_number):
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT Total_Score, Overs, Total_Wickets
            FROM Inning
            WHERE Match_ID = %s AND Inning_Number = %s
        """
        cursor.execute(query, (match_id, inning_number))
        inning_data = cursor.fetchone()
        cursor.close()
        connection.close()
        return inning_data

    @staticmethod
    def add_inning(match_id, inning_number, total_score, overs, total_wickets):
        connection = get_db_connection()
        cursor = connection.cursor()
        query = """
            INSERT INTO Inning (Match_ID, Inning_Number, Total_Score, Overs, Total_Wickets)
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(query, (match_id, inning_number, total_score, overs, total_wickets))
        connection.commit()
        cursor.close()
        connection.close()

    @staticmethod
    def update_inning(match_id, inning_number, inning_data):
        connection = get_db_connection()
        cursor = connection.cursor()
        query = """
            UPDATE Inning
            SET Total_Score = COALESCE(%s, Total_Score),
                Overs = COALESCE(%s, Overs),
                Total_Wickets = COALESCE(%s, Total_Wickets)
            WHERE Match_ID = %s AND Inning_Number = %s
        """
        cursor.execute(query, (
            inning_data.get('Total_Score'),
            inning_data.get('Overs'),
            inning_data.get('Total_Wickets'),
            match_id,
            inning_number
        ))
        connection.commit()
        cursor.close()
        connection.close()

    @staticmethod
    def delete_inning(match_id, inning_number):
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("DELETE FROM Inning WHERE Match_ID = %s AND Inning_Number = %s", (match_id, inning_number))
        connection.commit()
        cursor.close()
        connection.close()
