const ReloadButton = () => {
  return (
    <div>
      <button
        className="flex self-center justify-center w-40 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 duration-150 ease-in-out cursor-pointer active:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
        onClick={() => window.location.reload()}
      >
        {' '}
        Reload the page{' '}
      </button>
    </div>
  );
};

export default ReloadButton;
