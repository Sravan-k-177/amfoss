"use client"
import { useRouter } from "next/navigation";

export default function wishlisttemplate() {
    const router = useRouter();
    const name = "nameplaceholder";
    const rating = "ratingplaceholder";
    const genres = "genresplaceholder";
    const overview = "overview";
    return (
        <div>
        <header onClick={()=> router.push("/homepage")} className="text-white p-2 text-left " style={{
            fontSize: '34px',
            fontWeight: 'bold',
            cursor: 'pointer',
            borderRadius: '10px',
            backgroundColor: 'black',
            display: 'inline-block',
    }}>←</header>
      <main className="bg-black text-white min-h-screen p-6">
        <div className="flex items-center space-x-4">
          <img className="w-40" src="./favicon.ico" alt="" />
        </div>
  
        <div className="mt-10 flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0  rounded-2xl bg-[#555555] ">
          <div className="flex-shrink-0 pt-2">
            <img className="rounded-2xl p-2" src="https://i.pinimg.com/736x/6f/6e/f1/6f6ef1905594e67b8ad19b6f800d2e24.jpg" alt="" width={160} height={240}/>
            <p className="text-sm p-2">⭐ {rating}</p>
          </div>
  
          <div>
            <h1 className="text-2xl font-semibold capitalize pt-3">{name}</h1>

            <div className="mt-4">
              <h2 className="font-semibold">Genres</h2>
              <p className=" underline cursor-pointer">{genres}</p>
            </div>
  
            <div className="mt-4">
              <p className="text-sm text-gray-300">{overview}</p>
            </div>

            <div className="mt-10 font-bold ">
            <button onClick={()=> router.push("./removebuttontesting")} style={{display:'inline-flex', background:"black"}} className="font-bold rounded-2xl p-2">REMOVE<img style={{ width: "20px" }} src="https://imgs.search.brave.com/cOIpqrwLlnbNhSGgo23sdYsGEFHP-029uzVdUoPcLOY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zY291/dGh0bWwuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI0LzEx/L2R5bmFtaWMtc3Zn/LXRyYXNoY2FuLWFu/aW1hdGlvbi02NzNl/MjEud2VicA" alt=""/></button>
            </div>

          </div>
        </div>
      </main>
      </div>
    );
  }
