/**
 * Official V-Guard Logo Component
 * "Bring Home a Better Tomorrow"
 */

import React from 'react';

interface VGuardLogoProps {
  variant?: 'horizontal' | 'vertical' | 'mark-only' | 'badge';
  theme?: 'light' | 'dark' | 'orange';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const VGuardLogo: React.FC<VGuardLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  // Brand Colors
  const primaryOrange = '#F37021';
  const textColor = theme === 'dark' ? '#FFFFFF' : '#0B2545';
  const taglineColor = theme === 'dark' ? '#94A3B8' : '#64748B';

  const sizeClasses = {
    sm: { height: 26, markSize: 24, fontSize: 'text-base', tagSize: 'text-[9px]' },
    md: { height: 34, markSize: 32, fontSize: 'text-xl', tagSize: 'text-[10px]' },
    lg: { height: 44, markSize: 42, fontSize: 'text-2xl', tagSize: 'text-xs' },
    xl: { height: 56, markSize: 52, fontSize: 'text-3xl', tagSize: 'text-sm' },
  }[size];

  // The Iconic V-Guard Kangaroo Silhouette
  const KangarooMark = (
    <svg
      viewBox="0 0 100 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block transition-transform duration-300 group-hover:scale-105"
      style={{ width: sizeClasses.markSize * 1.5, height: sizeClasses.markSize }}
    >
      <defs>
        <linearGradient id="vgOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFA033" />
          <stop offset="50%" stopColor="#F37021" />
          <stop offset="100%" stopColor="#D95000" />
        </linearGradient>
      </defs>
      {/* Dynamic aerodynamic Kangaroo silhouette */}
      <path
        d="M 92 12
           C 91 10, 87 7, 86 6
           C 85 5, 84 7, 85 9
           C 87 11, 88 13, 87 14
           C 86 14, 84 13, 83 12
           C 80 10, 78 13, 81 16
           C 83 18, 86 19, 83 22
           C 80 23, 76 21, 74 20
           C 65 15, 52 14, 38 18
           C 28 21, 20 28, 12 36
           C 10 38, 15 37, 19 35
           C 28 30, 42 27, 56 32
           C 64 35, 71 40, 72 45
           C 73 50, 70 54, 65 57
           C 63 58, 64 61, 67 60
           C 74 58, 80 50, 78 42
           C 77 38, 73 34, 75 30
           C 77 26, 83 27, 88 28
           C 93 29, 97 27, 95 24
           C 94 22, 90 20, 93 17
           C 95 15, 94 13, 92 12 Z"
        fill="url(#vgOrangeGrad)"
      />
      {/* Front paws motion accent */}
      <path
        d="M 68 34 C 64 36, 62 41, 64 43 C 65 44, 67 43, 67 41 C 67 38, 70 36, 68 34 Z"
        fill="url(#vgOrangeGrad)"
        opacity="0.85"
      />
    </svg>
  );

  if (variant === 'mark-only') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{KangarooMark}</div>;
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center group ${className}`}>
        <div className="mb-1">{KangarooMark}</div>
        <div className="flex items-center space-x-1">
          <span
            className={`font-heading font-extrabold tracking-tight ${sizeClasses.fontSize}`}
            style={{ color: textColor }}
          >
            V-GUARD
          </span>
          <span className="text-orange-500 font-bold text-xs px-1.5 py-0.5 rounded bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800">
            ONE
          </span>
        </div>
        {showTagline && (
          <p
            className={`font-medium tracking-wide mt-1 italic ${sizeClasses.tagSize}`}
            style={{ color: taglineColor }}
          >
            Bring Home a Better Tomorrow
          </p>
        )}
      </div>
    );
  }

  // Horizontal layout
  return (
    <div className={`inline-flex items-center space-x-3 group ${className}`}>
      <div className="flex-shrink-0">{KangarooMark}</div>
      <div className="flex flex-col">
        <div className="flex items-center space-x-1.5 leading-none">
          <span
            className={`font-heading font-extrabold tracking-tight ${sizeClasses.fontSize}`}
            style={{ color: textColor }}
          >
            V-GUARD
          </span>
          <span className="text-white bg-gradient-to-r from-orange-500 to-amber-600 font-bold text-[10px] tracking-wider px-1.5 py-0.5 rounded-full shadow-sm">
            ONE
          </span>
        </div>
        {showTagline && (
          <span
            className={`font-medium tracking-tight mt-0.5 italic leading-tight ${sizeClasses.tagSize}`}
            style={{ color: taglineColor }}
          >
            Bring Home a Better Tomorrow
          </span>
        )}
      </div>
    </div>
  );
};
