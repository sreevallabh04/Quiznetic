import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { useState } from "react";
import { handleSuccess, handleError } from '../utils';

export function SignupPage() {
  const [signupInfo,setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  
  const handleChange = (e) => {
    const {name,value} = e.target;
    console.log(name,value);
    const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
  }

  console.log('signin info ->', signupInfo )
  const handleSignup = async (e)=> {
    e.preventDefault();
    const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError("All fields are required")
        }
        try{
          const url = "http://localhost:8080/auth/signup"
          const response = await fetch(url, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupInfo)
          });
          const result = await response.json();
          console.log(result);
        } catch (err) {
          handleError(err);
        }
        

  
  }

  return (
    <div className="signup-container">
      <h1 className="signup-header">Signup</h1>
      <form onSubmit = {handleSignup} className="signup-form">
        <div className="signup-form-group">
          <label htmlFor="name" className="signup-label">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name..."
            className="signup-input"
            value = {signupInfo.name}
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="email" className="signup-label">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            className="signup-input"
            value = {signupInfo.email}
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
            value = {signupInfo.password}
          />
        </div>
        <button type="submit" className="signup-button">Signup</button>
        <span className="signup-text">
          Already have an account?
          <Link to="/login" className="signup-link">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}
