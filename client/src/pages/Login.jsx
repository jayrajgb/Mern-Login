import { useEffect, useState } from 'react'
import '../App.css'
import { NavLink, useNavigate } from 'react-router-dom'

function Login() {
    
  const navigate = useNavigate();

  useEffect(()=>{
    document.title = "Login";
    const authenticated = localStorage.getItem("Token");
    if(authenticated){
        navigate("/home");
    }
  },[])
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async(e) => {
    e.preventDefault();
    const userInfo = {
        "email": email,
        "password": password
    }
    console.log("User: ", userInfo);

    try {
        const response = await fetch("http://localhost:8800/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        const result = await response.json();
        console.log("Data Received: ", result);
        if(result.success){
            navigate("/home");
            localStorage.setItem("Token", result.jwtToken);
            localStorage.setItem("Email", result.email);
        }
        else if(result.error){
            const details = result.error?.details[0].message;
            alert(details);
        }
        else{
            alert(result.msg);
        }
    } catch (e) {
        alert(`Server responded with: ${e}`);
    }
  }
  
  return (
    <>
      <div className='main'>
        <div className='login-box'>
          <p>
            Login
          </p>
          <form method='POST' className='login-form'>
            <label htmlFor="email">
              Email
            </label>
            <input type="text" name='email' placeholder='Enter email...' 
            onChange={(e)=>{
                setEmail(e.target.value);
            }} />
            <label htmlFor="password">
              Password
            </label>
            <input type="password" name='password' placeholder='Enter password...' 
            onChange={(e)=>{
                setPassword(e.target.value);
            }}
            />
            <button onClick={handleSubmit}>Submit</button>
            <p>Don't have an account?<span><NavLink to={"/signup"}> Signup</NavLink></span></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
