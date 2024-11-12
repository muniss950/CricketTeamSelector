import mysql.connector
from config import db_config
def get_db_connection():
    connection = mysql.connector.connect(**db_config)
    return connection
class Player:
    def __init__(self, player_id=None, name=None, gender=None, role=None, team_id=None, dob=None):
        self.player_id = player_id
        self.name = name
        self.gender = gender
        self.role = role
        self.team_id = team_id
        self.dob = dob

    @classmethod
    def from_db_row(cls, row):
        """Initialize a Player instance from a database row."""
        return cls(
            player_id=row[0],
            name=row[1],
            gender=row[2],
            role=row[3],
            team_id=row[4],
            dob=row[5]
        )

    def to_dict(self):
        """Convert the Player instance to a dictionary for JSON responses."""
        return {
            "Player_ID": self.player_id,
            "Player_Name": self.name,
            "Gender": self.gender,
            "Role": self.role,
            "Team_ID": self.team_id,
            "DOB": self.dob
        }

    @classmethod
    def get_all(cls):
        """Retrieve all players from the database."""
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT * FROM Player')
        rows = cursor.fetchall()
        cursor.close()
        connection.close()
        
        return [cls.from_db_row(row).to_dict() for row in rows]

    @classmethod
    def get_by_id(cls, player_id):
        """Retrieve a specific player by ID from the database."""
        connection = get_db_connection()
        cursor = connection.cursor()
        # cursor.execute('SELECT * FROM Player WHERE Player_ID = %s', (player_id,))

        print(player_id)
        
        cursor.execute('CALL GetPlayerByID(%s)',(player_id,))
        result = cursor.fetchone()
        row=result
        print(row)
        cursor.close()
        # connection.commit()

        connection.close()
        
        return cls.from_db_row(row).to_dict() if row else None

    def save_to_db(self):
        """Insert the player into the database."""
        connection = get_db_connection()
        cursor = connection.cursor()
        
            # INSERT INTO Player (Player_Name, Gender, Role, Team_ID, DOB)
        cursor.execute('''
            CALL InsertPlayer(%s, %s, %s, %s, %s)
        ''', (self.name , self.gender, self.role, self.team_id, self.dob))
        connection.commit()
        cursor.close()
        connection.close()

    def update_in_db(self):
        """Update the player's information in the database."""
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute('''
            UPDATE Player
            SET Player_Name = %s, Gender = %s, Role = %s, Team_ID = %s, DOB = %s
            WHERE Player_ID = %s
        ''', (self.name, self.gender, self.role, self.team_id, self.dob, self.player_id))
        connection.commit()
        cursor.close()
        connection.close()

    @classmethod
    def delete_by_id(cls, player_id):
        """Delete a specific player by ID from the database."""
        connection = get_db_connection()
        cursor = connection.cursor()
        print("test before exec")
        cursor.execute('DELETE FROM Player WHERE Player_ID = %s', (player_id,))
        print("test after exec")
        connection.commit()
        cursor.close()
        connection.close()
