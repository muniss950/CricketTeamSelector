from datetime import datetime
import bcrypt  # For hashing passwords
import mysql.connector
from config import db_config
class User:
    def __init__(self, user_id, username, email, password_hash, created_at=None, updated_at=None):
        self.user_id = user_id
        self.username = username
        self.email = email
        self.password_hash = password_hash
        self.created_at = created_at
        self.updated_at = updated_at


    @classmethod
    def add_user(cls, username, email, password):
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        
        try:
            cursor.execute(
                "INSERT INTO User (username, email, password_hash) VALUES (%s, %s, %s)",
                (username, email, password_hash)
            )
            connection.commit()
            user_id = cursor.lastrowid
            return cls(user_id, username, email, password_hash)
        finally:
            cursor.close()
            connection.close()
    @classmethod
    def get_all_users(cls):
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        try:
            cursor.execute("SELECT * FROM User")
            result = cursor.fetchall()
            if result:
                return result
            return None
        finally:
            cursor.close()
            connection.close()

    @classmethod
    def get_user(cls, user_id):
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        try:
            cursor.execute("SELECT * FROM User WHERE user_id = %s", (user_id,))
            result = cursor.fetchone()
            if result:
                return result
            return None
        finally:
            cursor.close()
            connection.close()

    def update_user(self, username=None, email=None, password=None):
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        try:
            fields = []
            values = []
            
            if username:
                fields.append("username = %s")
                values.append(username)
            if email:
                fields.append("email = %s")
                values.append(email)
            if password:
                fields.append("password_hash = %s")
                password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
                values.append(password_hash)
                
            values.append(self.user_id)
            
            cursor.execute(
                f"UPDATE User SET {', '.join(fields)}, updated_at = %s WHERE user_id = %s",
                values + [datetime.now()]
            )
            connection.commit()
        finally:
            cursor.close()
            connection.close()

    @classmethod
    def delete_user(cls, user_id):
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        try:
            cursor.execute("DELETE FROM User WHERE user_id = %s", (user_id,))
            connection.commit()
        finally:
            cursor.close()
            connection.close()

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
