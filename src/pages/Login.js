import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Config from '../config/Config';

function Login() {
  const [login, setLogin] = useState(''); // Can be either email or phone
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${Config?.API_URL}/login`, { login, password });
      // Assuming the response includes user data under 'user' key
      const userData = response.data.user;

      // Store user data in local storage; consider what specific user details you need to store
      localStorage.setItem('user', JSON.stringify(userData));

      navigate('/userlist'); // Navigate to userlist on successful login
    } catch (error) {
      alert(error.response?.data?.message || 'Error logging in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block" htmlFor="login">Email or Phone</label>
            <input
              type="text"
              placeholder="Email or Phone Number"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-baseline justify-between">
            <button type="submit" className={`px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg  transition duration-300 ease-in-out transform hover:-translate-y-1 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-900'}`} disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <button type="button" className="text-sm text-blue-600 hover:underline  duration-300 ease-in-out transform hover:-translate-y-1" onClick={() => navigate('/signup')}>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
