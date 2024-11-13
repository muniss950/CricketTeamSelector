import os
import mysql.connector

# Connect to the MySQL database

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': os.environ.get('DB_PASSWORD','12345'),
    # 'password': 'kohli6639',
    'database': 'cricket',
    'charset': 'utf8mb4',  # Setting charset to utf8mb4
    'collation': 'utf8mb4_unicode_ci'  # Use a compatible collation
}
# print(db_config['password'])
db = mysql.connector.connect(**db_config)
cursor = db.cursor()

# Query to fetch all foreign key constraints
query = """
SELECT 
    TABLE_NAME,
    CONSTRAINT_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM
    INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE
    TABLE_SCHEMA = 'cricket'
    AND REFERENCED_TABLE_NAME IS NOT NULL;
"""

cursor.execute(query)
constraints = cursor.fetchall()

# Loop through each constraint and alter it to have ON DELETE CASCADE
for table_name, constraint_name, column_name, ref_table, ref_column in constraints:
    # Drop existing foreign key
    drop_fk = f"ALTER TABLE {table_name} DROP FOREIGN KEY {constraint_name};"
    cursor.execute(drop_fk)

    # Re-add foreign key with ON DELETE CASCADE
    add_fk = f"""
    ALTER TABLE {table_name}
    ADD CONSTRAINT {constraint_name} FOREIGN KEY ({column_name})
    REFERENCES {ref_table}({ref_column}) ON DELETE CASCADE;
    """
    cursor.execute(add_fk)

# Commit the changes
db.commit()
cursor.close()
db.close()