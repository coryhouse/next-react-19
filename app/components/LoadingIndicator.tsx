import React from "react";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default LoadingIndicator;
