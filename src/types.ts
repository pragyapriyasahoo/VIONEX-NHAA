export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export type CaseStatus = 'OPEN' | 'ASSIGNED' | 'IN PROGRESS' | 'RESOLVED';

export type NhaaSource = '14566 Call' | 'Integrated Portal' | 'Chatbot' | 'IVRS' | 'Mobile App';

export interface DetectedIndicator {
  id: string;
  name: string;
  category: 'Emotional' | 'Psychological' | 'Situational' | 'Safety';
  severity: 'Low' | 'Moderate' | 'High' | 'Critical';
  confidence: number; // e.g. 92%
  detectedIn: 'Voice' | 'Text' | 'Context' | 'Multimodal';
  flaggedKeywords?: string[];
  description: string;
}

export interface MultimodalAnalysis {
  voiceSpeech: {
    points: string[];
    confidence: number;
    pauseFrequency: string;
    speechRateVariance: string;
    pitchFluctuation: string;
  };
  textNarrative: {
    points: string[];
    confidence: number;
    distressKeywordCount: number;
    threatMentions: number;
  };
  emotionalCues: {
    points: string[];
    primaryEmotion: string;
    secondaryEmotion: string;
    emotionalInstability: string;
  };
  conversationContext: {
    points: string[];
    safetyConcernLevel: string;
    isolationFactor: string;
    reportedImmediateThreat: boolean;
  };
}

export interface RecommendedIntervention {
  id: string;
  type: 'Counselling Support' | 'Legal Aid' | 'Medical Assistance' | 'Protection / Police Support' | 'Emergency Assistance';
  priorityOrder: number;
  urgency: 'Immediate' | 'High' | 'Standard';
  description: string;
  department: string;
  recommendedAction: string;
}

export interface InterventionNote {
  id: string;
  author: string;
  officerRole: string;
  timestamp: string;
  content: string;
  actionTaken?: string;
}

export interface TranscriptTurn {
  id: string;
  speaker: 'Citizen (Complainant)' | 'NHAA Operator / IVR';
  timestamp: string;
  text: string;
  vocalStressLevel?: 'Normal' | 'Elevated' | 'High' | 'Critical';
  flaggedKeywords?: string[];
  aiFlag?: boolean;
}

export interface CaseRecord {
  id: string;
  conversationId: string;
  source: NhaaSource;
  sourceShort: string;
  timestamp: string;
  date: string;
  sviScore: number; // 0 - 100
  riskLevel: RiskLevel;
  keyIndicators: string[];
  status: CaseStatus;
  priorityFlag: boolean;
  callerAnonymizedId: string;
  locationState: string;
  callDuration?: string;
  language: string;
  summary: string;
  detectedIndicators: DetectedIndicator[];
  multimodalAnalysis: MultimodalAnalysis;
  recommendedInterventions: RecommendedIntervention[];
  transcript?: TranscriptTurn[];
  assignedTo?: string;
  assignedOfficerRole?: string;
  notes: InterventionNote[];
  lastUpdated: string;
}

export interface DashboardMetrics {
  totalCases: number;
  lowRisk: number;
  moderateRisk: number;
  highRisk: number;
  criticalRisk: number;
  openCases: number;
  assignedCases: number;
  inProgressCases: number;
  resolvedCases: number;
  avgSviScore: number;
  avgResponseTimeSeconds: number;
  escalatedToday: number;
}
