import { useEffect, useState } from 'react';
import '../App.css'
import { NavLink, useNavigate } from 'react-router-dom'

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    document.title = "Sign Up";
    const authenticated = localStorage.getItem("Token");
    if(authenticated){
        navigate("/home");
    }
  },[])

  const handleInput = (e, field) => {
    if(field === "name"){
        setName(e.target.value);
    }
    else if(field === "email"){
        setEmail(e.target.value);
    }
    else if(field === "password"){
        setPassword(e.target.value);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const userInfo = {
        "fullName": name,
        "email": email,
        "password": password
    }
    // console.log("User: ", userInfo);

    try {
        const response = await fetch("http://localhost:8800/auth/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        const result = await response.json();
        console.log("Data Received: ", result);
        if(result.success){
            alert(result.msg);
            navigate("/login");
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
            Signup
          </p>
          <form action="" className='login-form'>
            <label htmlFor="name">
              Name
            </label>
            <input type="text" name='name' placeholder='Enter full name...' 
            onChange={(e)=>{handleInput(e, "name")}}
            />
            <label htmlFor="email">
              Email
            </label>
            <input type="text" name='email' placeholder='Enter email...' 
            onChange={(e)=>{handleInput(e, "email")}}
            />
            <label htmlFor="password">
              Password
            </label>
            <input type="password" name='password' placeholder='Enter password...' 
            onChange={(e)=>{handleInput(e, "password")}}
            />
            <button onClick={handleSubmit}>Submit</button>
            <p>Already have an account?<span><NavLink to={"/login"}> Login</NavLink></span></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
