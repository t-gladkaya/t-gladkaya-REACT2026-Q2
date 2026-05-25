import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex flex-col self-center justify-self-center gap-5">
        <div className="text-8xl font-bold text-slate-900 dark:text-slate-100">
          {' '}
          404
        </div>
        <div>The page you are looking for could not be found</div>

        <button
          onClick={() => navigate('/')}
          className="flex self-center justify-center w-40 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 duration-150 ease-in-out cursor-pointer active:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
        >
          To Main Page
        </button>
      </div>
    </div>
  );
};

export default NotFound;
