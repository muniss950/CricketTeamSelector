from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Player(db.Model):
    __tablename__ = 'Player'
    Player_ID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<Player {self.Name}>'
