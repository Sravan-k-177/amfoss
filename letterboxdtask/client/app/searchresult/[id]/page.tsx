"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Searchpage() {
  const router = useRouter();
  const params = useParams();
  const query = params.id as string;
  const [movieData, setMovieData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wishlistMessage, setwishlistMessage] = useState<string | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [review, setReview] = useState("");

  const addReview = () => {
    if (!review) return;
  
    fetch("http://localhost:8081/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie_id: movieData.id,
        review: review,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setReviews([...reviews, { review }]);
        setReview("");
      });
  };
  

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=d7dd9c59891665d94a08deec3b746a3b&query=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data?.results?.length > 0) {
          setMovieData(data.results[0]);
          setError(null);

          fetch(`http://localhost:8081/review/${data.id}`)
            .then((response) => response.json())
            .then((response) => setReviews(response))
        } else {
          setError("No movie found.");
          setMovieData(null);
          setReviews([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("An error occurred while fetching data.");
        setLoading(false);
      });
  }, [query]);

  const handleAddToWishlist = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setwishlistMessage("Log in to add to wishlist.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/wishlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: parseInt(userId, 10),
          name: movieData.title,
          rating: movieData.vote_average.toString(),
          genres: movieData.genre_ids?.join(", ") || "",
          overview: movieData.overview,
          image_url: `https://image.tmdb.org/t/p/w300${movieData.poster_path}`,
        }),
      });

      if (response.ok) {
        setwishlistMessage("Added to wishlist!");
      } else {
        setwishlistMessage("Error adding to wishlist.");
      }
    } catch (err) {
      setwishlistMessage("Error adding to wishlist.");
    }
  };

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;

  const date = movieData?.release_date;
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
      <main className="text-white min-h-screen p-6 pt-16">
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
            <h1 className="text-2xl font-semibold">
              {movieData?.title} ({year})
            </h1>
            <div className="text-sm text-gray-400 mt-1 space-x-4">
              <button
                onClick={() => router.push("/reviewpage/cast")}
                className="hover:underline font-bold"
              >
                CAST
              </button>
              <button
                onClick={() => router.push("/reviewpage/crew")}
                className="hover:underline font-bold"
              >
                CREW
              </button>
              <button
                onClick={() => router.push("/reviewpage/genres")}
                className="hover:underline font-bold"
              >
                GENRES
              </button>
              <button
                onClick={() => router.push("/reviewpage/releases")}
                className="hover:underline font-bold"
              >
                RELEASES
              </button>
            </div>

            <div className="mt-4">
              <h2 className="font-semibold">Overview</h2>
              <p className="text-sm text-gray-300">{movieData?.overview}</p>
            </div>
            <button
              onClick={handleAddToWishlist}
              className="mt-6 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Add to Wishlist
            </button>
            {wishlistMessage && (
              <p className="mt-2 text-green-400 font-semibold">{wishlistMessage}</p>
            )}

            <div className="border border-gray-700 rounded-lg p-4 mt-6">
              {reviews.length === 0 ? (<p>No reviews available.</p>) : (reviews.map((review, i) => {
                  return <p key={i}>• {review.review}</p>;}))}
            </div>

            <input placeholder="Write a Review" value={review} onChange={(e) => setReview(e.target.value)}/>
            <button className="border rounded-3xl bg-white text-black"  onClick={addReview}>Add Review</button>

          </div>
        </div>
      </main>
    </div>
  );
}
