"use client"
import { useRouter } from "next/navigation";
import React,  {useEffect, useState} from "react";

export default function Cast() {
    const router = useRouter();
    const [movieData, setMoviedata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        fetch("http://localhost:8081/api/reviewpage/movies")
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              setMoviedata(data.movie_data);
              // console.log(data.movie_data);
            } else {
              setError("Failed to load movies.");
              console.log("some error has occured");
            }
            setLoading(false);
          })
          .catch((err) => {
            setError("An error occurred while fetching data.");
            setLoading(false);
          });
      }, []);



    return (

        <div>
          <header onClick={()=> router.push("/homepage")} className="text-white p-2 text-left " style={{
                  fontSize: '34px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  borderRadius: '10px',
                  backgroundColor: 'black',
                  display: 'inline-block',
          }} className="fixed">←</header>
      <main className="bg-black text-white min-h-screen p-6">
        <div className="flex items-center space-x-4">
          <img className="w-40" src="../../favicon.ico" alt="" />
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          <div className="flex-shrink-0">
            <img src={`https://image.tmdb.org/t/p/w300${movieData?.poster_path}`} alt="" width={320} height={480}/>
            <p className="text-sm mt-2">⭐ {movieData.vote_average}</p>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{movieData.title}</h1>
            <div className="text-sm text-gray-400 mt-1 space-x-4">
              <button className="transition-all ease-in hover:underline text-white font-bold" onClick={()=> router.push('/reviewpage/cast')}>CAST</button>
              <button className="hover:underline hover:text-white font-bold" onClick={()=> router.push('/reviewpage/crew')}>CREW</button>
              <button className="hover:underline hover:text-white font-bold" onClick={()=> router.push('/reviewpage/genres')}>GENRES</button>
              <button className="hover:underline hover:text-white font-bold" onClick={()=> router.push('/reviewpage/releases')}>RELEASES</button>
            </div>
  
            <div className="mt-4">
              <h2 className="font-semibold">Genres</h2>
              <p className="text-blue-400 cursor-pointer font-bold capitalize">{movieData?.genres ? movieData.genres.map((genre) => genre.name).join(", ") : ""}</p>
            </div>
  
            <div className="mt-4">
              <h2 className="font-semibold">Overview</h2>
              <p className="text-sm text-gray-300">{movieData.overview}</p>
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

