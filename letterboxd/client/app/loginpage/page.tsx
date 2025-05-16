'use client';
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function Login() {
  const router = useRouter();
    const [formData, setFormData] = useState({email: "",password: ""});

    const [message, setMessage] = useState("");  


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setMessage(result.message);

      if (response.status === 200) {
        router.push("/homepage");
      }
    } catch (error) {
      setMessage("Error submitting form");
    }
  };



  return (
    <div style={{ minHeight:'100vh',backgroundColor: '#F5C518', padding: '20px' }}>
          <header onClick={()=> router.push("/homepage")} className="text-white p-2 text-left " style={{
                  fontSize: '34px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  borderRadius: '10px',
                  backgroundColor: 'black',
                  display: 'inline-block',
          }}>←</header>
      <div style={{ paddingLeft:"30%", width: "70%"}}>
        <h1 style={{ textAlign: 'center', fontSize: '42px', color: 'black' }}>
          RANt n’ Review
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#000' }}>
              Email
            </label>
            <input
              type="email"
              name = "email"
              value = {formData.email}
              placeholder="example.mail@email.com"
              onChange={handleChange}
              style={{ color:"black",backgroundColor:"white",  width: '100%', padding: '10px', borderRadius: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#000' }}>
              Password
            </label>
            <input
            type="password"
            name="password"
            value = {formData.password}
              placeholder="Enter Your Password"
              onChange = {handleChange}
              style={{ color:"black", backgroundColor: "white",width: '100%', padding: '10px', borderRadius: '5px' }}
            />
            <div style={{ textAlign: 'right', fontSize: '12px', marginTop: '5px' }}>
              <a href="/forgotPassword" style={{ color: 'red' }}>Forgot Password?</a>
            </div>
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
            }}>Login</button>

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <hr style={{ border: 'none', height: '2px', backgroundColor: 'black', width: '100%', margin: '20px auto' }} />
          <p className="text-gray-600">Don't have an account?</p>
          <button onClick={(e)=> {e.preventDefault(); router.push("/signuppage");}} className="bg-blue-500 text-white p-2 rounded-md" style={{width:"100%"}}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}
