import React from 'react';
import { RiskLevel } from '../../types';
import { AlertCircle, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showIndicatorDot?: boolean;
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  size = 'md',
  showIcon = true,
  showIndicatorDot = false,
  className = '',
}) => {
  const getConfig = () => {
    switch (level) {
      case 'CRITICAL':
        return {
          bg: 'bg-red-50 text-red-700 border-red-200 shadow-2xs',
          dot: 'bg-red-600',
          solidBg: 'bg-red-600 text-white border-transparent',
          icon: ShieldAlert,
          label: 'CRITICAL',
          indicatorBorder: 'border-l-4 border-l-red-600',
        };
      case 'HIGH':
        return {
          bg: 'bg-orange-50 text-orange-700 border-orange-200 shadow-2xs',
          dot: 'bg-orange-500',
          solidBg: 'bg-orange-500 text-white border-transparent',
          icon: AlertTriangle,
          label: 'HIGH',
          indicatorBorder: 'border-l-4 border-l-orange-500',
        };
      case 'MODERATE':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200 shadow-2xs',
          dot: 'bg-amber-500',
          solidBg: 'bg-yellow-500 text-white border-transparent',
          icon: AlertCircle,
          label: 'MODERATE',
          indicatorBorder: 'border-l-4 border-l-amber-500',
        };
      case 'LOW':
      default:
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-2xs',
          dot: 'bg-emerald-500',
          solidBg: 'bg-green-500 text-white border-transparent',
          icon: CheckCircle2,
          label: 'LOW',
          indicatorBorder: 'border-l-4 border-l-emerald-500',
        };
    }
  };

  const config = getConfig();
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1 font-bold',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-bold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold',
  };

  return (
    <span
      id={`risk-badge-${level.toLowerCase()}`}
      className={`inline-flex items-center rounded-full border tracking-wider uppercase font-sans ${config.bg} ${sizeClasses[size]} ${className}`}
    >
      {showIndicatorDot && (
        <span className="relative flex h-2 w-2 mr-0.5">
          {level === 'CRITICAL' && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`}></span>
        </span>
      )}
      {showIcon && !showIndicatorDot && <IconComponent className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      <span>{config.label}</span>
    </span>
  );
};
