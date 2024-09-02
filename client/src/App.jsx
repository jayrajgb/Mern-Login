import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  const [user, setUser] = useState("");

  useEffect(()=>{
    document.title = "Dashboard";
    const authenticated = localStorage.getItem("Token");
    if(!authenticated){
      navigate("/login");
    }
    else{
      setUser(localStorage.getItem("Email"))
    }
  },[user])
  
  const handleLogout = ()=>{
    localStorage.removeItem("Token");
    localStorage.removeItem("Email");
    setUser(localStorage.getItem("Email"));
    alert("Logged out!")
  }

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5rem'}}>
        <div className='main'>
          HOME
        </div>
        {(<p style={{paddingTop: "1rem"}}>
          Welcome, {user}
        </p>)}
        <button onClick={handleLogout} style={{width: '8rem'}}>Logout</button>
      </div>
    </>
  )
}

export default App
