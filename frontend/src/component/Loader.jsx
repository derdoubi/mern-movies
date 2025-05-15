import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
      <div className="w-4 h-4 rounded-full bg-primary animate-pulse delay-150"></div>
      <div className="w-4 h-4 rounded-full bg-primary animate-pulse delay-300"></div>
    </div>
  );
};

export default Loader;