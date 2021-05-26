import React from 'react';
import LoaderImage from './images/Spin-1s-200px.gif';

const LoadingIndicator = () => {
  return (
    <div className="indicatorContainer">
      <img src={LoaderImage} className="loader" alt="loading" />
    </div>
  );
};

export default LoadingIndicator;
