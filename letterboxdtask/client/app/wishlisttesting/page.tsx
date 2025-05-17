"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function WishlistTemplate() {
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchWishlist() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8081/wishlist/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch wishlist");
        const data = await response.json();
        setWishlistItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWishlist();
  }, [userId]);

  if (!userId) {
    return (
      <div className="bg-black text-white min-h-screen p-6">
        <p>Please log in to see your wishlist.</p>
        <button onClick={() => router.push("/login")} className="mt-4 p-2 bg-white text-black rounded">
          Go to Login
        </button>
      </div>
    );
  }

  if (loading) return <p>Loading wishlist...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <header
        onClick={() => router.push("/homepage")}
        className="text-white p-2 text-left"
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
      <main className="bg-black text-white min-h-screen p-6">
        {wishlistItems.length === 0 ? (
          <p>No items in your wishlist yet.</p>
        ) : (
          wishlistItems.map((item) => (
            <div
              key={item.id}
              className="mt-10 flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 rounded-2xl bg-[#555555]"
            >
              <div className="flex-shrink-0 pt-2">
                <img
                  className="rounded-2xl p-2"
                  src={item.image_url || "https://via.placeholder.com/160x240"}
                  alt={item.name}
                  width={160}
                  height={240}
                />
                <p className="text-sm p-2">⭐ {item.rating}</p>
              </div>

              <div>
                <h1 className="text-2xl font-semibold capitalize pt-3">{item.name}</h1>

                <div className="mt-4">
                  <h2 className="font-semibold">Genres</h2>
                  <p className="underline cursor-pointer">{item.genres}</p>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-300">{item.overview}</p>
                </div>

                <div className="mt-10 font-bold ">
                  <button
                    onClick={async () => {
                      try {
                        await fetch(`http://localhost:8081/wishlist/remove/${item.id}`, {
                          method: "DELETE",
                        });
                        setWishlistItems(wishlistItems.filter((i) => i.id !== item.id));
                      } catch {
                        alert("Failed to remove item");
                      }
                    }}
                    style={{ display: "inline-flex", background: "black" }}
                    className="font-bold rounded-2xl p-2"
                  >
                    REMOVE
                    <img
                      style={{ width: "20px" }}
                      src="https://imgs.search.brave.com/cOIpqrwLlnbNhSGgo23sdYsGEFHP-029uzVdUoPcLOY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zY291/dGh0bWwuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI0LzEx/L2R5bmFtaWMtc3Zn/LXRyYXNoY2FuLWFu/aW1hdGlvbi02NzNl/MjEud2VicA"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
