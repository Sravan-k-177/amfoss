"use client"
import { useRouter } from "next/navigation";

export default function Crew() {
    const router = useRouter();
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
  
        <div className="mt-10 flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          <div className="flex-shrink-0">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHcLUBFuS_x1A2OVuFV5RUYozm5XeRvWzuvw&s" alt="" width={160} height={240}/>
            <p className="text-sm mt-2">⭐ 6.8/10</p>
          </div>
  
          <div>
            <h1 className="text-2xl font-semibold">Marco</h1>
            <div className="text-sm text-gray-400 mt-1 space-x-4">
              <button className="transition-all ease-in hover:underline hover:text-white font-bold" onClick={()=> router.push('/reviewpage/cast')}>CAST</button>
              <button className="underline text-white font-bold" onClick={()=> router.push('/reviewpage/crew')}>CREW</button>
              <button className="hover:underline hover:text-white font-bold" onClick={()=> router.push('/reviewpage/genres')}>GENRES</button>
              <button className="hover:underline hover:text-white font-bold" onClick={()=> router.push('/reviewpage/releases')}>RELEASES</button>
            </div>
  
            <div className="mt-4">
              <h2 className="font-semibold">Genres</h2>
              <p className="text-blue-400 underline cursor-pointer">Thriller Action</p>
            </div>
  
            <div className="mt-4">
              <h2 className="font-semibold">Themes</h2>
              <p className="text-sm text-gray-300">High speed and special ops, Epic heroes Explosive and action-packed heroes v villains, Adrenaline-fueled action and fast cars Gripping, intense violent crime Show All...</p>
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