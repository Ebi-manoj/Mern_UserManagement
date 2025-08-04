import { useState } from 'react';
import { loginSchema, signSchema } from '../utils/validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const Login = () => {
  const [signState, setSignState] = useState('Log In');
  const schema = signState == 'Sign Up' ? signSchema : loginSchema;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function handleSwitch() {
    const state = signState == 'Log In' ? 'Sign Up' : 'Log In';
    reset();
    setSignState(state);
  }
  function onSubmit(data) {
    console.log(data);
  }
  return (
    <div className="w-full min-h-screen bg-[#296cab] flex items-center">
      <form
        action=""
        className="w-5/12 mx-auto h-full  bg-white shadow-md rounded-md p-8 pt-5 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center font-bold text-3xl mt-2">{signState}</h1>
        <div className="w-[70%]  flex flex-col mx-auto">
          {signState == 'Sign Up' && (
            <>
              <label htmlFor="" className="mt-4">
                Username
              </label>
              <input
                type="text"
                placeholder="username"
                className="px-3 py-3 border-2 border-black rounded-sm"
                {...register('username')}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </>
          )}
          <label htmlFor="" className="mt-4">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email "
            className="px-3 py-3 border-2 border-black rounded-sm"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <label htmlFor="" className="mt-4">
            Password
          </label>
          <input
            type="text"
            placeholder="*******"
            className="px-3 py-3 border-2 border-black rounded-sm"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          {signState == 'Sign Up' && (
            <>
              <label htmlFor="" className="mt-4">
                Confirm Password
              </label>
              <input
                type="text"
                placeholder="*******"
                className="px-3 py-3 border-2 border-black rounded-sm"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </>
          )}
          <button
            type="submit"
            className="bg-[#296cab] py-3 mt-5 font-bold text-white cursor-pointer"
          >
            {signState}
          </button>
          <div className="switch-form mx-auto mt-4">
            <p className="">
              {signState == 'Sign Up'
                ? 'Already have Account?'
                : `Don't have an Account?`}
              <span
                className="ml-2 underline text-black font-semibold cursor-pointer"
                onClick={handleSwitch}
              >
                {signState}
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
