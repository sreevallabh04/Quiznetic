import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleSuccess, handleError } from '../utils';

export function SignupPage() {
  const [signupInfo,setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  
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
          // Simple client-side registration
          // In a real app, you would send this to a backend
          if (name && email && password) {
            // For demo purposes, store user info in localStorage
            const mockUser = {
              name: name,
              email: email,
              token: 'mock-jwt-token-' + Date.now()
            };
            
            // Store user data in localStorage (in a real app, this would be in a database)
            localStorage.setItem('registeredUser', JSON.stringify(mockUser));
            
            handleSuccess("Registration successful! Please login.");
            setTimeout(()=> {
                navigate('/login')
            },1000)
          } else {
            handleError("Please fill all fields correctly");
          }
        } catch (err) {
          handleError(err.message || "Registration failed");
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
