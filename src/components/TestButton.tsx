import React from 'react';
import { useLazyTestInvalidEndpointQuery } from '../api/api';

interface TestButtonState {
  error: Error | null;
}

const TestButton = () => {
  const [state, setState] = React.useState<TestButtonState>({
    error: null,
  });

  const [triggerTestRequest] = useLazyTestInvalidEndpointQuery();

  const triggerNetworkError = async () => {
    try {
      await triggerTestRequest().unwrap();
    } catch {
      setState({ error: new Error('Request failed') });
    }
  };

  if (state.error) {
    throw state.error;
  }

  return (
    <button
      type="button"
      className="flex w-32 cursor-pointer justify-center self-end rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white transition duration-150 ease-in-out hover:bg-slate-800 active:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
      onClick={triggerNetworkError}
    >
      Test Button
    </button>
  );
};

export default TestButton;
