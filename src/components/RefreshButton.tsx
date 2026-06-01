import { useAppDispatch } from '../app/state';
import { mainApi } from '../api/api';

const RefreshButton = () => {
  const dispatch = useAppDispatch();

  const handleRefresh = () => {
    dispatch(
      mainApi.util.invalidateTags([
        { type: 'Characters', id: 'LIST' },
        { type: 'Character' },
      ])
    );
  };

  return (
    <button
      type="button"
      className="flex w-32 cursor-pointer justify-center self-end rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white transition duration-150 ease-in-out hover:bg-slate-800 active:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
      onClick={handleRefresh}
    >
      Refresh data
    </button>
  );
};

export default RefreshButton;
