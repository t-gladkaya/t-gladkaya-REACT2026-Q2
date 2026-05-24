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

  const escapeCsvValue = (value: string | number) => {
    const escapedValue = String(value).replaceAll('"', '""');

    return `"${escapedValue}"`;
  };

  const handleDownload = () => {
    const csvHeaders = ['id', 'name', 'image'];

    const csvRows = selectedItems.map((item) => [
      item.id,
      item.name,
      item.image,
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map((row) => row.map(escapeCsvValue).join(',')),
    ].join('\n');

    const blob = new Blob([`\uFEFF${csvContent}`], {
      type: 'text/csv;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${selectedCount}_items.csv`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    setTimeout(() => {
      link.remove();
      URL.revokeObjectURL(url);
    }, 1000);
  };

  return (
    <div className="sticky bottom-0 h-15 animate-[flyoutIn_220ms_ease-out] rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-md transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:shadow-slate-950/40">
      <div className="flex h-full items-center justify-center gap-10">
        <div className="text-sm font-medium">
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
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Flyout;
