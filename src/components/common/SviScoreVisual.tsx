import React from 'react';
import { RiskLevel } from '../../types';
import { ShieldAlert, Info } from 'lucide-react';

interface SviScoreVisualProps {
  score: number; // 0 to 100
  riskLevel: RiskLevel;
  compact?: boolean;
}

export const SviScoreVisual: React.FC<SviScoreVisualProps> = ({ score, riskLevel, compact = false }) => {
  // Determine color accents based on score and risk level
  const getColor = () => {
    if (score >= 76) {
      return {
        text: 'text-red-600',
        bg: 'bg-red-500',
        ring: 'stroke-red-500',
        lightBg: 'bg-red-50',
        border: 'border-red-200',
        label: 'CRITICAL RISK',
      };
    }
    if (score >= 51) {
      return {
        text: 'text-orange-600',
        bg: 'bg-orange-500',
        ring: 'stroke-orange-500',
        lightBg: 'bg-orange-50',
        border: 'border-orange-200',
        label: 'HIGH RISK',
      };
    }
    if (score >= 26) {
      return {
        text: 'text-amber-600',
        bg: 'bg-amber-500',
        ring: 'stroke-amber-500',
        lightBg: 'bg-amber-50',
        border: 'border-amber-200',
        label: 'MODERATE RISK',
      };
    }
    return {
      text: 'text-emerald-600',
      bg: 'bg-emerald-500',
      ring: 'stroke-emerald-500',
      lightBg: 'bg-emerald-50',
      border: 'border-emerald-200',
      label: 'LOW RISK',
    };
  };

  const style = getColor();

  // Calculation for circular SVG gauge
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  if (compact) {
    return (
      <div id="svi-compact-visual" className="flex items-center gap-3">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="48"
              stroke="#e2e8f0"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="60"
              cy="60"
              r="48"
              className={style.ring}
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 48}
              strokeDashoffset={(2 * Math.PI * 48) - (score / 100) * (2 * Math.PI * 48)}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <span className={`absolute font-bold text-sm ${style.text}`}>{score}</span>
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">SVI Score</div>
          <div className={`text-xs font-bold ${style.text}`}>{score} / 100 • {riskLevel}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="svi-score-container"
      className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden"
    >
      {/* Top Tag */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-sky-100 text-sky-700 text-xs font-bold">
            SVI
          </span>
          <span className="text-sm font-semibold text-slate-800 tracking-wide uppercase">
            Stress & Vulnerability Index
          </span>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${style.lightBg} ${style.text} ${style.border}`}>
          {style.label}
        </span>
      </div>

      {/* Main Meter & Score */}
      <div className="py-6 flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Radial gauge */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 140 140">
            {/* Background track */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="#f1f5f9"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Scale segment markers */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="#e2e8f0"
              strokeWidth="12"
              strokeDasharray="2 6"
              fill="transparent"
            />
            {/* Active gauge value */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              className={`${style.ring} transition-all duration-1000 ease-out`}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Central score number */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className={`text-4xl font-extrabold tracking-tight ${style.text}`}>
              {score}
            </span>
            <span className="text-xs font-medium text-slate-400">/ 100</span>
          </div>
        </div>

        {/* Breakdown Scale */}
        <div className="flex-1 w-full max-w-md">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Assessment Scale Range
          </div>

          {/* Scale segments */}
          <div className="grid grid-cols-4 gap-1.5 mb-3 text-center">
            <div className={`p-2 rounded border text-xs ${score <= 25 ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-800 ring-2 ring-emerald-400/20' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
              <div className="font-semibold">0–25</div>
              <div className="text-[11px] text-emerald-600 font-medium">LOW</div>
            </div>
            <div className={`p-2 rounded border text-xs ${score > 25 && score <= 50 ? 'bg-amber-50 border-amber-300 font-bold text-amber-800 ring-2 ring-amber-400/20' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
              <div className="font-semibold">26–50</div>
              <div className="text-[11px] text-amber-600 font-medium">MODERATE</div>
            </div>
            <div className={`p-2 rounded border text-xs ${score > 50 && score <= 75 ? 'bg-orange-50 border-orange-300 font-bold text-orange-800 ring-2 ring-orange-400/20' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
              <div className="font-semibold">51–75</div>
              <div className="text-[11px] text-orange-600 font-medium">HIGH</div>
            </div>
            <div className={`p-2 rounded border text-xs ${score > 75 ? 'bg-red-50 border-red-300 font-bold text-red-800 ring-2 ring-red-400/20' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
              <div className="font-semibold">76–100</div>
              <div className="text-[11px] text-red-600 font-medium">CRITICAL</div>
            </div>
          </div>

          {/* Progress bar indication */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full ${style.bg} transition-all duration-700`}
              style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Baseline Safe</span>
            <span>Escalated Stress</span>
            <span>Severe Trauma</span>
            <span className="font-semibold text-red-600">Immediate Threat</span>
          </div>
        </div>
      </div>

      {/* Mandatory Non-Clinical Disclaimer Box */}
      <div
        id="svi-disclaimer-notice"
        className="mt-2 p-3 bg-sky-50/80 border border-sky-200 rounded-lg flex items-start gap-2.5 text-xs text-sky-900"
      >
        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-sky-950">Non-Clinical Assessment Notice: </span>
          The Stress & Vulnerability Index (SVI) is an AI-generated risk prioritization indicator
          engineered to assist NHAA duty officers in triaging assistance.
          <span className="font-semibold underline ml-1">It is NOT a clinical psychological diagnosis</span> and does
          not substitute professional officer evaluation.
        </div>
      </div>
    </div>
  );
};
