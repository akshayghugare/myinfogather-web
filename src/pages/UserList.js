import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Config from '../config/Config';
import Header from '../components/Header';
import defaultUserIcon from '../assets/defaultuser.png'
function UserList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${Config?.API_URL}/getAllUsers`);
            const usersExcludingCurrent = response.data.filter(user => user?.userAddedFrom == currentUser?._id );
            setUsers(usersExcludingCurrent); // Adjust based on your API response structure
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    useEffect(() => {
        const filterUsers = () => {
            const filtered = users.filter(user =>
                user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filtered);
        };

        filterUsers();
    }, [users, searchTerm]);

    useEffect(() => {  
        fetchUsers();
    }, []);

    return (
        <div>
            <Header/>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="border border-gray-300 p-2 rounded-lg shadow-sm transition duration-300 ease-in-out transform hover:-translate-y-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                        onClick={() => navigate('/adduser')}
                    >
                        Add User
                    </button>
                </div>
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="w-full whitespace-no-wrap">
                        <thead>
                            <tr className="text-left font-bold bg-gray-100">
                                <th className="px-6 py-3">ProfilePic</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Phone No</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredUsers.length > 0 ? filteredUsers.map((user, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition duration-300 ease-in-out">
                                    <td className="px-6 py-4">
                                        <img className=' w-[50px] h-[50px] rounded-full  object-cover' src={`${user?.profilePic?`${Config?.API_URL}/${user.profilePic}`:`${defaultUserIcon}`} `}/>
                                    </td>
                                    <td className="px-6 py-4">{user?.firstName}</td>
                                    <td className="px-6 py-4">{user?.email}</td>
                                    <td className="px-6 py-4">{user?.phoneNumber}</td>
                                    <td className="px-6 py-4">
                                       <div className='flex gap-2'>
                                       <Link to={`/edituser/${user?._id}`} className="text-blue-600 hover:underline">Edit</Link>
                                        <Link to={`/viewuser/${user?._id}`} className="text-blue-600 hover:underline">View</Link>
                                       </div>
                                    </td>
                                    
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-4">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserList;
