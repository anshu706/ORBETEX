import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '60px 20px',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto',
          fontFamily: 'var(--font-sans)'
        }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}>
            Something went wrong loading this laboratory module
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '16px 0 24px' }}>
            {this.state.error?.message || 'An unexpected rendering error occurred.'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            style={{
              background: 'var(--accent)',
              color: 'var(--bg)',
              border: 'none',
              padding: '10px 24px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Reload Module
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
