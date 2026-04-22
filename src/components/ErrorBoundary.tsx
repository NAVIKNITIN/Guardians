"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryState = { hasError: boolean };

type ErrorBoundaryProps = {
  children: ReactNode;
};

/**
 * Catches client-side render errors. Fallback is intentionally plain text
 * to avoid design changes elsewhere.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // Hook for logging to an external service if needed later
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6" role="alert">
          Something went wrong. Please refresh the page.
        </div>
      );
    }
    return this.props.children;
  }
}
