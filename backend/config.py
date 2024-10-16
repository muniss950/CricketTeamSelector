import os
import mysql.connector

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': os.environ.get('DB_PASSWORD','12345'),
    'database': 'cricket',
    'charset': 'utf8mb4',  # Setting charset to utf8mb4
    'collation': 'utf8mb4_unicode_ci'  # Use a compatible collation
}
# print(db_config['password'])
connection = mysql.connector.connect(**db_config)
