import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Check if it's an i18n related error
    if (error.message && error.message.includes('i18n')) {
      console.warn('i18n error detected, attempting to reset language to English');
      try {
        // Try to reset to English
        if (window.i18n) {
          window.i18n.changeLanguage('en');
        }
        // Clear localStorage to reset language settings
        localStorage.removeItem('i18nextLng');
        localStorage.removeItem('preferred-language');
        
        // Reload the page after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (resetError) {
        console.error('Failed to reset language:', resetError);
      }
    }
  }

  handleRetry = () => {
    // Reset error state and try again
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    // Force page reload
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-md w-full mx-auto p-6 bg-card border rounded-lg shadow-lg">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Something went wrong
              </h1>
              <p className="text-muted-foreground mb-6">
                We encountered an unexpected error. This might be related to language switching.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={this.handleRetry}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </button>
                
                <button
                  onClick={this.handleReload}
                  className="w-full px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
                >
                  Reload Page
                </button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-muted-foreground">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 text-xs bg-muted p-3 rounded overflow-auto max-h-32">
                    {this.state.error.toString()}
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

