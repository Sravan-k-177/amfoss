"use client";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Review() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [movieData, setMovieData] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d7dd9c59891665d94a08deec3b746a3b`)
      .then((response) => response.json())
      .then((data) => {
        if (data && !data.status_code) {
          setMovieData(data);
        } else {
          setError("Failed to load movie.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("An error occurred while fetching data.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;
  const date = (movieData?.release_date);
  const year = date ? new Date(date).getFullYear() : null;
  

  return (
    <div>
      <header
        onClick={() => router.push("/homepage")}
        className="text-white p-2 text-left fixed"
        style={{
          fontSize: "34px",
          fontWeight: "bold",
          cursor: "pointer",
          borderRadius: "10px",
          backgroundColor: "black",
          display: "inline-block",
        }}
      >
        ←
      </header>
      <main className="bg-black text-white min-h-screen p-6 pt-16">
        <div className="flex items-center space-x-4">
        <img className="w-40" src="../../favicon.ico" alt="" />
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          <div className="flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w300${movieData?.poster_path}`}
              alt={movieData?.title}
              width={320}
              height={480}
            />
            <p className="text-sm mt-2">⭐ {movieData?.vote_average}</p>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{movieData?.title} ({year})</h1>
            <div className="text-sm text-gray-400 mt-1 space-x-4">
              <button onClick={() => router.push("/reviewpage/cast")} className="hover:underline font-bold">CAST</button>
              <button onClick={() => router.push("/reviewpage/crew")} className="hover:underline font-bold">CREW</button>
              <button onClick={() => router.push("/reviewpage/genres")} className="hover:underline font-bold">GENRES</button>
              <button onClick={() => router.push("/reviewpage/releases")} className="hover:underline font-bold">RELEASES</button>
            </div>

            <div className="mt-4">
              <h2 className="font-semibold">Genres</h2>
              <p className="text-blue-400 cursor-pointer font-bold capitalize">
                {movieData?.genres?.map((genre) => genre.name).join(", ")}
              </p>
            </div>

            <div className="mt-4">
              <h2 className="font-semibold">Overview</h2>
              <p className="text-sm text-gray-300">{movieData?.overview}</p>
            </div>

            <div className="mt-6">
              <h2 className="font-semibold">Reviews</h2>
              <div className="border border-gray-700 rounded-lg p-4">
                Reviewed by Louis Peitzman:<br />
                Certain Women and Star Wars referenced. Who starred in Certain
                Women in the Wedding Banquet universe? Who played Rose Tico!
                (Lovely movie.)
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
