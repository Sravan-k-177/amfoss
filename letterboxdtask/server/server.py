import requests
from flask import Flask, jsonify, render_template, redirect, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import check_password_hash
import os

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False) 
    
class WishlistItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(200), nullable=False)
    rating = db.Column(db.String(10))
    genres = db.Column(db.String(200))
    overview = db.Column(db.Text)
    image_url = db.Column(db.String(500))

class Reviews(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    movie_id = db.Column(db.Integer, nullable= False)
    review = db.Column(db.String(400))

@app.route("/reviews", methods=["POST"])
def create_review():
    data = request.json
    movie_id = data.get("movie_id")
    review = data.get("review")

    if not movie_id or not review:
        return jsonify({"message": "Please provide both movie ID and review text."}), 400

    new_review = Reviews(movie_id=movie_id, review=review)
    db.session.add(new_review)
    db.session.commit()

    return jsonify({"message": "Thanks for your review!"}), 201


@app.route("/reviews/<int:movie_id>", methods=["GET"])
def get_reviews(movie_id):
    reviews = Reviews.query.filter_by(movie_id=movie_id).all()

    return jsonify([
        {"id": review.id, "review": review.review}
        for review in reviews
    ])



trendingNow_movies_url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1"
new_this_week_movies_url = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"

new_this_week_tvshows_url = "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1"
trendingNow_tvshows_url= "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1"

TMDB_HEADERS = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkN2RkOWM1OTg5MTY2NWQ5NGEwOGRlZWMzYjc0NmEzYiIsIm5iZiI6MTc0NTgzNzY4Mi45NTYsInN1YiI6IjY4MGY1ZTcyOTMwYzg5NWUyODBmODg5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fPYxpuh3mJZ6nWvWVZ8ZFNIYkQ7MItgxtW-IkTWk6RI"
}


@app.route("/api/homepage/movies", methods=['GET'])
def trendingNow_movies():
    try:
        response = requests.get(trendingNow_movies_url, headers=TMDB_HEADERS)
        data = response.json()
        trendingMovies = [{"id": movie["id"],"title": movie["title"],"vote_average": movie["vote_average"],"poster_path": movie["poster_path"],"backdrop_path": movie["backdrop_path"]} for movie in data.get("results", [])]

        response = requests.get(new_this_week_movies_url, headers=TMDB_HEADERS)
        data = response.json()
        newMovies = [{"id": movie["id"], "title": movie["title"], "vote_average": movie["vote_average"], "poster_path": movie["poster_path"], "backdrop_path": movie["backdrop_path"]} for movie in data.get("results", [])]
        
        return jsonify({
            "success": True,
            "trending_movies": trendingMovies,
            "new_movies":newMovies
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route("/api/homepage/tvshows", methods=['GET'])
def trendingNow_tvshows():
    try:
        response = requests.get(trendingNow_tvshows_url, headers=TMDB_HEADERS)
        data = response.json()
        trendingMovies = [
            {
                "id": movie["id"], 
                "title": movie.get("name", "Unknown"),
                "vote_average": movie["vote_average"], 
                "poster_path": movie["poster_path"], 
                "backdrop_path": movie["backdrop_path"]
            } 
            for movie in data.get("results", [])
        ]

        response = requests.get(new_this_week_tvshows_url, headers=TMDB_HEADERS)
        data = response.json()
        newMovies = [
            {
                "id": movie["id"], 
                "title": movie.get("title", "Unknown"),
                "vote_average": movie["vote_average"], 
                "poster_path": movie["poster_path"], 
                "backdrop_path": movie["backdrop_path"]
            } 
            for movie in data.get("results", [])
        ]
        
        return jsonify({
            "success": True,
            "trending_movies": trendingMovies,
            "new_movies": newMovies
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500



@app.route("/register", methods=["POST", "GET"])
def register():
    data = request.json

    email = data.get("email")
    username = data.get("username")
    password = data.get("password")

    if not email or not username or not password:
        return jsonify({"message": "Missing required fields!"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "Email already registered, Kindly Login"}), 400

    new_user = User(email=email, username=username, password=password)
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error creating user: {str(e)}"}), 500

@app.route("/login", methods=["POST"])
def login():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    if not email:
        return jsonify({"message": "Enter a valid email"}), 400
    
    user = User.query.filter_by(email=email).first()
    
    if user and user.password == password:
        return jsonify({
            "success": True,
            "message": "logged in",
            "user_id": user.id,
            "username": user.username
        })
    else:
        return jsonify({
            "success": False,
            "message": "Wrong Password or Email"
        }), 401

@app.route("/wishlist/<int:user_id>", methods=["GET"])
def get_wishlist(user_id):
    items = WishlistItem.query.filter_by(user_id=user_id).all()
    return jsonify([
        {
            "id": item.id,
            "name": item.name,
            "rating": item.rating,
            "genres": item.genres,
            "overview": item.overview,
            "image_url": item.image_url
        } for item in items
    ])

@app.route("/wishlist/add", methods=["POST"])
def add_to_wishlist():
    data = request.json
    item = WishlistItem(
        user_id=data["user_id"],
        name=data["name"],
        rating=data.get("rating", ""),
        genres=data.get("genres", ""),
        overview=data.get("overview", ""),
        image_url=data.get("image_url", "")
    )
    db.session.add(item)
    db.session.commit()
    return jsonify({"message": "Item added"}), 201

@app.route("/wishlist/remove/<int:item_id>", methods=["DELETE"])
def remove_from_wishlist(item_id):
    item = WishlistItem.query.get(item_id)
    if item:
        db.session.delete(item)
        db.session.commit()
        return jsonify({"message": "Item removed"})
    return jsonify({"message": "Item not found"}), 404




if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=8081)
