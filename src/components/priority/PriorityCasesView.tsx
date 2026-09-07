import React, { useState, useMemo } from 'react';
import { CaseRecord, RiskLevel, NhaaSource, CaseStatus } from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import {
  ShieldAlert,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Calendar,
  PhoneCall,
  Globe,
  Bot,
  Layers,
  ArrowUpDown,
  Clock,
  MapPin,
} from 'lucide-react';

interface PriorityCasesViewProps {
  cases: CaseRecord[];
  onViewCase: (conversationId: string) => void;
}

export const PriorityCasesView: React.FC<PriorityCasesViewProps> = ({ cases, onViewCase }) => {
  // Tabs required: All, High, Critical
  const [activeTab, setActiveTab] = useState<'ALL' | 'HIGH' | 'CRITICAL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table');

  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      // Tab filter:
      if (activeTab === 'CRITICAL' && item.riskLevel !== 'CRITICAL') return false;
      if (activeTab === 'HIGH' && item.riskLevel !== 'HIGH') return false;

      // Source filter:
      if (sourceFilter !== 'ALL' && item.source !== sourceFilter) return false;

      // Status filter:
      if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;

      // Search query filter:
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = item.conversationId.toLowerCase().includes(q);
        const matchSummary = item.summary.toLowerCase().includes(q);
        const matchIndicators = item.keyIndicators.some((k) => k.toLowerCase().includes(q));
        const matchState = item.locationState.toLowerCase().includes(q);
        if (!matchId && !matchSummary && !matchIndicators && !matchState) return false;
      }

      return true;
    });
  }, [cases, activeTab, sourceFilter, statusFilter, searchQuery]);

  const criticalCount = cases.filter((c) => c.riskLevel === 'CRITICAL').length;
  const highCount = cases.filter((c) => c.riskLevel === 'HIGH').length;

  return (
    <div id="priority-cases-view" className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
              <span className="text-xs font-bold text-red-700 tracking-wider uppercase">
                High Priority Queue
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
              <span className="w-2 h-6 bg-red-500 mr-2.5 rounded-full"></span>
              Triage &amp; Priority Cases
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Filtered triage monitor for interactions with elevated Stress &amp; Vulnerability Index (SVI &gt; 50)
            </p>
          </div>

          {/* Quick Metrics Pill */}
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <span>{criticalCount} Critical Cases</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <span>{highCount} High Risk</span>
            </div>
          </div>
        </div>

        {/* Tabs required: All, High, Critical */}
        <div className="flex items-center gap-2 mt-6 border-b border-slate-200 pb-0">
          <button
            onClick={() => setActiveTab('ALL')}
            id="tab-priority-all"
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'ALL'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>All Priority Cases</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 text-slate-600">
              {cases.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('CRITICAL')}
            id="tab-priority-critical"
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'CRITICAL'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <span>Critical Only</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-100 text-red-700 font-extrabold">
              {criticalCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('HIGH')}
            id="tab-priority-high"
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'HIGH'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span>High Risk Only</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-orange-100 text-orange-700 font-extrabold">
              {highCount}
            </span>
          </button>
        </div>

        {/* Filters Bar: Search, Source, Status, Date */}
        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversation ID, keywords (fear, intimidation), or state..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Source Filter */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs font-semibold text-slate-500">Source:</span>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="text-xs border border-slate-300 rounded-lg px-2.5 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Sources</option>
              <option value="14566 Call">14566 Call</option>
              <option value="Integrated Portal">Integrated Portal</option>
              <option value="IVRS">IVRS</option>
              <option value="Chatbot">Chatbot</option>
              <option value="Mobile App">Mobile App</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs font-semibold text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-slate-300 rounded-lg px-2.5 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="OPEN">Open (Pending Triage)</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="IN PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="hidden md:flex items-center border border-slate-300 rounded-lg p-0.5 bg-slate-100">
            <button
              onClick={() => setViewMode('table')}
              className={`px-2 py-1 text-xs font-semibold rounded ${
                viewMode === 'table' ? 'bg-white shadow-2xs text-slate-900' : 'text-slate-500'
              }`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-2 py-1 text-xs font-semibold rounded ${
                viewMode === 'cards' ? 'bg-white shadow-2xs text-slate-900' : 'text-slate-500'
              }`}
            >
              Cards
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Table or Cards View */}
      {filteredCases.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-xs">
          <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No cases match your filter criteria</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms, changing the source filter, or selecting another tab.
          </p>
          <button
            onClick={() => {
              setActiveTab('ALL');
              setSearchQuery('');
              setSourceFilter('ALL');
              setStatusFilter('ALL');
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'table' ? (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Priority &amp; ID</th>
                  <th className="py-3 px-4">Source Channel</th>
                  <th className="py-3 px-4">SVI Score</th>
                  <th className="py-3 px-4">Risk Level</th>
                  <th className="py-3 px-4">Key Detected Indicators</th>
                  <th className="py-3 px-4">Assigned To</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {filteredCases.map((c) => {
                  const isCritical = c.riskLevel === 'CRITICAL';
                  const isHigh = c.riskLevel === 'HIGH';

                  return (
                    <tr
                      key={c.id}
                      className={`hover:bg-slate-50/90 transition-colors ${
                        isCritical
                          ? 'border-l-4 border-l-red-600 bg-red-50/20'
                          : isHigh
                          ? 'border-l-4 border-l-orange-500 bg-orange-50/10'
                          : ''
                      }`}
                    >
                      {/* Priority indicator & Conversation ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          {isCritical && (
                            <span
                              className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-red-600 text-white"
                              title="Red Priority Indicator - Immediate Action"
                            >
                              CRITICAL
                            </span>
                          )}
                          {isHigh && (
                            <span
                              className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-orange-500 text-white"
                              title="Orange Priority Indicator - High Risk"
                            >
                              HIGH
                            </span>
                          )}
                          <span className="text-xs">{c.conversationId}</span>
                        </div>
                        <div className="text-[11px] font-sans font-normal text-slate-400 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{c.locationState}</span>
                          <span>•</span>
                          <span>{c.date}</span>
                        </div>
                      </td>

                      {/* Source */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                          {c.source}
                        </span>
                      </td>

                      {/* SVI */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 rounded-md flex items-center justify-center font-mono font-black text-xs ${
                              isCritical
                                ? 'bg-red-100 text-red-700'
                                : isHigh
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {c.sviScore}
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">/ 100</span>
                        </div>
                      </td>

                      {/* Risk */}
                      <td className="py-3.5 px-4">
                        <RiskBadge level={c.riskLevel} size="sm" showIcon />
                      </td>

                      {/* Key Indicators */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {c.keyIndicators.map((ind, idx) => (
                            <span
                              key={idx}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                isCritical
                                  ? 'bg-red-100 text-red-800'
                                  : isHigh
                                  ? 'bg-orange-100 text-orange-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {ind}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Assigned To */}
                      <td className="py-3.5 px-4 text-[11px] text-slate-600">
                        {c.assignedTo || (
                          <span className="text-slate-400 italic">Unassigned</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            c.status === 'OPEN'
                              ? isCritical
                                ? 'bg-red-600 text-white'
                                : 'bg-amber-100 text-amber-800'
                              : c.status === 'ASSIGNED'
                              ? 'bg-blue-100 text-blue-800'
                              : c.status === 'IN PROGRESS'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onViewCase(c.conversationId)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-2xs transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Assessment</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCases.map((c) => {
            const isCritical = c.riskLevel === 'CRITICAL';
            const isHigh = c.riskLevel === 'HIGH';

            return (
              <div
                key={c.id}
                className={`bg-white border rounded-xl p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between ${
                  isCritical
                    ? 'border-red-300 ring-1 ring-red-200'
                    : isHigh
                    ? 'border-orange-300 ring-1 ring-orange-200'
                    : 'border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {c.conversationId}
                    </span>
                    <RiskBadge level={c.riskLevel} size="sm" showIcon />
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {c.summary}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {c.keyIndicators.map((k, i) => (
                      <span
                        key={i}
                        className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                          isCritical
                            ? 'bg-red-50 text-red-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-400">SVI: </span>
                    <span className="font-mono font-bold text-slate-900">{c.sviScore}/100</span>
                  </div>
                  <button
                    onClick={() => onViewCase(c.conversationId)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
