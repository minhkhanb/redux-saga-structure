import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const twConfig = require('../../tailwind.config.js');

// Hook
interface SizeAndOrientation {
  width: number;
  height: number;
  isLandscape: boolean;
  isPortrait: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
}

export const useWindowSizeInfo = (): SizeAndOrientation => {
  const isClient = typeof window === 'object';

  function getSize(): SizeAndOrientation {
    const isLandscape = isClient
      ? window.orientation === 90 || window.orientation === -90
      : true;
    const width = isClient ? window.innerWidth : twConfig.screens.md + 20;
    const height = isClient
      ? document?.documentElement?.clientHeight ?? window.innerHeight
      : 768;

    return {
      width,
      height,
      isLandscape,
      isPortrait: !isLandscape,
      sm: width > twConfig.screens.sm,
      md: width > twConfig.screens.md,
      lg: width > twConfig.screens.lg,
    };
  }

  const [windowSize, setWindowSize] =
    React.useState<SizeAndOrientation>(getSize);

  React.useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

    // Empty array ensures that effect is only run on mount and unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return windowSize;
};

export const Div100vh: React.FC<{ className?: string }> = ({
  children,
  className,
}) => {
  const { height } = useWindowSizeInfo();
  return (
    <div style={{ display: 'flex', height }} className={className}>
      {children}
    </div>
  );
};
