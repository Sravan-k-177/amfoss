from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pokedex.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

### MODELS ###
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    pokemons = db.relationship('CapturedPokemon', backref='owner', lazy=True)

class CapturedPokemon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# Create tables
with app.app_context():
    db.create_all()

### ROUTES ###
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data['email']
    password = data['password']
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 400
    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'})

@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    email = data['email']
    password = data['password']
    user = User.query.filter_by(email=email, password=password).first()
    if user:
        return jsonify({'message': 'Login successful'})
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/capture', methods=['POST'])
def capture():
    data = request.get_json()
    email = data['email']
    pokemon = data['pokemon']
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    if CapturedPokemon.query.filter_by(user_id=user.id, name=pokemon).first():
        return jsonify({'message': 'You already captured this Pokémon'}), 400

    if CapturedPokemon.query.filter_by(user_id=user.id).count() >= 4:
        return jsonify({'message': 'You already captured 4 Pokémon!'}), 400

    new_pokemon = CapturedPokemon(name=pokemon, owner=user)
    db.session.add(new_pokemon)
    db.session.commit()
    return jsonify({'message': 'Pokémon captured successfully'})

@app.route('/mypokemons', methods=['POST'])
def mypokemons():
    data = request.get_json()
    email = data['email']
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    pokemon_names = [p.name for p in user.pokemons]
    return jsonify({'pokemons': pokemon_names})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

