import unittest
from app import app

class AppTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Initialize test client for the Flask app
        cls.client = app.test_client()
        cls.client.testing = True  # Enables testing mode

    def test_route_registration(self):
        # Test if all blueprints are registered successfully
        expected_blueprints = [
            'player_bp', 'team_bp', 'tournament_bp', 'player_batting_stats_bp', 'batting_bp',
            'cricket_match_bp', 'ball_by_ball_bp', 'bowling_bp', 'inning_bp', 
            'player_bowling_stats_bp', 'squad_bp', 'teams_list_bp', 'scorecard_bp'
        ]
         
        for bp in expected_blueprints:
            self.assertIn(bp, app.blueprints, f"{bp} is not registered in the app")

    def test_home_route(self):
        # Test if the app home page (if defined) is accessible
        response = self.client.get('/')
        # Replace with the expected status code and response data for your app's home page
        self.assertEqual(response.status_code, 200)  # Assuming no root route is defined

    # Define test cases for a few endpoints from each blueprint
    def test_player_endpoint(self):
        response = self.client.get('/players')  # Replace with actual endpoint
        self.assertIn(response.status_code, [200, 404])

    def test_team_endpoint(self):
        response = self.client.get('/teams')  # Replace with actual endpoint
        self.assertIn(response.status_code, [200, 404])

    def test_scorecard_endpoint(self):
        response = self.client.get('/scorecard')  # Replace with actual endpoint
        self.assertIn(response.status_code, [200,400, 404])

    # Continue with similar tests for each major endpoint

if __name__ == '__main__':
    unittest.main()
