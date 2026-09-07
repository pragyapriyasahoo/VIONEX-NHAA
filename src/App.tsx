import React, { useState, useEffect } from 'react';
import { CaseRecord, CaseStatus, DashboardMetrics } from './types';
import { caseService } from './services/caseService';
import { Header } from './components/layout/Header';
import { Sidebar, PageId } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { PriorityCasesView } from './components/priority/PriorityCasesView';
import { CaseAssessmentView } from './components/assessment/CaseAssessmentView';
import { InterventionsView } from './components/interventions/InterventionsView';
import { ReportsView } from './components/reports/ReportsView';
import { SettingsView } from './components/settings/SettingsView';
import {
  AssignCounsellorModal,
  EscalateCaseModal,
  AddNoteModal,
} from './components/modals/ActionModals';
import { CheckCircle2, AlertCircle, ShieldAlert } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('NHAA-VX-004821');

  // Modals state
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [escalateModalOpen, setEscalateModalOpen] = useState(false);
  const [addNoteModalOpen, setAddNoteModalOpen] = useState(false);
  const [modalTargetCase, setModalTargetCase] = useState<CaseRecord | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: 'success' | 'alert' | 'info';
  } | null>(null);

  const showToast = (text: string, type: 'success' | 'alert' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Load initial cases and metrics
  useEffect(() => {
    async function loadData() {
      const allCases = await caseService.getCases();
      const summaryMetrics = await caseService.getMetrics();
      setCases(allCases);
      setMetrics(summaryMetrics);
    }
    loadData();
  }, []);

  // Find currently selected case for assessment view
  const currentCase = cases.find(
    (c) => c.conversationId === selectedCaseId || c.id === selectedCaseId
  ) || cases[0];

  // Navigation handlers
  const handleViewCase = (conversationId: string) => {
    setSelectedCaseId(conversationId);
    setActivePage('case-assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Action handlers
  const handleStatusUpdate = async (newStatus: CaseStatus) => {
    if (!currentCase) return;
    const updated = await caseService.updateCaseStatus(currentCase.conversationId, newStatus);
    if (updated) {
      setCases((prev) =>
        prev.map((c) => (c.conversationId === updated.conversationId ? updated : c))
      );
      const newMetrics = await caseService.getMetrics();
      setMetrics(newMetrics);
      showToast(`Case ${updated.conversationId} status updated to ${newStatus}`, 'info');
    }
  };

  const handleConfirmAssign = async (counsellorName: string, role: string, notes: string) => {
    const target = modalTargetCase || currentCase;
    if (!target) return;
    const updated = await caseService.assignCounsellor(
      target.conversationId,
      counsellorName,
      role,
      notes
    );
    if (updated) {
      setCases((prev) =>
        prev.map((c) => (c.conversationId === updated.conversationId ? updated : c))
      );
      const newMetrics = await caseService.getMetrics();
      setMetrics(newMetrics);
      showToast(`Assigned ${target.conversationId} to ${counsellorName}`, 'success');
    }
  };

  const handleConfirmEscalate = async (reason: string, targetUnit: string) => {
    const target = modalTargetCase || currentCase;
    if (!target) return;
    const updated = await caseService.escalateCase(target.conversationId, reason, targetUnit);
    if (updated) {
      setCases((prev) =>
        prev.map((c) => (c.conversationId === updated.conversationId ? updated : c))
      );
      const newMetrics = await caseService.getMetrics();
      setMetrics(newMetrics);
      showToast(`CRITICAL: Case ${target.conversationId} escalated to ${targetUnit}`, 'alert');
    }
  };

  const handleConfirmAddNote = async (content: string, actionTaken: string) => {
    const target = modalTargetCase || currentCase;
    if (!target) return;
    const updated = await caseService.addInterventionNote(target.conversationId, content, actionTaken);
    if (updated) {
      setCases((prev) =>
        prev.map((c) => (c.conversationId === updated.conversationId ? updated : c))
      );
      showToast(`Intervention note logged for ${target.conversationId}`, 'success');
    }
  };

  if (!metrics || cases.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-bold text-slate-700">Initialising VIONEX × NHAA Portal...</p>
          <p className="text-xs text-slate-400">Loading AI assessment models &amp; helpline telemetry</p>
        </div>
      </div>
    );
  }

  const criticalCount = cases.filter((c) => c.riskLevel === 'CRITICAL').length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans flex flex-row overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      {/* Left Sidebar (Full Height Dark #0F172A) */}
      <Sidebar
        activePage={activePage}
        onSelectPage={(page) => setActivePage(page)}
        criticalCount={criticalCount}
        selectedCaseId={selectedCaseId}
      />

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        {/* Geometric Balance Top Header */}
        <Header
          activePage={activePage}
          criticalCasesCount={criticalCount}
          onNavigateToPriority={() => setActivePage('priority-cases')}
        />

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-7xl w-full mx-auto">
          {activePage === 'dashboard' && (
            <DashboardView
              metrics={metrics}
              cases={cases}
              onViewCase={handleViewCase}
              onNavigateToPriority={() => setActivePage('priority-cases')}
              onNavigateToReports={() => setActivePage('reports')}
            />
          )}

          {activePage === 'priority-cases' && (
            <PriorityCasesView cases={cases} onViewCase={handleViewCase} />
          )}

          {activePage === 'case-assessment' && currentCase && (
            <CaseAssessmentView
              caseRecord={currentCase}
              allCases={cases}
              onSelectCase={(id) => setSelectedCaseId(id)}
              onOpenAssignModal={() => {
                setModalTargetCase(currentCase);
                setAssignModalOpen(true);
              }}
              onOpenEscalateModal={() => {
                setModalTargetCase(currentCase);
                setEscalateModalOpen(true);
              }}
              onOpenAddNoteModal={() => {
                setModalTargetCase(currentCase);
                setAddNoteModalOpen(true);
              }}
              onUpdateStatus={handleStatusUpdate}
            />
          )}

          {activePage === 'interventions' && (
            <InterventionsView
              cases={cases}
              onViewCase={handleViewCase}
              onOpenAssignModalForCase={(c) => {
                setModalTargetCase(c);
                setAssignModalOpen(true);
              }}
            />
          )}

          {activePage === 'reports' && (
            <ReportsView metrics={metrics} cases={cases} />
          )}

          {activePage === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Action Modals */}
      {modalTargetCase && (
        <>
          <AssignCounsellorModal
            isOpen={assignModalOpen}
            onClose={() => setAssignModalOpen(false)}
            caseRecord={modalTargetCase}
            onConfirm={handleConfirmAssign}
          />

          <EscalateCaseModal
            isOpen={escalateModalOpen}
            onClose={() => setEscalateModalOpen(false)}
            caseRecord={modalTargetCase}
            onConfirm={handleConfirmEscalate}
          />

          <AddNoteModal
            isOpen={addNoteModalOpen}
            onClose={() => setAddNoteModalOpen(false)}
            caseRecord={modalTargetCase}
            onConfirm={handleConfirmAddNote}
          />
        </>
      )}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
          <div
            className={`px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold flex items-center gap-2.5 ${
              toastMessage.type === 'alert'
                ? 'bg-red-600 text-white border-red-700'
                : toastMessage.type === 'info'
                ? 'bg-blue-600 text-white border-blue-700'
                : 'bg-emerald-600 text-white border-emerald-700'
            }`}
          >
            {toastMessage.type === 'alert' ? (
              <ShieldAlert className="w-4 h-4 shrink-0" />
            ) : toastMessage.type === 'info' ? (
              <AlertCircle className="w-4 h-4 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}
    </div>
  );
}
