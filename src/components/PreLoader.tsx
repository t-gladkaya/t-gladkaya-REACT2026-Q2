const PreLoader = () => {
  return (
    <div
      className="flex justify-center py-10"
      role="status"
      aria-label="Loading"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900 dark:border-slate-700 dark:border-t-slate-100" />
    </div>
  );
};

export default PreLoader;
