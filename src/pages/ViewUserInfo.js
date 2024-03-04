import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Config from '../config/Config';
import defaultUserIcon from '../assets/defaultuser.png'

function ViewUserInfo() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: '',
    profession: '',
    profilePic:''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const getUserById = async () => {
    try {
      const response = await axios.post(`${Config.API_URL}/getUser/${id}`); // Ensure this matches your API endpoint method
      if (response.data && response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserById();
  }, [id]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-full md:w-1/2 rounded-lg border border-gray-200 transform transition duration-500 hover:scale-105">
        <h3 className="text-2xl font-bold text-center">User Profile</h3>
        <div className="mt-6">
        <div className='w-full flex justify-center'>
              <img className=' w-[150px] h-[150px] rounded-full  object-cover' src={`${user?.profilePic?`${Config?.API_URL}/${user.profilePic}`:`${defaultUserIcon}`} `}/>
            </div>
          <div className="text-lg">
            <p className="font-semibold">First Name: <span className="font-normal">{user.firstName}</span></p>
          </div>
          <div className="mt-2 text-lg">
            <p className="font-semibold">Last Name: <span className="font-normal">{user.lastName}</span></p>
          </div>
          <div className="mt-2 text-lg">
            <p className="font-semibold">Email: <span className="font-normal">{user.email}</span></p>
          </div>
          <div className="mt-2 text-lg">
            <p className="font-semibold">Address: <span className="font-normal">{user.address || 'N/A'}</span></p>
          </div>
          <div className="mt-2 text-lg">
            <p className="font-semibold">Phone Number: <span className="font-normal">{user.phoneNumber}</span></p>
          </div>
          <div className="mt-2 text-lg">
            <p className="font-semibold">Profession: <span className="font-normal">{user.profession || 'N/A'}</span></p>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button onClick={() => navigate('/userlist')} className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1">
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUserInfo;
