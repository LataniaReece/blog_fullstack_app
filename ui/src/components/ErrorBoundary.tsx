import { Component, ErrorInfo, ReactNode } from "react";
import PageError from "./PageError";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // Log error to reporting service here, if desired
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <PageError heading="Oops!" subHeading="Something went wrong" />;
    }

    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
