from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
class Inning(db.Model):
    __tablename__ = 'Inning'
    Match_ID = db.Column(db.Integer, db.ForeignKey('Match.Match_ID'), primary_key=True)
    Inning_Number = db.Column(db.Integer, primary_key=True)
    # Additional fields and relationships

