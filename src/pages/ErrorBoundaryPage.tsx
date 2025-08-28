import ErrorBoundary from "@/components/ErrorBoundary";

const ThrowError = () => {
  throw new Error("This is a test error for the Error Boundary!");
};

const ErrorBoundaryPage = () => (
  <ErrorBoundary>
    <ThrowError />
  </ErrorBoundary>
);

export default ErrorBoundaryPage;