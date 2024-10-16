from flask_sqlalchemy import SQLAlchemy

# Create a SQLAlchemy instance
db = SQLAlchemy()

class BallByBall(db.Model):
    __tablename__ = 'ball_by_ball'
    
    # Composite primary key
    overno = db.Column(db.Integer, primary_key=True)
    bowlno = db.Column(db.Integer, primary_key=True)
    run = db.Column(db.Integer)
    wicket = db.Column(db.Integer)
    on_strike = db.Column(db.Integer, db.ForeignKey('Player.Player_ID'))
    other_end = db.Column(db.Integer, db.ForeignKey('Player.Player_ID'))
    bowler = db.Column(db.Integer, db.ForeignKey('Player.Player_ID'))
    match_id = db.Column(db.Integer, db.ForeignKey('Inning.Match_ID'))
    inning_number = db.Column(db.Integer, db.ForeignKey('Inning.Inning_Number'))

    # Optionally, define relationships
    on_strike_player = db.relationship('Player', foreign_keys=[on_strike])
    other_end_player = db.relationship('Player', foreign_keys=[other_end])
    bowler_player = db.relationship('Player', foreign_keys=[bowler])

    def __repr__(self):
        return f'<BallByBall over={self.overno}, ball={self.bowlno}, runs={self.run}>'

