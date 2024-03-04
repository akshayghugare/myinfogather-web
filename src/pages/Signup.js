import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Config from '../config/Config';
function Signup() {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email && !phoneNumber) {
      alert('Please enter either an email or a phone number.');
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${Config?.API_URL}/signup`, { email, phoneNumber, password });
      navigate('/'); // Redirect to login page on successful signup
    } catch (error) {
      alert(error.response.data.message || 'Error creating user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-[50%]">
        <h3 className="text-2xl font-bold text-center">Create an account</h3>
        <form onSubmit={handleSubmit} className='w-full'>
          <div>
            <label className="block" htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className={`px-6 py-2  w-full mt-4 text-white bg-blue-600 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 ${isLoading ? 'bg-blue-300' : 'hover:bg-blue-900'}`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
            <div onClick={()=>{navigate('/userlist')}} className={`px-6 py-2 text-center cursor-pointer  w-full mt-4 text-white bg-red-600 hover:bg-red-900  rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 `}>
              Cancel
            </div>    
                  </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
