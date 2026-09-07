import React, { useState } from 'react';
import { CaseRecord, CaseStatus } from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import { SviScoreVisual } from '../common/SviScoreVisual';
import {
  ShieldAlert,
  AlertTriangle,
  AlertOctagon,
  HeartCrack,
  UserX,
  Skull,
  Shield,
  PhoneCall,
  Mic,
  FileText,
  Smile,
  MessageSquare,
  UserCheck,
  Share2,
  PlusCircle,
  Clock,
  MapPin,
  Sparkles,
  ChevronDown,
  Info,
  CheckCircle2,
  Volume2,
  Play,
  Pause,
  AlertCircle,
} from 'lucide-react';

interface CaseAssessmentViewProps {
  caseRecord: CaseRecord;
  allCases: CaseRecord[];
  onSelectCase: (conversationId: string) => void;
  onOpenAssignModal: () => void;
  onOpenEscalateModal: () => void;
  onOpenAddNoteModal: () => void;
  onUpdateStatus: (newStatus: CaseStatus) => void;
}

export const CaseAssessmentView: React.FC<CaseAssessmentViewProps> = ({
  caseRecord,
  allCases,
  onSelectCase,
  onOpenAssignModal,
  onOpenEscalateModal,
  onOpenAddNoteModal,
  onUpdateStatus,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Indicator icons lookup helper
  const getIndicatorIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'fear / anxiety':
      case 'anxiety':
        return AlertCircle;
      case 'trauma / distress':
      case 'distress':
        return HeartCrack;
      case 'intimidation':
        return ShieldAlert;
      case 'social isolation':
        return UserX;
      case 'suicidal ideation':
        return Skull;
      case 'extreme vulnerability':
      default:
        return AlertTriangle;
    }
  };

  const isCritical = caseRecord.riskLevel === 'CRITICAL';

  return (
    <div id="case-assessment-view" className="space-y-8 animate-fadeIn">
      {/* Top Header Card: Case Metadata & Case Switcher */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                isCritical ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-blue-50 text-blue-600 border border-blue-200'
              }`}
            >
              {caseRecord.sourceShort === '14566' ? (
                <PhoneCall className="w-6 h-6" />
              ) : (
                <MessageSquare className="w-6 h-6" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-mono text-xl font-black text-slate-900 tracking-tight">
                  {caseRecord.conversationId}
                </span>
                <RiskBadge level={caseRecord.riskLevel} size="md" showIcon showIndicatorDot />
                {caseRecord.priorityFlag && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-red-600 text-white uppercase tracking-wider">
                    High Priority Queue
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 mt-1 flex-wrap">
                <span className="font-medium">
                  Source: <strong className="text-slate-800">{caseRecord.source}</strong>
                </span>
                <span>•</span>
                <span>
                  Timestamp: <strong className="text-slate-800">{caseRecord.timestamp}</strong>
                </span>
                <span>•</span>
                <span>
                  Location: <strong className="text-slate-800">{caseRecord.locationState}</strong>
                </span>
                {caseRecord.callDuration && (
                  <>
                    <span>•</span>
                    <span>
                      Duration: <strong className="text-slate-800">{caseRecord.callDuration}</strong>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick Case Switcher for SIH evaluation */}
          <div className="flex items-center gap-2 self-start lg:self-auto bg-slate-50 p-2 rounded-lg border border-slate-200">
            <span className="text-xs font-semibold text-slate-600">Switch Demo Case:</span>
            <select
              value={caseRecord.conversationId}
              onChange={(e) => onSelectCase(e.target.value)}
              className="text-xs font-mono font-bold bg-white border border-slate-300 rounded px-2 py-1 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {allCases.map((c) => (
                <option key={c.conversationId} value={c.conversationId}>
                  {c.conversationId} ({c.riskLevel} - {c.sviScore}/100)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Narrative Summary */}
        <div className="mt-4 text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
          <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block mb-1">
            Interaction Abstract / Incident Briefing
          </span>
          {caseRecord.summary}
        </div>
      </div>

      {/* SVI SCORE VISUAL (Large required component) */}
      <div>
        <SviScoreVisual score={caseRecord.sviScore} riskLevel={caseRecord.riskLevel} />
      </div>

      {/* DETECTED INDICATORS (6 specific indicators required by prompt) */}
      <div id="detected-indicators-section">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-sky-600" />
              DETECTED INDICATORS
            </h2>
            <p className="text-xs text-slate-500">
              VIONEX algorithmic detection flags across trauma, intimidation, and acute distress vectors
            </p>
          </div>
          <span className="text-xs font-medium text-slate-500">
            {caseRecord.detectedIndicators.length} vectors identified
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {caseRecord.detectedIndicators.map((ind) => {
            const IconComponent = getIndicatorIcon(ind.name);
            const isHighOrCrit = ind.severity === 'Critical' || ind.severity === 'High';

            return (
              <div
                key={ind.id}
                id={`indicator-card-${ind.id}`}
                className={`bg-white border rounded-xl p-4 shadow-xs flex flex-col justify-between transition-all ${
                  ind.severity === 'Critical'
                    ? 'border-red-200 bg-red-50/20'
                    : ind.severity === 'High'
                    ? 'border-orange-200 bg-orange-50/15'
                    : 'border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-md flex items-center justify-center ${
                          ind.severity === 'Critical'
                            ? 'bg-red-100 text-red-700'
                            : ind.severity === 'High'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-slate-900">{ind.name}</span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        ind.severity === 'Critical'
                          ? 'bg-red-100 text-red-800'
                          : ind.severity === 'High'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {ind.severity}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {ind.description}
                  </p>

                  {/* Flagged keywords if present */}
                  {ind.flaggedKeywords && ind.flaggedKeywords.length > 0 && (
                    <div className="mb-3">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Flagged Lexemes / Acoustic Tokens
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {ind.flaggedKeywords.map((kw, i) => (
                          <span
                            key={i}
                            className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-white border border-slate-200 text-slate-700"
                          >
                            &ldquo;{kw}&rdquo;
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Detected via {ind.detectedIn}</span>
                  <span className="font-bold text-slate-800">{ind.confidence}% Confidence</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MULTIMODAL ANALYSIS (4 cards requested: Voice & Speech, Text/Narrative, Emotional Cues, Conversation Context) */}
      <div id="multimodal-analysis-section">
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">
              MULTIMODAL ANALYSIS
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Algorithmic reasoning explaining <strong className="text-slate-800">WHY</strong> the AI assessment produced this risk score
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: VOICE & SPEECH */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-blue-600" />
                  VOICE &amp; SPEECH
                </span>
                {caseRecord.multimodalAnalysis.voiceSpeech.confidence > 0 && (
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {caseRecord.multimodalAnalysis.voiceSpeech.confidence}% Conf.
                  </span>
                )}
              </div>

              <ul className="space-y-2 text-xs text-slate-600">
                {caseRecord.multimodalAnalysis.voiceSpeech.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold shrink-0">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {caseRecord.multimodalAnalysis.voiceSpeech.pauseFrequency !== 'N/A' && (
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1 bg-slate-50 p-2.5 rounded">
                <div>
                  <span className="text-slate-400">Pause Cadence:</span>{' '}
                  <strong className="text-slate-700">
                    {caseRecord.multimodalAnalysis.voiceSpeech.pauseFrequency}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400">Variance:</span>{' '}
                  <strong className="text-slate-700">
                    {caseRecord.multimodalAnalysis.voiceSpeech.speechRateVariance}
                  </strong>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: TEXT / NARRATIVE */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                  TEXT / NARRATIVE
                </span>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {caseRecord.multimodalAnalysis.textNarrative.confidence}% Conf.
                </span>
              </div>

              <ul className="space-y-2 text-xs text-slate-600">
                {caseRecord.multimodalAnalysis.textNarrative.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-indigo-600 font-bold shrink-0">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1 bg-slate-50 p-2.5 rounded">
              <div>
                <span className="text-slate-400">Distress Terms:</span>{' '}
                <strong className="text-slate-700">
                  {caseRecord.multimodalAnalysis.textNarrative.distressKeywordCount} instances
                </strong>
              </div>
              <div>
                <span className="text-slate-400">Threat Mentions:</span>{' '}
                <strong className="text-red-700">
                  {caseRecord.multimodalAnalysis.textNarrative.threatMentions} explicit
                </strong>
              </div>
            </div>
          </div>

          {/* Card 3: EMOTIONAL CUES */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Smile className="w-3.5 h-3.5 text-amber-600" />
                  EMOTIONAL CUES
                </span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  Affect Engine
                </span>
              </div>

              <ul className="space-y-2 text-xs text-slate-600">
                {caseRecord.multimodalAnalysis.emotionalCues.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold shrink-0">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1 bg-slate-50 p-2.5 rounded">
              <div>
                <span className="text-slate-400">Primary Emotion:</span>{' '}
                <strong className="text-slate-800">
                  {caseRecord.multimodalAnalysis.emotionalCues.primaryEmotion}
                </strong>
              </div>
              <div>
                <span className="text-slate-400">Affect State:</span>{' '}
                <strong className="text-slate-800">
                  {caseRecord.multimodalAnalysis.emotionalCues.emotionalInstability}
                </strong>
              </div>
            </div>
          </div>

          {/* Card 4: CONVERSATION CONTEXT */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-red-600" />
                  CONVERSATION CONTEXT
                </span>
                <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                  Safety Triage
                </span>
              </div>

              <ul className="space-y-2 text-xs text-slate-600">
                {caseRecord.multimodalAnalysis.conversationContext.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-red-600 font-bold shrink-0">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1 bg-slate-50 p-2.5 rounded">
              <div>
                <span className="text-slate-400">Safety Level:</span>{' '}
                <strong className="text-red-700 font-semibold">
                  {caseRecord.multimodalAnalysis.conversationContext.safetyConcernLevel}
                </strong>
              </div>
              <div>
                <span className="text-slate-400">Immediate Threat:</span>{' '}
                <strong className={caseRecord.multimodalAnalysis.conversationContext.reportedImmediateThreat ? 'text-red-700 font-bold' : 'text-slate-700'}>
                  {caseRecord.multimodalAnalysis.conversationContext.reportedImmediateThreat ? 'YES (Confirmed)' : 'No'}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated 14566 Call Transcript & Audio Analysis for Demo */}
      {caseRecord.transcript && caseRecord.transcript.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-sky-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  14566 Helpline Interaction Transcript &amp; Acoustic Analysis
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Real-time speech-to-text with continuous prosodic stress classification
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold flex items-center gap-1.5 hover:bg-sky-100 transition-colors"
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5 text-sky-700" /> : <Play className="w-3.5 h-3.5 text-sky-700" />}
                <span>{isPlayingAudio ? 'Pause Acoustic Playback' : 'Simulate Acoustic Stream'}</span>
              </button>
            </div>
          </div>

          {/* Audio Waveform visualization simulation */}
          <div className="my-4 p-3 bg-slate-900 rounded-lg flex items-center gap-3 text-white">
            <span className="text-[10px] font-mono text-cyan-400 shrink-0">14566 AUDIO FEED</span>
            <div className="flex-1 flex items-center gap-0.5 h-7 overflow-hidden">
              {Array.from({ length: 48 }).map((_, i) => {
                const height = Math.min(100, Math.max(15, ((Math.sin(i * 0.4) + 1) * 35) + (i > 20 && i < 35 ? 28 : 5)));
                return (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      i > 22 && i < 34
                        ? 'bg-red-500'
                        : i % 2 === 0
                        ? 'bg-cyan-400'
                        : 'bg-sky-600'
                    }`}
                    style={{
                      height: isPlayingAudio ? `${Math.random() * 80 + 15}%` : `${height}%`,
                    }}
                  />
                );
              })}
            </div>
            <span className="text-[10px] font-mono text-slate-400 shrink-0">
              Vocal Stress: {caseRecord.sviScore >= 76 ? 'HIGH TREMOR' : 'NORMAL'}
            </span>
          </div>

          {/* Conversation Turns */}
          <div className="space-y-3 mt-4">
            {caseRecord.transcript.map((t) => (
              <div
                key={t.id}
                className={`p-3.5 rounded-lg border text-xs leading-relaxed ${
                  t.aiFlag
                    ? 'bg-red-50/40 border-red-200'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1 text-[11px]">
                  <span className="font-bold text-slate-900">{t.speaker}</span>
                  <div className="flex items-center gap-2">
                    {t.vocalStressLevel && (
                      <span
                        className={`font-mono font-bold px-1.5 py-0.2 rounded text-[10px] ${
                          t.vocalStressLevel === 'Critical'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        Vocal Stress: {t.vocalStressLevel}
                      </span>
                    )}
                    <span className="text-slate-400 font-mono">{t.timestamp}</span>
                  </div>
                </div>
                <div className="text-slate-800 font-normal">{t.text}</div>
                {t.flaggedKeywords && (
                  <div className="mt-2 pt-1.5 border-t border-red-100 flex items-center gap-1.5 text-[10px] text-red-700">
                    <span className="font-bold uppercase tracking-wider">Flagged Lexemes:</span>
                    {t.flaggedKeywords.map((k, idx) => (
                      <span key={idx} className="bg-white px-1.5 py-0.5 rounded border border-red-200 font-mono">
                        {k}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECOMMENDED INTERVENTIONS (with prioritized order and disclaimer) */}
      <div id="recommended-interventions-section" className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2 mb-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              RECOMMENDED INTERVENTIONS
            </h2>
            <p className="text-xs text-slate-500">
              AI-generated prioritized triage roadmap calibrated to detected risk indices
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200 self-start sm:self-auto">
            Prioritized by Urgency
          </span>
        </div>

        {/* Priority items list */}
        <div className="space-y-3">
          {caseRecord.recommendedInterventions.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {rec.priorityOrder}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-900">{rec.type}</span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                        rec.urgency === 'Immediate'
                          ? 'bg-red-100 text-red-800'
                          : rec.urgency === 'High'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {rec.urgency}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">({rec.department})</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{rec.recommendedAction}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Prompt Requirement Notice */}
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed">
          <strong className="font-bold">Institutional Safeguard Notice:</strong> VIONEX only recommends and
          prioritizes support options based on algorithmic risk indicators. It does NOT autonomously decide the final
          intervention or execute binding state actions.
        </div>
      </div>

      {/* HUMAN-IN-THE-LOOP SECTION (Required box, buttons & state toggles) */}
      <div
        id="human-in-the-loop-box"
        className="bg-white border-2 border-blue-600 rounded-xl p-6 shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-lg">
          MANDATORY HUMAN-IN-THE-LOOP PROTOCOL
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-900 font-extrabold text-sm mb-1.5">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <span>OFFICER AUTHORIZATION CONSOLE</span>
            </div>
            {/* The exact sentence required by prompt: */}
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              “AI detects and prioritizes risk. Authorized NHAA officers/counsellors make the final intervention decision.”
            </p>
            <div className="text-xs text-slate-500 mt-1">
              Active Duty Officer: <strong className="text-slate-800">Officer R. Sharma</strong> (NHAA-OFF-7041) • Response Cell 14566
            </div>
          </div>

          {/* Action Buttons required by prompt: [ Assign Counsellor ] [ Escalate Case ] [ Add Intervention Note ] */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAssignModal}
              id="btn-assign-counsellor"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-2 transition-colors"
            >
              <UserCheck className="w-4 h-4" />
              <span>Assign Counsellor</span>
            </button>

            <button
              onClick={onOpenEscalateModal}
              id="btn-escalate-case"
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-2 transition-colors"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Escalate Case</span>
            </button>

            <button
              onClick={onOpenAddNoteModal}
              id="btn-add-intervention-note"
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 flex items-center gap-2 transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-blue-600" />
              <span>Add Intervention Note</span>
            </button>
          </div>
        </div>

        {/* Current Case Status Toggle Required by Prompt (OPEN, ASSIGNED, IN PROGRESS, RESOLVED) */}
        <div className="pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Case Status (Click to update):
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {(['OPEN', 'ASSIGNED', 'IN PROGRESS', 'RESOLVED'] as CaseStatus[]).map((status) => {
                const isActive = caseRecord.status === status;
                return (
                  <button
                    key={status}
                    id={`status-toggle-${status.toLowerCase().replace(' ', '-')}`}
                    onClick={() => onUpdateStatus(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      isActive
                        ? status === 'OPEN'
                          ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                          : status === 'ASSIGNED'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : status === 'IN PROGRESS'
                          ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                          : 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {isActive && <span className="mr-1.5">✓</span>}
                    {status}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-xs text-slate-500 sm:text-right">
            <div>
              Assigned Personnel:{' '}
              <strong className="text-slate-900 font-semibold">
                {caseRecord.assignedTo || 'Unassigned'}
              </strong>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Last State Change: {caseRecord.lastUpdated}
            </div>
          </div>
        </div>

        {/* Intervention History / Officer Notes */}
        {caseRecord.notes.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              Officer Action &amp; Audit Trail
            </h4>
            <div className="space-y-2">
              {caseRecord.notes.map((n) => (
                <div
                  key={n.id}
                  className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <span className="font-bold text-slate-900">{n.author}</span>{' '}
                    <span className="text-slate-400 text-[11px]">({n.officerRole})</span>
                    <p className="mt-0.5 text-slate-700">{n.content}</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 shrink-0">
                    {n.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
