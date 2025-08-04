export const Home = () => {
  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      <nav className="bg-gradient-to-r from-blue-400 to-cyan-300 text-black flex justify-center py-5">
        <ul className="flex gap-10 items-center  text-l">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Profile</li>
          <li className="cursor-pointer">Logout</li>
        </ul>
      </nav>
      <div className="flex flex-1 justify-center items-center">
        <img
          src="src/assets/react.svg"
          alt="Logo"
          className="animate-[spin_5s_linear_infinite] size-20"
        />
      </div>
    </div>
  );
};
