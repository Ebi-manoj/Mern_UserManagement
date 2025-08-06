import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signSchema } from '../utils/validations';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
export const CreateModal = ({ toggleModal, populate }) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signSchema) });

  async function onSubmit(data) {
    try {
      const res = await axiosInstance.post('/user/signup', data);
      const { createdUser } = res.data;
      reset();
      toggleModal();
      populate(createdUser);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
    console.log(data);
  }
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add User</h2>
          <button
            className="text-gray-500 hover:text-red-500 text-xl cursor-pointer"
            onClick={toggleModal}
          >
            &times;
          </button>
        </div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-2 border rounded mt-5"
            required
            {...register('username')}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded mt-5"
            required
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <input
            type="password"
            name="password"
            placeholder="New Password"
            className="w-full p-2 border rounded mt-5"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-2 border rounded mt-5"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full mt-5"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
