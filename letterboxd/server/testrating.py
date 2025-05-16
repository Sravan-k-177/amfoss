import requests

url = "https://api.themoviedb.org/3/movie/550?language=en-US"

headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkN2RkOWM1OTg5MTY2NWQ5NGEwOGRlZWMzYjc0NmEzYiIsIm5iZiI6MTc0NTgzNzY4Mi45NTYsInN1YiI6IjY4MGY1ZTcyOTMwYzg5NWUyODBmODg5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fPYxpuh3mJZ6nWvWVZ8ZFNIYkQ7MItgxtW-IkTWk6RI"
}

response = requests.get(url, headers=headers)

print(response.text)