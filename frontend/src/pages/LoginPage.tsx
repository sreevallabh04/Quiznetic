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
      const url = "http://localhost:3001/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err: any) {
      handleError(err);
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