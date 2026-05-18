import ReloadButton from './ReloadButton';

interface ErrorFallbackProps {
  error: Error | null;
}

const ErrorFallback = ({ error }: ErrorFallbackProps) => {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <img src="/error-icon.png" alt="Error icon" className="w-10" />
      <div className="text-mist-600 text-lg font-semibold">
        {error ? error.message : 'An unexpected error occurred.'}
      </div>
      <ReloadButton />
    </div>
  );
};

export default ErrorFallback;
