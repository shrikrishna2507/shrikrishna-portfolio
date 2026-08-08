import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: string | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error ? error.toString() : 'Unknown Error' };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Portfolio Error Boundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error(e);
    }
    window.location.href = window.location.origin + window.location.pathname;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#090d16',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            padding: '40px',
            maxWidth: '600px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
          }}>
            <h2 style={{ fontSize: '22px', marginBottom: '12px', color: '#38bdf8' }}>
              Shri Krishna S Bhat Portfolio
            </h2>
            <div style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#f87171',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontFamily: 'monospace',
              marginBottom: '20px',
              wordBreak: 'break-word',
              textAlign: 'left'
            }}>
              <strong>Error Trace:</strong> {this.state.error}
            </div>
            <button
              onClick={this.handleReset}
              style={{
                background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
                color: '#ffffff',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Reset & Reload Fresh Portfolio Data
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
