import React from 'react';

interface TestButtonState {
  shouldThrowError: boolean;
}

class TestButton extends React.Component<object, TestButtonState> {
  state: TestButtonState = {
    shouldThrowError: false,
  };

  render() {
    if (this.state.shouldThrowError) {
      throw new Error('Test application error');
    }

    return (
      <button
        type="button"
        className="flex self-center justify-center w-40 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 duration-150 ease-in-out cursor-pointer active:bg-slate-700"
        onClick={() => this.setState({ shouldThrowError: true })}
      >
        Test Button
      </button>
    );
  }
}

export default TestButton;
