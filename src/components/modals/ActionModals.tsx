import React, { useState } from 'react';
import { X, UserCheck, AlertTriangle, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
import { CaseRecord } from '../../types';

interface AssignCounsellorModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseRecord: CaseRecord;
  onConfirm: (counsellorName: string, role: string, notes: string) => void;
}

export const AssignCounsellorModal: React.FC<AssignCounsellorModalProps> = ({
  isOpen,
  onClose,
  caseRecord,
  onConfirm,
}) => {
  const [selectedCounsellor, setSelectedCounsellor] = useState('Priya Nair (Senior Trauma Psychologist)');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const counsellors = [
    { name: 'Priya Nair', role: 'Senior Trauma Psychologist', available: true, cases: 4 },
    { name: 'Dr. A. Sengupta', role: 'Chief Crisis Intervention Officer', available: true, cases: 2 },
    { name: 'R. K. Meena', role: 'Family & Domestic Violence Counsellor', available: true, cases: 5 },
    { name: 'Adv. S. Ramanathan', role: 'Legal & Protection Advisor', available: true, cases: 3 },
  ];

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    const counsellor = counsellors.find((c) => `${c.name} (${c.role})` === selectedCounsellor) || counsellors[0];
    onConfirm(counsellor.name, counsellor.role, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">Assign NHAA Counsellor</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleAssign} className="p-6 space-y-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
            <span className="font-bold">Case: {caseRecord.conversationId}</span> • SVI Score:{' '}
            <span className="font-bold text-red-700">{caseRecord.sviScore}/100</span> ({caseRecord.riskLevel})
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Authorized Officer / Counsellor
            </label>
            <select
              value={selectedCounsellor}
              onChange={(e) => setSelectedCounsellor(e.target.value)}
              className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {counsellors.map((c) => (
                <option key={c.name} value={`${c.name} (${c.role})`}>
                  {c.name} — {c.role} (Active: {c.cases} cases)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Triage / Intervention Instructions
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., High acute trauma detected. Please initiate tele-counselling and assess urgent protection status within 30 minutes."
              className="w-full text-sm border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
            >
              Confirm Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface EscalateCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseRecord: CaseRecord;
  onConfirm: (reason: string, targetUnit: string) => void;
}

export const EscalateCaseModal: React.FC<EscalateCaseModalProps> = ({
  isOpen,
  onClose,
  caseRecord,
  onConfirm,
}) => {
  const [targetUnit, setTargetUnit] = useState('PCR 112 / Police Rapid Response');
  const [reason, setReason] = useState(
    'SVI Score indicates acute immediate threat with direct coercion markers and trapped victim.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(reason, targetUnit);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-200 bg-red-50">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            <h3 className="text-base font-bold text-red-950">Immediate Case Escalation</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3 bg-red-50/70 border border-red-200 rounded-lg text-xs text-red-900">
            <span className="font-bold">URGENT PROTOCOL:</span> Escalating this case will broadcast a high-priority
            alert to the emergency dispatch desk and log an immediate action in the NHAA Incident Ledger.
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Escalation Destination Unit
            </label>
            <select
              value={targetUnit}
              onChange={(e) => setTargetUnit(e.target.value)}
              className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="PCR 112 / Police Rapid Response">PCR 112 / Police Rapid Response</option>
              <option value="District Magistrate & Protection Officer">District Magistrate &amp; Protection Officer</option>
              <option value="Emergency Medical Standby (Ambulance 108)">Emergency Medical Standby (Ambulance 108)</option>
              <option value="One-Stop Crisis Center (OSC/Sakhi)">One-Stop Crisis Center (OSC / Sakhi)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Escalation Justification (Officer Log)
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full text-sm border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              Dispatch Emergency Escalation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseRecord: CaseRecord;
  onConfirm: (content: string, actionTaken: string) => void;
}

export const AddNoteModal: React.FC<AddNoteModalProps> = ({ isOpen, onClose, caseRecord, onConfirm }) => {
  const [content, setContent] = useState('');
  const [actionTaken, setActionTaken] = useState('Officer verification conducted');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onConfirm(content, actionTaken);
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">Add Officer Intervention Note</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-700">
            Case: <span className="font-bold">{caseRecord.conversationId}</span> • Logged by{' '}
            <span className="font-bold text-slate-900">Officer R. Sharma</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Action Classification
            </label>
            <select
              value={actionTaken}
              onChange={(e) => setActionTaken(e.target.value)}
              className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Officer verification conducted">Officer verification conducted</option>
              <option value="Direct callback initiated">Direct callback initiated</option>
              <option value="Coordination with local DLSA">Coordination with local DLSA</option>
              <option value="Temporary shelter advisory provided">Temporary shelter advisory provided</option>
              <option value="Follow-up scheduled">Follow-up scheduled</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Intervention / Clinical Observation Note
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Record direct observations, complainant physical state, verified threats, or specific instructions for subsequent shift officers..."
              className="w-full text-sm border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
            >
              Save Note to Case
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
