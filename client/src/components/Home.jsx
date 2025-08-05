import { useSelector } from 'react-redux';
import { Navbar } from './Navbar';

export const Home = () => {
  const { user } = useSelector(store => store.auth);
  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col flex-1 justify-center items-center">
        <h1 className="font-bold text-2xl mb-2 ">
          Welcome Back!..{user.username}
        </h1>
        <img
          src="src/assets/react.svg"
          alt="Logo"
          className="animate-[spin_5s_linear_infinite] size-20"
        />
      </div>
    </div>
  );
};
