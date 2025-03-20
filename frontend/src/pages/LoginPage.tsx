import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleSuccess, handleError } from '../utils';

export function LoginPage() {
  const [loginInfo,setLoginInfo] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const handleChange = (e) => {
    const {name,value} = e.target;
    console.log(name,value);
    const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
  }

  const handleLogin = async (e)=> {
    e.preventDefault();
    const {email, password } = loginInfo;
        if (!email || !password) {
            return handleError("All fields are required")
        }
        try{
          const url = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;
          console.log("Request URL:", url);
          const response = await fetch(url, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo),
            credentials: 'include'
          });
          const result = await response.json();
          const {success,message,jwtToken,name,error} = result;
          if(success) {
            handleSuccess(message);
            localStorage.setItem('token',jwtToken);
            localStorage.setItem('loggedInUser',name);
            setTimeout(()=> {
                navigate('/home')
            },1000)
          } else if(error){
            const details = error?.details[0].message;
            handleError(details);
          } else if(!success){
            handleError(message);
          }
          console.log(result);
        } catch (err) {
          handleError(err);
        }
        

  
  }

  return (
    <div className="signup-container">
      <h1 className="signup-header">Login</h1>
      <form onSubmit = {handleLogin} className="signup-form">
        
        <div className="signup-form-group">
          <label htmlFor="email" className="signup-label">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            className="signup-input"
            value = {loginInfo.email}
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="password" className="signup-label">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password..."
            className="signup-input"
            value = {loginInfo.password}
          />
        </div>
        <button type="submit" className="signup-button">Login</button>
        <span className="signup-text">
          Don't have an account?
          <Link to="/signup" className="signup-link">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}
