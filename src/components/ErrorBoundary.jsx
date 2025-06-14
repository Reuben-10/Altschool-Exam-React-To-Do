import { Component } from 'react';

// ErrorBoundary for ToDoListPage and other React components
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You can log error info here if needed
    console.error('Error caught by ErrorBoundary:', error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-red-100 p-8 sm:p-10">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-red-600 mb-2 text-center">Something went wrong</h1>
              <p className="mt-2 text-gray-700 text-base sm:text-lg text-center">
                {this.state.error?.message || 'An unexpected error occurred.'}
              </p>
              <button
                onClick={this.handleReload}
                className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-full font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;