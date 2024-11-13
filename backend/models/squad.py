from config import get_db_connection

class Squad:
    @staticmethod
    def get_all_squad_entries():
        """Fetch all squad entries from the Squad table with player and team names."""
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT
                s.Player_ID,
                s.Team_ID,
                p.Player_Name,
                t.Team_Name
            FROM Squad s
            LEFT JOIN Player p ON s.Player_ID = p.Player_ID
            LEFT JOIN Team t ON s.Team_ID = t.Team_ID
        """
        cursor.execute(query)
        squads = cursor.fetchall()
        cursor.close()
        connection.close()
        return squads

    @staticmethod
    def get_squad_by_team(team_id):
        """Fetch all players in a specific team."""
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT
                s.Player_ID,
                s.Team_ID,
                p.Player_Name,
                t.Team_Name
            FROM Squad s
            LEFT JOIN Player p ON s.Player_ID = p.Player_ID
            LEFT JOIN Team t ON s.Team_ID = t.Team_ID
            WHERE s.Team_ID = %s
        """
        cursor.execute(query, (team_id,))
        squad = cursor.fetchall()
        cursor.close()
        connection.close()
        return squad

    @staticmethod
    def add_squad_entry(player_id, team_id):
        """Add a new squad entry to the Squad table."""
        connection = get_db_connection()
        cursor = connection.cursor()
        query = """
            INSERT INTO Squad (Player_ID, Team_ID)
            VALUES (%s, %s)
        """
        cursor.execute(query, (player_id, team_id))
        connection.commit()
        cursor.close()
        connection.close()

    @staticmethod
    def get_squad_entry(player_id, team_id):
        """Fetch a specific squad entry by player and team IDs with player and team names."""
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT
                s.Player_ID,
                s.Team_ID,
                p.Player_Name,
                t.Team_Name
            FROM Squad s
            LEFT JOIN Player p ON s.Player_ID = p.Player_ID
            LEFT JOIN Team t ON s.Team_ID = t.Team_ID
            WHERE s.Player_ID = %s AND s.Team_ID = %s
        """
        cursor.execute(query, (player_id, team_id))
        squad_entry = cursor.fetchone()
        cursor.close()
        connection.close()
        return squad_entry

    @staticmethod
    def update_squad_entry(player_id, team_id, new_player_id=None, new_team_id=None):
        """Update an existing squad entry in the Squad table."""
        connection = get_db_connection()
        cursor = connection.cursor()
        query = """
            UPDATE Squad
            SET Player_ID = COALESCE(%s, Player_ID),
                Team_ID = COALESCE(%s, Team_ID)
            WHERE Player_ID = %s AND Team_ID = %s
        """
        cursor.execute(query, (new_player_id, new_team_id, player_id, team_id))
        connection.commit()
        cursor.close()
        connection.close()

    @staticmethod
    def delete_squad_entry(player_id, team_id):
        """Delete a specific squad entry by player and team IDs."""
        connection = get_db_connection()
        cursor = connection.cursor()
        query = "DELETE FROM Squad WHERE Player_ID = %s AND Team_ID = %s"
        cursor.execute(query, (player_id, team_id))
        connection.commit()
        cursor.close()
        connection.close()
