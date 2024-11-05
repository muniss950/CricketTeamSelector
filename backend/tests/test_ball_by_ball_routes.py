# tests/test_ball_by_ball_routes.py

import unittest
from app import app
from unittest.mock import patch
from models.ball_by_ball import BallByBall

class BallByBallRoutesTestCase(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True

    @patch('models.ball_by_ball.BallByBall.get_ball_by_ball_stats')
    def test_get_ball_by_ball_stats(self, mock_get_ball_by_ball_stats):
        # Mock data
        mock_get_ball_by_ball_stats.return_value = [
            {'over_no': 1, 'bowl_no': 1, 'run_taken': 0, 'wicket': None, 'on_strike': 'Player A', 'other_end': 'Player B', 'bowler': 'Bowler X'}
        ]
        
        response = self.client.get('/ball-by-ball')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, mock_get_ball_by_ball_stats.return_value)

    @patch('models.ball_by_ball.BallByBall.add_ball_by_ball_stats')
    def test_add_ball_by_ball_stats(self, mock_add_ball_by_ball_stats):
        # Mock data for POST request
        data = {
            'over_no': 1,
            'bowl_no': 2,
            'run_taken': 4,
            'wicket': None,
            'on_strike': 'Player A',
            'other_end': 'Player B',
            'bowler': 'Bowler Y',
            'Match_ID': 1,
            'Inning_Number': 1
        }
        
        response = self.client.post('/ball-by-ball', json=data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json, {'message': 'Ball by ball stats added successfully'})
        mock_add_ball_by_ball_stats.assert_called_once()

    @patch('models.ball_by_ball.BallByBall.update_ball_by_ball_stats')
    def test_update_ball_by_ball_stats(self, mock_update_ball_by_ball_stats):
        # Mock data for PUT request
        data = {
            'run_taken': 6,
            'wicket': 'Caught',
            'on_strike': 'Player C'
        }
        match_id = 1
        inning_number = 1
        over_no = 1
        bowl_no = 2
        
        response = self.client.put(f'/ball-by-ball/{match_id}/{inning_number}/{over_no}/{bowl_no}', json=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'message': 'Ball by ball stats updated successfully'})
        mock_update_ball_by_ball_stats.assert_called_once_with(match_id, inning_number, over_no, bowl_no, data)

    @patch('models.ball_by_ball.BallByBall.delete_ball_by_ball_stats')
    def test_delete_ball_by_ball_stats(self, mock_delete_ball_by_ball_stats):
        match_id = 1
        inning_number = 1
        over_no = 1
        bowl_no = 2
        
        response = self.client.delete(f'/ball-by-ball/{match_id}/{inning_number}/{over_no}/{bowl_no}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'message': 'Ball by ball stats deleted successfully'})
        mock_delete_ball_by_ball_stats.assert_called_once_with(match_id, inning_number, over_no, bowl_no)

if __name__ == '__main__':
    unittest.main()

