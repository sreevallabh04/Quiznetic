import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleSuccess, handleError } from '../utils';

interface LoginInfo {
  email: string;
  password: string;
}

export function LoginPage() {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo: LoginInfo = { ...loginInfo };
    copyLoginInfo[name as keyof LoginInfo] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("All fields are required");
    }
    
    try {
      // Simple client-side authentication
      // In a real app, you would validate against a backend
      if (email && password) {
        // For demo purposes, accept any valid email/password combination
        const mockUser = {
          name: email.split('@')[0], // Use email prefix as name
          email: email,
          token: 'mock-jwt-token-' + Date.now()
        };
        
        handleSuccess("Login successful!");
        localStorage.setItem('token', mockUser.token);
        localStorage.setItem('loggedInUser', mockUser.name);
        localStorage.setItem('userEmail', mockUser.email);
        
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        handleError("Invalid credentials");
      }
    } catch (err: any) {
      handleError(err.message || "Login failed");
    }
  }

  return (
    <div className="signup-container bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
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

        <div className="mt-4 flex items-center justify-between">
          <div className="border-t border-gray-400 flex-grow"></div>
          <span className="mx-4 text-gray-400">or</span>
          <div className="border-t border-gray-400 flex-grow"></div>
        </div>

        <div className="mt-4 flex justify-center space-x-4">
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium transition-colors">
            Sign in with Google
          </button>
          <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium transition-colors">
            Sign in with Mobile
          </button>
        </div>

        <span className="signup-text block mt-4 text-center">
          Don't have an account?
          <Link to="/signup" className="signup-link">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}