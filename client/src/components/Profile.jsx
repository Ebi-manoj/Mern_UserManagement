import { useRef, useState } from 'react';
import { Navbar } from './Navbar';
import { CgProfile } from 'react-icons/cg';
import { MdEmail } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { PROFILE_URL } from '../utils/constant';
import axiosInstance from '../utils/axiosInstance';
import { setCredintials } from '../../store/authSlice';
import { toast } from 'react-toastify';
import { Loading } from './Loading';

export const Profile = () => {
  const { user } = useSelector(store => store.auth);
  const [isLoading, setisLoading] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const fileRef = useRef();
  const dispatch = useDispatch();

  async function handleuplaod(event) {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setisLoading(true);
    try {
      const res = await axiosInstance.post('/user/profile/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      event.target.value = '';
      dispatch(setCredintials(res.data));
      toast('Profile updated succefully');
      console.log(res);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      console.log(error);
    } finally {
      setisLoading(false);
    }
  }
  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      <Navbar />
      <div className="w-full flex flex-1 items-center">
        {isLoading && <Loading />}
        <div className="w-8/12 flex mx-auto flex-col px-10 py-4 shadow-lg">
          <div className="relative w-[150px] h-[150px] mx-auto">
            <img
              src={user?.profileImg ?? PROFILE_URL}
              alt="profile"
              className="w-[150px] h-[150px] rounded-full mx-auto"
            />
            <input
              type="file"
              className="hidden"
              ref={fileRef}
              onChange={handleuplaod}
            />
            <div className="absolute bottom-6 right-5 bg-white p-1 rounded-full shadow-md">
              <svg
                id="upload-img-btn"
                xmlns="http://www.w3.org/2000/svg"
                className=" h-5 w-5 text-gray-700 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => fileRef.current.click()}
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
              </svg>
            </div>
          </div>
          <h1 className="mx-auto">{user?.username}</h1>
          <div className="details mt-5 w-[80%] mx-auto flex flex-col">
            <div className="flex items-center mb-3 bg-[#f9fafb] px-2 py-4 rounded-lg">
              <CgProfile className="size-8" />
              <div className="ml-5">
                <p className="text-[14px] text-gray-400">Username</p>
                <p className="font-bold">{user?.username}</p>
              </div>
            </div>
            <div className="flex items-center mb-3 bg-[#f9fafb] px-2 py-4 rounded-lg">
              <MdEmail className="size-8" />
              <div className="ml-5">
                <p className="text-[14px] text-gray-400">Email</p>
                <p className="font-bold">{user?.email}</p>
              </div>
            </div>
            <button className="mx-auto bg-black cursor-pointer text-white px-5 py-2 rounded-lg ">
              Edit ✏️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
