import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      errorInfo: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[CMS Error]:', error);
    console.error('[Error Info]:', errorInfo);

    this.setState({
      error,
      errorInfo
    });
  }

  private handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null 
    });
    // Force a reload of the CMS
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-red-800 font-semibold mb-2">CMS Error</h2>
          <p className="text-red-600 mb-2">{this.state.error?.message}</p>
          {this.state.errorInfo && (
            <pre className="mt-2 p-2 bg-red-100 rounded text-sm overflow-auto max-h-40">
              <code>{this.state.errorInfo.componentStack}</code>
            </pre>
          )}
          <button
            className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
            onClick={this.handleRetry}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;