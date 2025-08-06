import { HashLoader } from 'react-spinners';
export const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
      <HashLoader color="#7ae0ff" size={50} />
    </div>
  );
};
