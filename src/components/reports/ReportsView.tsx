import React, { useState } from 'react';
import { CaseRecord, DashboardMetrics } from '../../types';
import {
  BarChart3,
  Download,
  Calendar,
  Layers,
  PieChart,
  TrendingUp,
  CheckCircle2,
  Clock,
  ShieldAlert,
  FileSpreadsheet,
} from 'lucide-react';

interface ReportsViewProps {
  metrics: DashboardMetrics;
  cases: CaseRecord[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ metrics, cases }) => {
  const [reportDateRange, setReportDateRange] = useState('September 2026 (SIH Prototype)');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Risk breakdown data
  const riskData = [
    { label: 'Low Risk (0-25)', count: metrics.lowRisk, percent: Math.round((metrics.lowRisk / metrics.totalCases) * 100), color: 'bg-emerald-500', barColor: 'bg-emerald-500' },
    { label: 'Moderate (26-50)', count: metrics.moderateRisk, percent: Math.round((metrics.moderateRisk / metrics.totalCases) * 100), color: 'bg-amber-500', barColor: 'bg-amber-500' },
    { label: 'High Risk (51-75)', count: metrics.highRisk, percent: Math.round((metrics.highRisk / metrics.totalCases) * 100), color: 'bg-orange-500', barColor: 'bg-orange-500' },
    { label: 'Critical (76-100)', count: metrics.criticalRisk, percent: Math.round((metrics.criticalRisk / metrics.totalCases) * 100), color: 'bg-red-600', barColor: 'bg-red-600' },
  ];

  // Channel breakdown
  const channelData = [
    { channel: '14566 Helpline', count: 114, share: 46, color: 'bg-sky-600' },
    { channel: 'Integrated Web Portal', count: 62, share: 25, color: 'bg-blue-600' },
    { channel: 'Interactive IVRS', count: 42, share: 17, color: 'bg-indigo-600' },
    { channel: 'Citizen Chatbot', count: 22, share: 9, color: 'bg-cyan-600' },
    { channel: 'Mobile App SOS', count: 8, share: 3, color: 'bg-teal-600' },
  ];

  // Interventions breakdown
  const interventionData = [
    { type: 'Counselling Support', count: 98, percent: 39 },
    { type: 'Protection / Police Support', count: 54, percent: 22 },
    { type: 'Legal Aid Advisory', count: 46, percent: 18 },
    { type: 'Emergency Assistance Desk', count: 28, percent: 11 },
    { type: 'Medical Assistance', count: 22, percent: 10 },
  ];

  const handleExport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div id="reports-view" className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-blue-700 tracking-wider uppercase">
                Analytics &amp; Oversight
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
              <span className="w-2 h-6 bg-blue-500 mr-2.5 rounded-full"></span>
              Reports &amp; Operational Insights
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Aggregated statistical intelligence across NHAA channels and VIONEX AI stress classification
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadSuccess ? 'Report Exported (CSV)' : 'Export Summary (CSV)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 Performance Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg SVI Response Time</div>
          <div className="text-2xl font-black text-slate-900 font-mono">1.14 sec</div>
          <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3 h-3" /> Real-time stream latency
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">High Risk Escalation Rate</div>
          <div className="text-2xl font-black text-red-600 font-mono">100.0%</div>
          <div className="text-[11px] text-slate-500 mt-1">Zero dropped critical alerts</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Officer Review Compliance</div>
          <div className="text-2xl font-black text-blue-600 font-mono">98.4%</div>
          <div className="text-[11px] text-slate-500 mt-1">Human-in-the-loop adherence</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Interventions Active</div>
          <div className="text-2xl font-black text-slate-900 font-mono">{metrics.totalCases}</div>
          <div className="text-[11px] text-slate-500 mt-1">Across all 5 NHAA channels</div>
        </div>
      </div>

      {/* Two-column Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Cases by Risk Level */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Cases by Risk Level</h3>
              <p className="text-xs text-slate-500">Distribution across the 4 SVI risk bands</p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-600">{metrics.totalCases} Total</span>
          </div>

          <div className="space-y-4 pt-1">
            {riskData.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-slate-800">{item.label}</span>
                  <span className="font-mono text-slate-600">
                    <strong className="text-slate-900 font-bold">{item.count}</strong> ({item.percent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className={`h-full ${item.barColor} rounded-full`} style={{ width: `${item.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
            Critical cases require officer intervention within 15 minutes of inbound classification.
          </div>
        </div>

        {/* Chart 2: Cases by NHAA Channel */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Cases by NHAA Channel</h3>
              <p className="text-xs text-slate-500">Inflow across telephonic, web, IVR, and bot pipelines</p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-600">5 Gateways</span>
          </div>

          <div className="space-y-4 pt-1">
            {channelData.map((ch) => (
              <div key={ch.channel}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-slate-800">{ch.channel}</span>
                  <span className="font-mono text-slate-600">
                    <strong className="text-slate-900 font-bold">{ch.count}</strong> ({ch.share}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className={`h-full ${ch.color} rounded-full`} style={{ width: `${ch.share}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
            Voice helpline (14566) accounts for the largest proportion of urgent trauma assessments.
          </div>
        </div>

        {/* Chart 3: Intervention Recommendations Breakdown */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Intervention Recommendations</h3>
              <p className="text-xs text-slate-500">AI-suggested support tracks prioritized across all active cases</p>
            </div>
          </div>

          <div className="space-y-4 pt-1">
            {interventionData.map((intv) => (
              <div key={intv.type}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-slate-800">{intv.type}</span>
                  <span className="font-mono text-slate-600">
                    <strong className="text-slate-900 font-bold">{intv.count}</strong> cases ({intv.percent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${intv.percent * 2}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 4: Open vs Resolved Cases */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Open vs. Resolved Cases</h3>
              <p className="text-xs text-slate-500">Operational lifecycle progress across all received complaints</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-center">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Open / Pending Triage</div>
              <div className="text-3xl font-extrabold text-amber-900 font-mono">{metrics.openCases}</div>
              <div className="text-[11px] text-amber-700 mt-1 font-medium">Awaiting counsellor assignment</div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-center">
              <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">Assigned / In Progress</div>
              <div className="text-3xl font-extrabold text-blue-900 font-mono">
                {metrics.assignedCases + metrics.inProgressCases}
              </div>
              <div className="text-[11px] text-blue-700 mt-1 font-medium">Active support underway</div>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-center">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Fully Resolved Cases</div>
                <div className="text-[11px] text-emerald-700 mt-0.5">Closed with officer confirmation</div>
              </div>
              <div className="text-3xl font-extrabold text-emerald-900 font-mono">{metrics.resolvedCases}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
