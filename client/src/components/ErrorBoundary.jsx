import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Unexpected error' };
  }

  componentDidCatch(error, errorInfo) {
    console.error('UI crashed:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-red-900/40 bg-stone-900/80 p-8 text-stone-200">
          <h1 className="font-serifDisplay text-4xl text-red-300">Something went wrong</h1>
          <p className="mt-4 text-sm text-stone-300">
            The app hit an unexpected runtime error. Please refresh the page. If this keeps happening, redeploy from the latest clean commit.
          </p>
          <p className="mt-4 rounded-lg bg-stone-800 p-3 font-mono text-xs text-red-200">{this.state.message}</p>
          <button
            onClick={this.handleReload}
            type="button"
            className="mt-6 rounded-lg bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-600"
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
