import React from 'react';
import { CaseRecord, DashboardMetrics } from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import {
  AlertOctagon,
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  PhoneCall,
  Globe,
  Bot,
  Layers,
  ArrowRight,
  Eye,
  FileCheck,
  Zap,
  TrendingUp,
  Cpu,
  UserCheck,
  Shield,
} from 'lucide-react';

interface DashboardViewProps {
  metrics: DashboardMetrics;
  cases: CaseRecord[];
  onViewCase: (conversationId: string) => void;
  onNavigateToPriority: () => void;
  onNavigateToReports: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  metrics,
  cases,
  onViewCase,
  onNavigateToPriority,
  onNavigateToReports,
}) => {
  // Ensure the primary sample cases are ordered prominently
  const sampleOrder = ['NHAA-VX-004821', 'NHAA-VX-004817', 'NHAA-VX-004813', 'NHAA-VX-004809'];
  const priorityCasesTable = [...cases].sort((a, b) => {
    const idxA = sampleOrder.indexOf(a.conversationId);
    const idxB = sampleOrder.indexOf(b.conversationId);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return b.sviScore - a.sviScore;
  });

  return (
    <div id="dashboard-view" className="space-y-8 animate-fadeIn">
      {/* Top Banner / Concept Framing */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-sky-50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-navy-900 bg-slate-900 text-sky-400">
                VIONEX ASSESSMENT LAYER
              </span>
              <span className="text-xs font-semibold text-slate-500">
                National Helpline for Against Abuse (14566)
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Real-Time AI Stress &amp; Trauma Assessment Portal
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              <span className="font-semibold text-slate-900">“VIONEX converts victim interactions into actionable risk insights for NHAA.”</span>{' '}
              VIONEX operates alongside the NHAA ecosystem, providing multimodal trauma detection, SVI risk prioritization, and structured intervention recommendations for authorized officers.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onNavigateToPriority}
              id="dash-quick-priority-btn"
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-2 transition-colors"
            >
              <ShieldAlert className="w-4 h-4" />
              View {metrics.criticalRisk} Critical Cases
            </button>
            <button
              onClick={onNavigateToReports}
              id="dash-quick-reports-btn"
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors border border-slate-200 flex items-center gap-1.5"
            >
              <TrendingUp className="w-4 h-4" />
              Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Architecture Flow Banner from Geometric Balance Theme */}
      <div className="bg-blue-600 rounded-xl p-6 text-white flex flex-col md:flex-row md:items-center justify-between shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded text-white">
              SIH26093 Prototype
            </span>
            <span className="text-xs text-blue-200">National Helpline 14566 Integration</span>
          </div>
          <h3 className="font-extrabold text-xl tracking-tight">NHAA Integration Architecture</h3>
          <p className="text-blue-100 text-xs mt-1 max-w-xl leading-relaxed">
            AI layer analyzing real-time victim interactions alongside the National Helpline 14566 ecosystem, generating structured risk insights for duty officers.
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0 shrink-0">
          <div className="bg-blue-500/50 p-3 rounded-lg text-xs text-center border border-white/20 min-w-[100px]">
            <p className="font-bold text-white">CHANNELS</p>
            <p className="opacity-80 text-[10px] mt-0.5">14566, Portal, Bot</p>
          </div>
          <div className="text-blue-200 font-bold">→</div>
          <div className="bg-cyan-500/50 p-3 rounded-lg text-xs text-center border border-white/20 min-w-[100px]">
            <p className="font-bold text-white">VIONEX AI</p>
            <p className="opacity-80 text-[10px] mt-0.5">SVI Scoring (0–100)</p>
          </div>
          <div className="text-blue-200 font-bold">→</div>
          <div className="bg-white p-3 rounded-lg text-xs text-center border border-white/20 text-blue-800 min-w-[100px]">
            <p className="font-bold">INTERVENTION</p>
            <p className="text-blue-600 text-[10px] mt-0.5">NHAA Officers</p>
          </div>
        </div>
      </div>

      {/* 5 Summary Metric Cards (Geometric Balance Theme) */}
      <div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Triage &amp; Risk Distribution
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* TOTAL CASES */}
          <div
            id="metric-total-cases"
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Cases</p>
              <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                <Layers className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-slate-800 mt-1.5">{metrics.totalCases}</p>
            <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-emerald-600 font-bold">100%</span> VIONEX analyzed
            </div>
          </div>

          {/* LOW RISK */}
          <div
            id="metric-low-risk"
            className="bg-green-50 p-4 rounded-xl border border-green-100 shadow-xs hover:border-green-200 transition-all"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Low Risk</p>
              <div className="w-6 h-6 rounded-md bg-green-100 text-green-700 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-green-700 mt-1.5">{metrics.lowRisk}</p>
            <p className="text-[10px] text-green-600/80 mt-1">SVI 0–25 • Routine queue</p>
          </div>

          {/* MODERATE RISK */}
          <div
            id="metric-moderate-risk"
            className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 shadow-xs hover:border-yellow-200 transition-all"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-yellow-600 font-bold uppercase tracking-wider">Moderate</p>
              <div className="w-6 h-6 rounded-md bg-yellow-100 text-yellow-700 flex items-center justify-center">
                <AlertCircle className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-yellow-700 mt-1.5">{metrics.moderateRisk}</p>
            <p className="text-[10px] text-yellow-600/80 mt-1">SVI 26–50 • Standard review</p>
          </div>

          {/* HIGH RISK */}
          <div
            id="metric-high-risk"
            className="bg-orange-50 p-4 rounded-xl border border-orange-100 shadow-xs hover:border-orange-200 transition-all"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">High Risk</p>
              <div className="w-6 h-6 rounded-md bg-orange-100 text-orange-700 flex items-center justify-center">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-orange-700 mt-1.5">{metrics.highRisk}</p>
            <p className="text-[10px] text-orange-600/80 mt-1">SVI 51–75 • Priority action</p>
          </div>

          {/* CRITICAL RISK */}
          <div
            id="metric-critical-risk"
            className="bg-red-50 p-4 rounded-xl border border-red-100 shadow-xs border-l-4 border-l-red-500 hover:border-red-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-red-600 font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
                Critical
              </p>
              <div className="w-6 h-6 rounded-md bg-red-100 text-red-700 flex items-center justify-center">
                <ShieldAlert className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-red-700 mt-1.5">{metrics.criticalRisk}</p>
            <p className="text-[10px] font-semibold text-red-700 mt-1">SVI 76–100 • Immediate action</p>
          </div>
        </div>
      </div>

      {/* PRIORITY CASES TABLE (Geometric Balance Styling) */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
          <div>
            <h2 className="text-base font-bold text-slate-800 flex items-center">
              <span className="w-2 h-5 bg-blue-500 mr-2.5 rounded-full"></span>
              Priority Alerts &amp; Cases
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live incoming interactions triaged with real-time Multimodal Stress &amp; Vulnerability Index
            </p>
          </div>
          <button
            onClick={onNavigateToPriority}
            id="dash-view-all-priority-btn"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto hover:underline cursor-pointer"
          >
            <span>Open Dedicated Priority Filter</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table id="priority-cases-table" className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] uppercase text-slate-500 font-bold tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">SVI Score</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4">Key Indicators</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {priorityCasesTable.slice(0, 5).map((item) => {
                const isCritical = item.riskLevel === 'CRITICAL';
                return (
                  <tr
                    key={item.id}
                    id={`case-row-${item.conversationId}`}
                    className={`hover:bg-slate-50 transition-colors ${
                      isCritical ? 'bg-red-50/40' : ''
                    }`}
                  >
                    {/* Conversation ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800 flex items-center gap-2">
                      {isCritical && (
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" title="Immediate Priority" />
                      )}
                      <span>{item.conversationId}</span>
                    </td>

                    {/* Source */}
                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {item.sourceShort === '14566' && <PhoneCall className="w-3 h-3 text-sky-600" />}
                        {item.sourceShort === 'Portal' && <Globe className="w-3 h-3 text-blue-600" />}
                        {item.sourceShort === 'IVRS' && <PhoneCall className="w-3 h-3 text-indigo-600" />}
                        {item.sourceShort === 'Chatbot' && <Bot className="w-3 h-3 text-cyan-600" />}
                        {item.source}
                      </span>
                    </td>

                    {/* SVI */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-mono font-bold text-sm ${
                          item.sviScore >= 76
                            ? 'text-red-600'
                            : item.sviScore >= 51
                            ? 'text-orange-600'
                            : item.sviScore >= 26
                            ? 'text-yellow-600'
                            : 'text-green-600'
                        }`}
                      >
                        {item.sviScore}/100
                      </span>
                    </td>

                    {/* Risk Badge */}
                    <td className="py-3.5 px-4">
                      <RiskBadge level={item.riskLevel} size="sm" showIcon />
                    </td>

                    {/* Key Indicators */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {item.keyIndicators.map((ind, idx) => (
                          <span
                            key={idx}
                            className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                              isCritical
                                ? 'bg-red-100 text-red-800 font-semibold'
                                : item.riskLevel === 'HIGH'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {ind}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${
                          item.status === 'OPEN'
                            ? isCritical
                              ? 'bg-red-600 text-white'
                              : 'bg-amber-100 text-amber-800'
                            : item.status === 'ASSIGNED'
                            ? 'bg-blue-100 text-blue-800'
                            : item.status === 'IN PROGRESS'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onViewCase(item.conversationId)}
                        id={`btn-view-${item.conversationId}`}
                        className="text-blue-600 font-bold text-xs hover:underline cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>View Detail</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* NHAA INTEGRATION SECTION (Mandatory Concept Diagram) */}
      <div
        id="nhaa-integration-section"
        className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-800 flex items-center">
                <span className="w-2 h-5 bg-cyan-500 mr-2.5 rounded-full"></span>
                NHAA Ingestion &amp; Assessment Pipeline
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              End-to-end telemetry pipeline connecting 14566 citizen touchpoints to the VIONEX assessment engine
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold self-start sm:self-auto">
            SIH26093 Architecture
          </span>
        </div>

        {/* 5-Step Flow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {/* Step 1: NHAA Channels */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider mb-1">
                STEP 1 • INGESTION
              </div>
              <div className="text-sm font-bold text-slate-900 mb-2">NHAA CHANNELS</div>
              <ul className="text-xs text-slate-600 space-y-1 font-medium">
                <li className="flex items-center gap-1.5 text-slate-800 font-bold">
                  <PhoneCall className="w-3 h-3 text-sky-600" /> 14566 Call Helpline
                </li>
                <li>• Integrated Web Portal</li>
                <li>• AI Citizen Chatbot</li>
                <li>• Automated IVRS</li>
                <li>• Mobile App SOS</li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-400">
              Raw audio, text &amp; metadata stream
            </div>
          </div>

          {/* Step 2: VIONEX AI Engine */}
          <div className="p-4 rounded-lg bg-cyan-50/50 border border-cyan-200 flex flex-col justify-between relative">
            <div>
              <div className="text-[10px] font-extrabold text-cyan-800 uppercase tracking-wider mb-1">
                STEP 2 • ANALYSIS
              </div>
              <div className="text-sm font-bold text-slate-900 mb-2">VIONEX AI ENGINE</div>
              <ul className="text-xs text-slate-700 space-y-1 font-medium">
                <li>• Voice &amp; Speech Acoustics</li>
                <li>• Text &amp; Narrative NLP</li>
                <li>• Emotional Cues &amp; Affect</li>
                <li>• Conversation Context</li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-cyan-200 text-[11px] text-cyan-800 font-semibold">
              Multimodal Inference Node
            </div>
          </div>

          {/* Step 3: Assessment Output */}
          <div className="p-4 rounded-lg bg-blue-50/50 border border-blue-200 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-extrabold text-blue-800 uppercase tracking-wider mb-1">
                STEP 3 • SYNTHESIS
              </div>
              <div className="text-sm font-bold text-slate-900 mb-2">ASSESSMENT OUTPUT</div>
              <ul className="text-xs text-slate-700 space-y-1 font-medium">
                <li>• SVI Score (0–100)</li>
                <li>• Risk Level (4 Tiers)</li>
                <li>• Vulnerability Indicators</li>
                <li>• Prioritized Recommendations</li>
                <li>• High-Urgency Alerts</li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-blue-200 text-[11px] text-blue-800 font-semibold">
              Standardized JSON Payload
            </div>
          </div>

          {/* Step 4: VIONEX Web Portal */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                STEP 4 • PRESENTATION
              </div>
              <div className="text-sm font-bold text-slate-900 mb-2">VIONEX WEB PORTAL</div>
              <ul className="text-xs text-slate-600 space-y-1 font-medium">
                <li>• Real-Time Risk Dashboard</li>
                <li>• Priority Triage Feed</li>
                <li>• Multimodal Evidence Views</li>
                <li>• Officer Workflows</li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
              Secure Web Console
            </div>
          </div>

          {/* Step 5: Authorized Officer Review */}
          <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-200 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider mb-1">
                STEP 5 • DECISION
              </div>
              <div className="text-sm font-bold text-slate-900 mb-2">NHAA OFFICER / COUNSELLOR</div>
              <ul className="text-xs text-slate-700 space-y-1 font-medium">
                <li className="font-bold text-emerald-900">• Human Verification</li>
                <li>• Final Intervention Decision</li>
                <li>• Counsellor Assignment</li>
                <li>• Follow-Up &amp; Closure</li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-200 text-[11px] text-emerald-800 font-bold">
              Human-in-the-Loop Authority
            </div>
          </div>
        </div>

        {/* Prototype & Transparency Notice */}
        <div className="mt-5 p-4 rounded-lg bg-slate-100/80 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="leading-relaxed">
            <span className="font-bold text-slate-900">Prototype Integration Notice:</span>{' '}
            This demonstration platform models the complete ingestion and analytical schema for SIH26093.
            Data shown is simulated for demonstration; the modular service contracts are structured to directly bind to NHAA RESTful telemetry gateways upon production deployment.
          </div>
          <div className="flex items-center gap-1.5 shrink-0 text-slate-700 font-semibold text-xs">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>DPDP Act 2023 Compliant Masking</span>
          </div>
        </div>
      </div>
    </div>
  );
};
