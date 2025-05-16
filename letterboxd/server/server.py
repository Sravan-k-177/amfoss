import requests
from flask import Flask, jsonify, render_template, redirect, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import check_password_hash
import os

app = Flask(__name__)
CORS(app)

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(os.path.abspath(os.path.dirname(__file__)), 'instance', 'database.db')}"

db = SQLAlchemy(app)

# data class is like a row of data
# working here right now
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False) 
    




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

# @app.route("/api/homepage/tvshows", methods=['GET'])
# def trendingNow_tvshows():
#     try:
#         response = requests.get(trendingNow_tvshows_url, headers=TMDB_HEADERS)
#         data = response.json()
#         trendingMovies = [{"id": movie["id"],"title": movie["title"],"vote_average": movie["vote_average"],"poster_path": movie["poster_path"],"backdrop_path": movie["backdrop_path"]} for movie in data.get("results", [])]

#         response = requests.get(new_this_week_tvshows_url, headers=TMDB_HEADERS)
#         data = response.json()
#         newMovies = [{"id": movie["id"], "title": movie["title"], "vote_average": movie["vote_average"], "poster_path": movie["poster_path"], "backdrop_path": movie["backdrop_path"]} for movie in data.get("results", [])]
        
#         return jsonify({
#             "success": True,
#             "trending_movies": trendingMovies,
#             "new_movies":newMovies
#         })
#     except Exception as e:
#         return jsonify({
#             "success": False,
#             "error": str(e)
#         }), 500

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

@app.route("/login", methods=["GET", "POST"])
def login():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    if not email:
        return jsonify({"message": "Enter a valid email"}), 400
    
    user = User.query.filter_by(email=email).first()
    if check_password_hash(user.password, password):
        return jsonify({
            "success": True, "message":"logged in", "user_id": user.id, "username" :user.username})
    else:
        return jsonify({"success": False, "message": "Wrong Password or Email"}), 401



if __name__ == "__main__":
    with app.app_context():
        db.create_all()


    app.run(debug=True, port=8081)
