import React from 'react';
import { Shield, Bell, HelpCircle, UserCheck } from 'lucide-react';

interface HeaderProps {
  activePage: string;
  criticalCasesCount: number;
  onNavigateToPriority: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  criticalCasesCount,
  onNavigateToPriority,
}) => {
  const getBreadcrumbs = () => {
    switch (activePage) {
      case 'dashboard':
        return { title: 'Overview Dashboard', subtitle: 'Real-time Analysis' };
      case 'priority-cases':
        return { title: 'Priority Cases', subtitle: 'Critical Queue & Triage' };
      case 'case-assessment':
        return { title: 'Case Assessment', subtitle: 'Multimodal SVI Evidence' };
      case 'interventions':
        return { title: 'Interventions', subtitle: 'Officer Action & Protocol' };
      case 'reports':
        return { title: 'Reports & Analytics', subtitle: 'Operational Oversight' };
      case 'settings':
        return { title: 'Settings', subtitle: 'Helpline Ingestion Config' };
      default:
        return { title: 'Portal Console', subtitle: 'VIONEX × NHAA' };
    }
  };

  const breadcrumb = getBreadcrumbs();

  return (
    <header
      id="portal-header"
      className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 flex-shrink-0 sticky top-0 z-30"
    >
      {/* Left: Geometric Balance Breadcrumbs */}
      <div className="flex items-center space-x-3">
        <span className="text-sm font-bold text-slate-800 tracking-tight">{breadcrumb.title}</span>
        <span className="text-slate-300 font-light">/</span>
        <span className="text-xs text-slate-500 font-medium">{breadcrumb.subtitle}</span>
      </div>

      {/* Right: Notification Bell & Officer Profile */}
      <div className="flex items-center space-x-6">
        {/* System Operational Indicator */}
        <div
          id="system-status-indicator"
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold"
          title="All VIONEX assessment microservices operating normally"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>System Operational</span>
        </div>

        {/* Critical Alerts Bell */}
        <button
          onClick={onNavigateToPriority}
          id="header-critical-alerts-btn"
          className="relative p-1.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer rounded-lg hover:bg-slate-100"
          title={`${criticalCasesCount} Critical Cases require immediate attention`}
        >
          <Bell className="w-5 h-5 text-slate-500" />
          {criticalCasesCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white shadow-2xs">
              {criticalCasesCount}
            </span>
          )}
        </button>

        {/* Officer Profile */}
        <div className="flex items-center space-x-3 pl-2 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-800">Officer J. Sharma</p>
            <p className="text-[10px] text-slate-400 font-medium">NHAA Supervisor (14566)</p>
          </div>
          <div
            className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs border border-slate-300 shadow-2xs"
            title="Officer J. Sharma • NHAA Supervisor"
          >
            JS
          </div>
        </div>
      </div>
    </header>
  );
};
