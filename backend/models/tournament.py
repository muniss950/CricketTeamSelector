import mysql.connector
from config import db_config

class Tournament:
    def __init__(self, tournament_id=None, tournament_name=None, format=None, level=None, start_date=None, end_date=None):
        self.tournament_id = tournament_id
        self.tournament_name = tournament_name
        self.format = format
        self.level = level
        self.start_date = start_date
        self.end_date = end_date

    @staticmethod
    def from_row(row):
        return Tournament(
            tournament_id=row[0],
            tournament_name=row[1],
            format=row[2],
            level=row[3],
            start_date=row[4],
            end_date=row[5]
        )

    @staticmethod
    def get_all_tournaments():
        """Retrieve all tournaments from the database."""
        try:
            connection = mysql.connector.connect(**db_config)
            cursor = connection.cursor()
            cursor.execute('SELECT * FROM Tournament')
            tournaments = [Tournament.from_row(row) for row in cursor.fetchall()]
            cursor.close()
            connection.close()
            return tournaments
        except mysql.connector.Error as err:
            raise Exception(f"Error: {err}")

    @staticmethod
    def get_tournament_by_id(tournament_id):
        """Retrieve a tournament by its ID."""
        try:
            connection = mysql.connector.connect(**db_config)
            cursor = connection.cursor()
            cursor.execute('SELECT * FROM Tournament WHERE Tournament_ID = %s', (tournament_id,))
            row = cursor.fetchone()
            cursor.close()
            connection.close()
            return Tournament.from_row(row) if row else None
        except mysql.connector.Error as err:
            raise Exception(f"Error: {err}")

    @staticmethod
    def add_tournament(tournament_name, format=None, level=None, start_date=None, end_date=None):
        """Add a new tournament to the database."""
        try:
            connection = mysql.connector.connect(**db_config)
            cursor = connection.cursor()
            cursor.execute('''
                INSERT INTO Tournament (Tournament_Name, Format, Level, Start_Date, End_Date)
                VALUES (%s, %s, %s, %s, %s)
            ''', (tournament_name, format, level, start_date, end_date))
            connection.commit()
            cursor.close()
            connection.close()
        except mysql.connector.Error as err:
            raise Exception(f"Error: {err}")

    def update_in_db(self):
        """Update the tournament in the database."""
        try:
            connection = mysql.connector.connect(**db_config)
            cursor = connection.cursor()
            cursor.execute('''
                UPDATE Tournament
                SET Tournament_Name = %s, Format = %s, Level = %s, Start_Date = %s, End_Date = %s
                WHERE Tournament_ID = %s
            ''', (self.tournament_name, self.format, self.level, self.start_date, self.end_date, self.tournament_id))
            connection.commit()
            cursor.close()
            connection.close()
        except mysql.connector.Error as err:
            raise Exception(f"Error: {err}")

    @staticmethod
    def delete_tournament(tournament_id):
        """Delete a tournament from the database."""
        try:
            connection = mysql.connector.connect(**db_config)
            cursor = connection.cursor()
            cursor.execute('DELETE FROM Tournament WHERE Tournament_ID = %s', (tournament_id,))
            connection.commit()
            cursor.close()
            connection.close()
        except mysql.connector.Error as err:
            raise Exception(f"Error: {err}")

    def to_dict(self):
        """Convert the Tournament instance to a dictionary."""
        return {
            "Tournament_ID": self.tournament_id,
            "Tournament_Name": self.tournament_name,
            "Format": self.format,
            "Level": self.level,
            "Start_Date": self.start_date,
            "End_Date": self.end_date
        }
