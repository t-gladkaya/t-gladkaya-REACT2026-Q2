import React from 'react';

interface TestButtonState {
  error: Error | null;
}

const TestButton = () => {
  const [state, setState] = React.useState<TestButtonState>({
    error: null,
  });

  const triggerNetworkError = async () => {
    try {
      const response = await fetch(
        'https://rickandmortyapi.com/api/invalid-endpoint'
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      await response.json();
    } catch (error) {
      if (error instanceof Error) {
        setState({ error });
      } else {
        setState({ error: new Error('Request failed') });
      }
    }
  };

  if (state.error) {
    throw state.error;
  }

  return (
    <button
      type="button"
      className="flex self-center justify-center w-40 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 duration-150 ease-in-out cursor-pointer active:bg-slate-700"
      onClick={triggerNetworkError}
    >
      Test Button
    </button>
  );
};

export default TestButton;
