import React, { ErrorInfo } from "react";

class ErrorBoundary extends React.Component {
  constructor(props: Record<string, any>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    // @ts-ignore TS2339: Property 'hasError' does not exist on type 'Readonly{}>'
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
