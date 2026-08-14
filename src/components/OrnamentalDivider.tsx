import React from 'react';

interface OrnamentalDividerProps {
  variant?: 'gold' | 'maroon' | 'cream';
  className?: string;
}

export const OrnamentalDivider: React.FC<OrnamentalDividerProps> = ({
  variant = 'gold',
  className = '',
}) => {
  const strokeColor =
    variant === 'maroon'
      ? '#6B1D2F'
      : variant === 'cream'
      ? '#FAF6F0'
      : '#D4AF37';

  return (
    <div className={`flex items-center justify-center my-6 opacity-90 ${className}`}>
      <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="mx-3 flex items-center justify-center text-gold">
        <svg
          width="36"
          height="36"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 sm:w-9 sm:h-9 transform hover:rotate-45 transition-transform duration-700"
        >
          {/* Outer Petals */}
          <circle cx="50" cy="50" r="44" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="36" stroke={strokeColor} strokeWidth="1" />
          
          {/* Mandala Petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <g key={i} transform={`rotate(${angle} 50 50)`}>
              <path
                d="M50 14 C54 26 54 34 50 42 C46 34 46 26 50 14 Z"
                fill={strokeColor}
                fillOpacity="0.25"
                stroke={strokeColor}
                strokeWidth="1"
              />
            </g>
          ))}
          {/* Inner Lotus Core */}
          <circle cx="50" cy="50" r="10" fill={strokeColor} fillOpacity="0.4" />
          <circle cx="50" cy="50" r="4" fill={strokeColor} />
        </svg>
      </div>
      <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  );
};
