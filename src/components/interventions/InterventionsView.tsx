import React, { useState, useMemo } from 'react';
import { CaseRecord, CaseStatus } from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import {
  HandHeart,
  Search,
  Filter,
  Eye,
  UserCheck,
  Shield,
  FileText,
  HeartPulse,
  AlertOctagon,
  CheckCircle2,
} from 'lucide-react';

interface InterventionsViewProps {
  cases: CaseRecord[];
  onViewCase: (conversationId: string) => void;
  onOpenAssignModalForCase: (caseRecord: CaseRecord) => void;
}

export const InterventionsView: React.FC<InterventionsViewProps> = ({
  cases,
  onViewCase,
  onOpenAssignModalForCase,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [supportFilter, setSupportFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Format recommended support string for display
  const getRecommendedSupportText = (c: CaseRecord) => {
    if (c.conversationId === 'NHAA-VX-004821') return 'Protection + Counselling';
    if (c.conversationId === 'NHAA-VX-004817') return 'Counselling + Legal Aid';
    if (c.conversationId === 'NHAA-VX-004813') return 'Counselling Support';
    if (c.conversationId === 'NHAA-VX-004820') return 'Emergency Assistance + Medical';
    if (c.conversationId === 'NHAA-VX-004816') return 'Protection + Counselling';
    if (c.conversationId === 'NHAA-VX-004811') return 'Legal Aid Support';
    return c.recommendedInterventions.map((r) => r.type.replace(' Support', '')).slice(0, 2).join(' + ');
  };

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const supportText = getRecommendedSupportText(c);

      if (supportFilter !== 'ALL') {
        if (!supportText.toLowerCase().includes(supportFilter.toLowerCase())) return false;
      }

      if (statusFilter !== 'ALL') {
        if (c.status !== statusFilter) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = c.conversationId.toLowerCase().includes(q);
        const matchAssigned = (c.assignedTo || '').toLowerCase().includes(q);
        const matchSupport = supportText.toLowerCase().includes(q);
        if (!matchId && !matchAssigned && !matchSupport) return false;
      }

      return true;
    });
  }, [cases, supportFilter, statusFilter, searchQuery]);

  return (
    <div id="interventions-view" className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HandHeart className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-blue-700 tracking-wider uppercase">
                Officer Action Desk
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
              <span className="w-2 h-6 bg-blue-500 mr-2.5 rounded-full"></span>
              Interventions &amp; Case Support
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Consolidated registry of AI-recommended support options, officer assignments, and resolution status
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              Total Active Interventions: <strong className="text-slate-900">{cases.length}</strong>
            </span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversation ID, officer name, or intervention type..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-slate-500">Support Type:</span>
            <select
              value={supportFilter}
              onChange={(e) => setSupportFilter(e.target.value)}
              className="text-xs border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Support Types</option>
              <option value="Protection">Protection / Police</option>
              <option value="Counselling">Counselling Support</option>
              <option value="Legal Aid">Legal Aid</option>
              <option value="Emergency">Emergency Assistance</option>
              <option value="Medical">Medical Assistance</option>
            </select>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="OPEN">Open (Pending)</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="IN PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table id="interventions-table" className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Conversation ID</th>
                <th className="py-3 px-4">Risk</th>
                <th className="py-3 px-4">Recommended Support</th>
                <th className="py-3 px-4">Assigned To</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {filteredCases.map((item) => {
                const supportText = getRecommendedSupportText(item);
                const isCritical = item.riskLevel === 'CRITICAL';

                return (
                  <tr
                    key={item.id}
                    id={`intervention-row-${item.conversationId}`}
                    className={`hover:bg-slate-50 transition-colors ${
                      isCritical ? 'bg-red-50/20' : ''
                    }`}
                  >
                    {/* Conversation ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        {isCritical && (
                          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                        )}
                        <span>{item.conversationId}</span>
                      </div>
                      <div className="text-[11px] font-sans font-normal text-slate-400">
                        {item.source}
                      </div>
                    </td>

                    {/* Risk */}
                    <td className="py-3.5 px-4">
                      <RiskBadge level={item.riskLevel} size="sm" showIcon />
                    </td>

                    {/* Recommended Support */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{supportText}</div>
                      <div className="text-[11px] text-slate-400">
                        {item.recommendedInterventions[0]?.department || 'NHAA Intervention Cell'}
                      </div>
                    </td>

                    {/* Assigned To */}
                    <td className="py-3.5 px-4">
                      {item.assignedTo && item.assignedTo !== 'Unassigned' ? (
                        <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                          <UserCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{item.assignedTo}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => onOpenAssignModalForCase(item)}
                          className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <span>+ Assign Officer</span>
                        </button>
                      )}
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
                        {item.status === 'OPEN' && isCritical ? 'Priority' : item.status}
                      </span>
                    </td>

                    {/* Last Updated */}
                    <td className="py-3.5 px-4 text-[11px] text-slate-500 font-mono">
                      {item.lastUpdated}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onViewCase(item.conversationId)}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold flex items-center gap-1 shadow-2xs"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
