import React from 'react';

interface LoaderProps {
  /** 
   * The hex color of the loader. 
   * @default "#000B58" 
   */
  color?: string;
  /** 
   * The base size multiplier. 
   * @default 2.25 
   */
  size?: number;
}

export const Loader: React.FC<LoaderProps> = ({ 
  color = '#000B58', 
  size = 2.25 
}) => {
  // Pre-calculate dimensions based on the CSS calc() formulas
  const dimension = 48 * size;
  const borderSize = 2 * size;

  // Shared styles for what used to be ::before and ::after
  const circleStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    width: dimension,
    height: dimension,
    borderRadius: '50%',
    border: `${borderSize}px solid ${color}`,
    position: 'absolute',
    left: 0,
    top: 0,
    animation: 'animloader 2s linear infinite',
  };

  return (
    <>
      {/* Keyframes must be injected via a style tag */}
      <style>
        {`
          @keyframes animloader {
            0% {
              transform: scale(0);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 0;
            }
          }
        `}
      </style>

      {/* Main container */}
      <div 
        style={{
          width: dimension,
          height: dimension,
          display: 'inline-block',
          position: 'relative',
        }}
      >
        {/* Equivalent to ::before */}
        <span style={circleStyle} />
        
        {/* Equivalent to ::after (with the delay) */}
        <span style={{ ...circleStyle, animationDelay: '1s' }} />
      </div>
    </>
  );
};