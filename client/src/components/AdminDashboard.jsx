import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setAllusers } from '../../store/userSlice';
import { useRef } from 'react';
import { CreateModal } from './createModal';

export const Admindashboard = () => {
  const { users } = useSelector(store => store.usersList);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [isModal, setisModal] = useState(false);
  const dispatch = useDispatch();
  const searchRef = useRef();

  function handleSearch() {
    const value = searchRef.current.value;
    if (!value) return setDisplayUsers(users);
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(value)
    );
    setDisplayUsers(filtered);
  }

  function populate(newuser) {
    dispatch(setAllusers([...users, newuser]));
    setDisplayUsers([...users, newuser]);
  }
  function toggleModal() {
    setisModal(!isModal);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get('/admin/all-users');
        dispatch(setAllusers(res.data.allUsers));
        setDisplayUsers(res.data.allUsers);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to load users');
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = id => {
    toast.info(`Edit user with id: ${id}`);
    // Navigate to edit page or open modal here
  };

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axiosInstance.delete(`/admin/users/${id}`);
      toast.success('User deleted successfully');
      setUsers(prev => prev.filter(user => user._id !== id));
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <>
      {isModal && <CreateModal toggleModal={toggleModal} populate={populate} />}
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">
          Admin Dashboard
        </h1>
        <div className="flex justify-between items-center mb-10">
          <div className="search-bar">
            <input
              type="search"
              name=""
              className="border-2 border-black px-2 py-3 rounded-s-lg w-[350px] h-[50px]"
              placeholder="Search users...."
              ref={searchRef}
            />
            <button
              className="px-2 py-3 bg-black text-white h-[50px] w-[100px] cursor-pointer"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <button
            className="bg-black text-white px-4 py-3 rounded-lg cursor-pointer"
            onClick={toggleModal}
          >
            Add User+
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-600">
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayUsers.length > 0 ? (
                displayUsers.map(user => (
                  <tr key={user._id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">{user.username}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 cursor-pointer"
                        onClick={() => handleEdit(user._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
