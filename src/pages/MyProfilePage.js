import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Config from '../config/Config';
function MyProfilePage() {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: '',
    profession: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement the logic to update the user data in your backend
    console.log("save changes",formData);
    try {
        const response = await axios.post(`${Config.API_URL}/editUser/${currentUser._id}`,formData);
            const user = response.data.user;
            if(user){
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/userlist');
            }else{
                alert("Something went wrong")
            }
          
    } catch (error) {
        console.log(error)
    }
    // After updating, redirect to the user list
    
  };

  useEffect(()=>{
        
    setFormData({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      address: currentUser.address,
      phoneNumber: currentUser.phoneNumber,
      profession: currentUser.profession,
    });
},[])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-full md:w-[50%]">
        <h3 className="text-2xl font-bold text-center">Edit My Profile</h3>
        <form onSubmit={handleSubmit} className=' overflow-auto p-2'>
        <div className="">
            <div className='flex justify-between gap-2  item-center mb-2'>
            <div className='w-full'>
              <label className="block">First Name</label>
              <input type="text" name="firstName" placeholder="First Name"
                onChange={handleChange}
                value={formData.firstName}
                className="w-full px-4 py-2  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>
            <div className='w-full'>
              <label className="block">Last Name</label>
              <input type="text" name="lastName" placeholder="Last Name"
                onChange={handleChange}
                value={formData.lastName}
                className="w-full px-4 py-2  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>
            </div>
            <div className='flex justify-between gap-2 item-center mb-2'>
            <div className='w-full'>
              <label className="block">Email</label>
              <input type="email" name="email" placeholder="Email"
                onChange={handleChange}
                value={formData.email}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>
            <div className='w-full'>
              <label className="block">Address</label>
              <input type="text" name="address" placeholder="Address"
                onChange={handleChange}
                value={formData.address}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            </div>
            <div className='flex justify-between gap-2  item-center mb-2'>
            <div className='w-full'>
              <label className="block">Phone Number</label>
              <input type="tel" name="phoneNumber" placeholder="Phone Number"
                onChange={handleChange}
                value={formData.phoneNumber}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>
            <div className='w-full'>
              <label className="block">Profession</label>
              <input type="text" name="profession" placeholder="Profession"
                onChange={handleChange}
                value={formData.profession}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button type="submit" className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-900 transition duration-300 ease-in-out transform hover:-translate-y-1">Save changes</button>
              <div onClick={()=>{navigate('/userlist')}} className="px-6 py-2 text-white bg-red-600 rounded hover:bg-red-900 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1">Cancel</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyProfilePage;
