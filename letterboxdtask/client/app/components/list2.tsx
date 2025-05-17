"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
interface List1Props {
  selectedCategory: string;
}

export default function List2({selectedCategory}:List1Props) {
  const [newMovies, setNewMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  useEffect(() => {
      let fetchUrl = "";
      switch (selectedCategory) {
        case 'Movies':
          fetchUrl = 'http://localhost:8081/api/homepage/movies';
          break;
        case 'TV Shows':
          fetchUrl = 'http://localhost:8081/api/homepage/tvshows';
          break;
        case 'Anime':
          fetchUrl = 'http://localhost:8081/api/homepage/anime';
          break;
        default:
          fetchUrl = 'http://localhost:8081/api/homepage/movies';
      }

    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setNewMovies(data.trending_movies);
        } else {
          setError("Failed to load movies.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("An error occurred while fetching data.");
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <div style={{ marginLeft: "5rem" }} className="list">
      <div className="row">
        <h2 style={{ color: "#F5C518", fontSize: "32px", fontWeight: "bold" }} className="text-white title">
          Trending Now
        </h2>

        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="col">
          <div className="row_posters" style={{ display: "flex", overflowX: "scroll", gap: "20px" }}>
            {newMovies.map((movie) => {
              const vote_average = Math.round((movie.vote_average)*10)/10;
              return(
              <div className="row_poster rowposterLarge hover:scale-120 hover:border border-amber-300 hover:bg-amber-100 hover:text-black hover:transition-transform" key={movie.id} >
                <img
                  onClick={() => router.push(`/reviewpage/${movie.id}`)}
                  // making changes here
                  // making changes here
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
                <p className="poster_text ">⭐{vote_average} - {movie.title}</p>
              </div>);
             })}
          </div>
        </div>
      </div>
    </div>
  );
}
