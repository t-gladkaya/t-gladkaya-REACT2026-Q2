import {
  clearSelectedItems,
  useAppSelector,
  useAppDispatch,
} from '../app/state';

const Flyout = () => {
  const selectedItems = useAppSelector((state) => state.selectedItems.items);
  const selectedCount = selectedItems.length;

  const dispatch = useAppDispatch();

  if (selectedCount === 0) {
    return null;
  }

  const handleUnselectAll = () => {
    dispatch(clearSelectedItems());
  };

  return (
    <div className="sticky bottom-0 h-15 rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-md transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:shadow-slate-950/40">
      <div className="flex h-full items-center justify-center gap-10">
        <div className="text-sm font-medium">
          {' '}
          Selected items: {selectedCount}
        </div>
        <button
          type="button"
          className="flex w-32 cursor-pointer justify-center rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white transition duration-150 ease-in-out hover:bg-slate-800 active:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
          onClick={handleUnselectAll}
        >
          Unselect All
        </button>
        <button
          type="button"
          className="flex w-32 cursor-pointer justify-center rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white transition duration-150 ease-in-out hover:bg-slate-800 active:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Flyout;
