import React from 'react';
import {
  LayoutDashboard,
  AlertOctagon,
  FileSearch,
  HandHeart,
  BarChart3,
  Settings,
  Cpu,
  Radio,
  ExternalLink,
} from 'lucide-react';

export type PageId = 'dashboard' | 'priority-cases' | 'case-assessment' | 'interventions' | 'reports' | 'settings';

interface SidebarProps {
  activePage: PageId;
  onSelectPage: (page: PageId) => void;
  criticalCount: number;
  selectedCaseId: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onSelectPage,
  criticalCount,
  selectedCaseId,
}) => {
  const navItems = [
    {
      id: 'dashboard' as PageId,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'priority-cases' as PageId,
      label: 'Priority Cases',
      icon: AlertOctagon,
      badge: (
        <span className="ml-auto px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-600 text-white shadow-2xs">
          {criticalCount}
        </span>
      ),
    },
    {
      id: 'case-assessment' as PageId,
      label: 'Case Assessment',
      icon: FileSearch,
      badge: (
        <span className="ml-auto px-1.5 py-0.5 text-[10px] font-semibold rounded bg-sky-950 text-sky-400 border border-sky-800">
          Live
        </span>
      ),
    },
    {
      id: 'interventions' as PageId,
      label: 'Interventions',
      icon: HandHeart,
      badge: null,
    },
    {
      id: 'reports' as PageId,
      label: 'Reports',
      icon: BarChart3,
      badge: null,
    },
    {
      id: 'settings' as PageId,
      label: 'Settings',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <aside
      id="portal-sidebar"
      className="w-64 bg-[#0F172A] text-slate-200 flex-shrink-0 flex flex-col justify-between border-r border-slate-800 select-none min-h-screen"
    >
      <div>
        {/* Geometric Balance Top Branding */}
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-cyan-400 font-bold text-xl tracking-tight">
            VIONEX <span className="text-white">× NHAA</span>
          </h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
            AI Risk &amp; Assessment Portal
          </p>
        </div>

        {/* Navigation Section */}
        <nav className="py-4">
          <div className="px-6 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Main Console
          </div>
          <div className="space-y-0.5 mt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => onSelectPage(item.id)}
                  className={`w-full flex items-center px-6 py-3 text-sm transition-colors text-left ${
                    isActive
                      ? 'bg-blue-600/10 border-r-4 border-blue-500 text-blue-400 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 mr-3 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                  {item.badge}
                </button>
              );
            })}
          </div>
        </nav>

        {/* SIH 2026 Problem Statement Callout */}
        <div className="mx-4 mt-4 p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs">
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>Problem SIH26093</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Real-Time Stress &amp; Trauma Assessment Layer for 14566 and Integrated NHAA Portal.
          </p>
          <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
            <span>Role: AI Assessment</span>
            <span className="text-emerald-400 font-semibold">Active Layer</span>
          </div>
        </div>
      </div>

      {/* Geometric Balance Bottom System Status Card */}
      <div className="p-4 mt-auto">
        <div className="bg-slate-800 rounded-lg p-3 border border-slate-700/60">
          <p className="text-[10px] text-slate-400 uppercase font-semibold">System Status</p>
          <div className="flex items-center mt-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
            <span className="text-xs text-emerald-100 font-medium">Operational</span>
            <span className="ml-auto text-[10px] text-slate-400 font-mono">v2.4</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
