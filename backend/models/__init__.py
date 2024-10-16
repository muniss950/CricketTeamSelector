from flask_sqlalchemy import SQLAlchemy

# Create a SQLAlchemy instance
db = SQLAlchemy()

# Import all models to ensure they are registered
from .player import Player
from .inning import Inning
from .ball_by_ball import BallByBall

