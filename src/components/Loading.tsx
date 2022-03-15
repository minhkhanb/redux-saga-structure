import React from 'react';
import { css } from '@emotion/react';
import { NotFound } from '@src/components/NotFound';

export enum LoadingErrors {
  UserNotAvailable = 'UserNotAvailable',
}

interface LoadingProps {
  error?: LoadingErrors;
  local?: boolean;
  hidden?: boolean;
  className?: string;
}

interface SpinnerProps {
  className?: string;
}

const Spinner: React.FunctionComponent<SpinnerProps> = ({ className }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full ${className}`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

const Loading: React.FC<LoadingProps> = ({
  error,
  local,
  hidden,
  className = '',
}) => {
  if (error) {
    console.log('Loading Error: ', error);

    switch (error) {
      case LoadingErrors.UserNotAvailable:
        return <p>User not available</p>;
      default:
        return <NotFound />;
    }
  }

  if (hidden) {
    return null;
  }

  return (
    <Spinner
      className={`text-blue-3 ${className}`}
      css={
        local
          ? css`
              width: 100%;
              height: 100%;
              zoom: 0.5;
              margin: auto;
            `
          : css`
              position: fixed;
              top: calc(50% - 1.75rem);
              left: calc(50% - 1.75rem);
              width: ${local ? '1rem' : '3.5rem'};
              height: ${local ? '1rem' : '3.5rem'};
            `
      }
    />
  );
};

export default Loading;
