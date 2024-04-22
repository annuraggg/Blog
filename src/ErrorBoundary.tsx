import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

const ErrB = () => {
  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => <ErrorBoundaryFallback error={error} />}
    >
      <Outlet />
    </ErrorBoundary>
  );
};

const ErrorBoundaryFallback = ({ error }: { error: Error }) => {
  return (
    <div className=" h-[100vh] ">
      <div className="flex items-center justify-around gap-10 h-[90%]">
        <div className="flex flex-col items-center justify-center">
          <img
            src="https://fontmeme.com/permalink/240331/b57a14ca3392ebd9da00a5437bc1a9bb.png"
            alt="error"
            className=" mix-blend-screen"
          />
          <h1>Something went wrong</h1>
          <p className=" text-center mt-5">
            Smells like a bug. Please report this to the developers.
            <br />
            Meanwhile, you can try refreshing the page.
          </p>
        </div>
        <div>
          <p className="text-gray-500 w-[700px] bg-black rounded-lg border-2 p-5 border-red-800 mt-10 max-h-[200px] overflow-auto">
            <span className="text-gray-300">Error Message: </span>
            <br />
            {error.message}
          </p>
          <p className="w-[700px] text-gray-500 mt-5 bg-black border border-blue-900  p-5 rounded-md overflow-auto h-[300px]">
            <span className="text-gray-300">Error Stack: </span>
            <br />
            <pre className=" text-wrap">{error.stack}</pre>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button onClick={() => (window.location.href = "/")}>
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrB;