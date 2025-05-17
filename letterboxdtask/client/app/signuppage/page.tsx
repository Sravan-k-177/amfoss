'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({email: "",username: "",password: "",});

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setMessage(result.message);

      if (response.status === 201) {
        router.push("/loginpage");
        localStorage.setItem("user_id", result.user_id);
      }
    } catch (error) {
      setMessage("Error submitting form");
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5C518', padding: '10px' }}>
      <header onClick={() => router.push("/homepage")} className="text-white p-2 text-left"
        style={{
          fontSize: '34px',
          fontWeight: 'bold',
          cursor: 'pointer',
          borderRadius: '10px',
          backgroundColor: 'black',
          display: 'inline-block',
        }}>←</header>
      <div style={{ paddingLeft: "30%", width: "70%" }}>
        <h1 style={{ textAlign: 'center', fontSize: '42px', color: 'black' }}>RANt n’ Review</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#000' }}>Email</label>
            <input type="email" name="email" placeholder="example.mail@email.com"
              style={{ color: "black", backgroundColor: "white", width: '100%', padding: '10px', borderRadius: '5px' }}
              onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#000' }}>Username</label>
            <input type="text" name="username" placeholder="example1234user@31"
              style={{ color: "black", backgroundColor: "white", width: '100%', padding: '10px', borderRadius: '5px' }}
              onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#000' }}>Password</label>
            <input type="password" name="password" placeholder="Enter Password"
              style={{ color: "black", backgroundColor: "white", width: '100%', padding: '10px', borderRadius: '5px' }}
              onChange={handleChange} required />
          </div>
          <button type="submit"
            style={{
              width: '100%',
              backgroundColor: 'blue',
              color: 'white',
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              marginBottom: '10px'
            }}>Sign Up</button>
        </form>
        {message && <p style={{ textAlign: "center", color: "red" }}>{message}</p>}
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <hr style={{ border: 'none', height: '2px', backgroundColor: 'black', width: '100%', margin: '20px auto' }} />
          <p className="text-gray-600">Already have an account?</p>
          <button onClick={(e) => { e.preventDefault(); router.push("./loginpage"); }} className="bg-blue-500 text-white p-2 rounded-md" style={{ width: "100%" }}>Login</button>
        </div>
      </div>
    </div>
  );
}
