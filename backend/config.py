import os
import mysql.connector

db_config = {
    'host': 'localhost',
    'port':3306,
    'user': 'root',
    'password': os.environ.get('DB_PASSWORD','12345'),
    # 'password': 'kohli6639',
    'database': 'cricket',
    'charset': 'utf8mb4',  # Setting charset to utf8mb4
    'collation': 'utf8mb4_unicode_ci'  # Use a compatible collation
}
# print(db_config['password'])
connection = mysql.connector.connect(**db_config)
def get_db_connection():
    connection = mysql.connector.connect(**db_config)
    return connection

