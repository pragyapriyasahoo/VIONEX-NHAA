import { CaseRecord, CaseStatus, DashboardMetrics, RiskLevel } from '../types';
import { INITIAL_METRICS, MOCK_CASES } from '../data/mockCases';

class CaseService {
  private cases: CaseRecord[] = [...MOCK_CASES];
  private metrics: DashboardMetrics = { ...INITIAL_METRICS };

  public getCases(): Promise<CaseRecord[]> {
    return Promise.resolve([...this.cases]);
  }

  public getCaseById(idOrConversationId: string): Promise<CaseRecord | undefined> {
    const found = this.cases.find(
      (c) => c.id === idOrConversationId || c.conversationId === idOrConversationId
    );
    return Promise.resolve(found ? { ...found } : undefined);
  }

  public getMetrics(): Promise<DashboardMetrics> {
    return Promise.resolve({ ...this.metrics });
  }

  public updateCaseStatus(id: string, newStatus: CaseStatus): Promise<CaseRecord | null> {
    const index = this.cases.findIndex((c) => c.id === id || c.conversationId === id);
    if (index === -1) return Promise.resolve(null);

    const updated = {
      ...this.cases[index],
      status: newStatus,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (Just now)',
      notes: [
        ...this.cases[index].notes,
        {
          id: 'note-' + Date.now(),
          author: 'Officer R. Sharma (Active User)',
          officerRole: 'Senior Assessment Officer',
          timestamp: new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          content: `Case status updated to "${newStatus}".`,
          actionTaken: `Status changed to ${newStatus}`,
        },
      ],
    };

    this.cases[index] = updated;
    this.recalculateMetrics();
    return Promise.resolve(updated);
  }

  public assignCounsellor(
    id: string,
    counsellorName: string,
    counsellorRole: string,
    notes?: string
  ): Promise<CaseRecord | null> {
    const index = this.cases.findIndex((c) => c.id === id || c.conversationId === id);
    if (index === -1) return Promise.resolve(null);

    const nowStr = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const updated = {
      ...this.cases[index],
      assignedTo: counsellorName,
      assignedOfficerRole: counsellorRole,
      status: 'ASSIGNED' as CaseStatus,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (Assigned)',
      notes: [
        ...this.cases[index].notes,
        {
          id: 'note-' + Date.now(),
          author: 'Officer R. Sharma',
          officerRole: 'Senior Assessment Officer',
          timestamp: nowStr,
          content: `Assigned case to ${counsellorName} (${counsellorRole}). ${notes ? 'Note: ' + notes : ''}`,
          actionTaken: `Assigned to ${counsellorName}`,
        },
      ],
    };

    this.cases[index] = updated;
    this.recalculateMetrics();
    return Promise.resolve(updated);
  }

  public escalateCase(id: string, reason: string, targetUnit: string): Promise<CaseRecord | null> {
    const index = this.cases.findIndex((c) => c.id === id || c.conversationId === id);
    if (index === -1) return Promise.resolve(null);

    const nowStr = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const updated = {
      ...this.cases[index],
      priorityFlag: true,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (Escalated)',
      notes: [
        ...this.cases[index].notes,
        {
          id: 'note-' + Date.now(),
          author: 'Officer R. Sharma',
          officerRole: 'Senior Assessment Officer',
          timestamp: nowStr,
          content: `CRITICAL ESCALATION: Transmitted priority alert to ${targetUnit}. Reason: ${reason}`,
          actionTaken: `Escalated to ${targetUnit}`,
        },
      ],
    };

    this.cases[index] = updated;
    this.recalculateMetrics();
    return Promise.resolve(updated);
  }

  public addInterventionNote(id: string, noteContent: string, actionTaken?: string): Promise<CaseRecord | null> {
    const index = this.cases.findIndex((c) => c.id === id || c.conversationId === id);
    if (index === -1) return Promise.resolve(null);

    const nowStr = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const updated = {
      ...this.cases[index],
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (Note added)',
      notes: [
        ...this.cases[index].notes,
        {
          id: 'note-' + Date.now(),
          author: 'Officer R. Sharma',
          officerRole: 'Senior Assessment Officer',
          timestamp: nowStr,
          content: noteContent,
          actionTaken,
        },
      ],
    };

    this.cases[index] = updated;
    return Promise.resolve(updated);
  }

  private recalculateMetrics() {
    let open = 0;
    let assigned = 0;
    let inProg = 0;
    let resolved = 0;

    this.cases.forEach((c) => {
      if (c.status === 'OPEN') open++;
      else if (c.status === 'ASSIGNED') assigned++;
      else if (c.status === 'IN PROGRESS') inProg++;
      else if (c.status === 'RESOLVED') resolved++;
    });

    // Update internal metrics dynamically
    this.metrics = {
      ...this.metrics,
      openCases: 38 + (open - 3),
      assignedCases: 84 + (assigned - 1),
      inProgressCases: 72 + (inProg - 2),
      resolvedCases: 54 + (resolved - 2),
    };
  }
}

export const caseService = new CaseService();
