import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Config from '../config/Config';
function AddUser() {
        const currentUser = JSON.parse(localStorage.getItem('user'));

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phoneNumber: '',
        profession: '',
    });
    const [profilePic, setProfilePic] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const navigate = useNavigate();
  console.log("profilePic>>>",profilePic)

  const handleChange = (e) => {
      if (e.target.name === "profilePic") {
          setProfilePic(e.target.files[0]);
          const reader = new FileReader();
          reader.onloadend = () => {
              setImagePreview(reader.result);
          };
          reader.readAsDataURL(e.target.files[0]);
      } else {
          setFormData({ ...formData, [e.target.name]: e.target.value });
      }
  };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fullFormData = new FormData();
        Object.keys(formData).forEach(key => fullFormData.append(key, formData[key]));
        if (profilePic) {
            fullFormData.append("profilePic", profilePic);
        }
        if(currentUser?._id){
            fullFormData.append("userAddedFrom", currentUser?._id);
        }
       console.log("dddfullFormData",fullFormData)
       
        try {
            const response = await axios.post(`${Config.API_URL}/adduser`, fullFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const userData = response.data;
            if (userData) {
                alert('User added successfully!');
                navigate('/userlist');
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error('There was an error adding the user:', error);
            alert('Failed to add user.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-[50%]">
                <h3 className="text-2xl font-bold text-center">Add New User</h3>
                <form onSubmit={handleSubmit}>
                <div className='flex flex-wrap -mx-3 mb-2'>
    <div className='w-full px-3'>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="profilePic">
            Profile Picture
        </label>
        {imagePreview && (
            <img src={imagePreview} alt="Profile Preview" className="w-[200px] h-[200px] rounded-full mx-auto object-cover" />
        )}
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="profilePic" type="file" name="profilePic" onChange={handleChange} />
        
    </div>
</div>
                    <div className='flex flex-wrap -mx-3 mb-2'>
                        <div className='w-full md:w-1/2 px-3 mb-2 md:mb-0'>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="firstName">
                                First Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="firstName" type="text" placeholder="Jane" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className='w-full md:w-1/2 px-3'>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="lastName" type="text" placeholder="Doe" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-2'>
                        <div className='w-full px-3'>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="email@example.com" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-2'>
                        <div className='w-full px-3'>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phoneNumber">
                                Phone Number
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="phoneNumber" type="tel" placeholder="123-456-7890" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-2'>
                        <div className='w-full px-3'>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phoneNumber">
                            profession
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="profession" type="text" placeholder="profession" name="profession" value={formData.profession} onChange={handleChange} required />
                        </div>
                    </div>
                    
                    <div className='flex gap-2 justify-end'>
                        <button type="submit" className="shadow  px-6 py-2 text-center cursor-pointer   mt-4 text-white bg-blue-500 hover:bg-blue-700  rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 ">
                            Add User
                        </button>
                        <div onClick={() => { navigate('/userlist') }} className={`px-6 py-2 text-center cursor-pointer   mt-4 text-white bg-red-600 hover:bg-red-900  rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 `}>
                            Cancel
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddUser;
