import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleSuccess, handleError } from '../utils';

interface SignupInfo {
  name: string;
  email: string;
  password: string;
}

export function SignupPage() {
  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const copySignupInfo: SignupInfo = { ...signupInfo };
    copySignupInfo[name as keyof SignupInfo] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("All fields are required");
    }
    
    try {
      // Simple client-side signup for static app
      if (name && email && password) {
        const mockUser = {
          name: name,
          email: email,
          token: 'mock-jwt-token-' + Date.now()
        };
        
        handleSuccess("Account created successfully!");
        localStorage.setItem('token', mockUser.token);
        localStorage.setItem('loggedInUser', mockUser.name);
        localStorage.setItem('userEmail', mockUser.email);
        
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        handleError("Invalid information provided");
      }
    } catch (err: any) {
      handleError(err.message || "Signup failed");
    }
  }

  return (
    <div className="signup-container bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
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

        <div className="mt-4 flex items-center justify-between">
          <div className="border-t border-gray-400 flex-grow"></div>
          <span className="mx-4 text-gray-400">or</span>
          <div className="border-t border-gray-400 flex-grow"></div>
        </div>

        <div className="mt-4 flex justify-center space-x-4">
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium transition-colors">
            Sign up with Google
          </button>
          <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium transition-colors">
            Sign up with Mobile
          </button>
        </div>

        <span className="signup-text block mt-4 text-center">
          Already have an account?
          <Link to="/login" className="signup-link">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}
