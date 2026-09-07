import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  ShieldCheck,
  Bell,
  Lock,
  Cpu,
  CheckCircle2,
  Save,
  Server,
  KeyRound,
  Radio,
  ExternalLink,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [criticalSmsAlerts, setCriticalSmsAlerts] = useState(true);
  const [audioAlerts, setAudioAlerts] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [piiMasking, setPiiMasking] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div id="settings-view" className="space-y-8 animate-fadeIn max-w-5xl">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <SettingsIcon className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-blue-700 tracking-wider uppercase">
                Portal Administration
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
              <span className="w-2 h-6 bg-blue-500 mr-2.5 rounded-full"></span>
              Settings &amp; System Configuration
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Officer profile credentials, notification threshold preferences, DPDP Act privacy rules, and VIONEX engine telemetry
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
          >
            <Save className="w-4 h-4" />
            <span>{saveSuccess ? 'Preferences Saved!' : 'Save Preferences'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* 1. Profile Section */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-200 mb-4">
            <User className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Officer Profile</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                readOnly
                value="Officer Rajesh Sharma"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 font-medium cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Badge / Employee ID
              </label>
              <input
                type="text"
                readOnly
                value="NHAA-OFF-7041"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-mono text-slate-900 font-bold cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Official Email
              </label>
              <input
                type="text"
                readOnly
                value="r.sharma@nhaa.gov.in (Simulated)"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Designated Cell
              </label>
              <input
                type="text"
                readOnly
                value="National Helpline 14566 - Emergency Triage Cell"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* 2. Role & Access Control */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-200 mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Role &amp; Permissions</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-lg flex items-center justify-between">
              <div>
                <div className="font-bold text-blue-950">Assigned Role: Senior Assessment Officer (Tier 3)</div>
                <div className="text-blue-800 text-[11px] mt-0.5">
                  Authorized to override AI risk scores, dispatch PCR escalations, and reassign crisis counsellors.
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-blue-600 text-white font-mono text-[10px] font-bold">
                ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="font-bold text-slate-800">14566 Telemetry Access</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">Full Real-Time Stream</div>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="font-bold text-slate-800">PCR 112 Dispatch Link</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">Direct Bridge Enabled</div>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="font-bold text-slate-800">DLSA Legal Referral</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">Empanelled Panel Direct</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Notification Preferences */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-200 mb-4">
            <Bell className="w-4 h-4 text-amber-600" />
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Notification Preferences</h2>
          </div>

          <div className="space-y-4 text-xs">
            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">Critical Risk Inbound Alerts (SVI &gt; 75)</span>
                <span className="text-slate-500 text-[11px]">
                  Sound high-priority chime on duty console when severe trauma or immediate threat is flagged.
                </span>
              </div>
              <input
                type="checkbox"
                checked={audioAlerts}
                onChange={(e) => setAudioAlerts(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">Immediate SMS / Cellular Broadcast</span>
                <span className="text-slate-500 text-[11px]">
                  Dispatch automated text notification to active shift coordinator for cases in Critical status.
                </span>
              </div>
              <input
                type="checkbox"
                checked={criticalSmsAlerts}
                onChange={(e) => setCriticalSmsAlerts(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">Daily Shift Triage Digest</span>
                <span className="text-slate-500 text-[11px]">
                  Receive end-of-shift summary of resolved vs escalated cases.
                </span>
              </div>
              <input
                type="checkbox"
                checked={dailyDigest}
                onChange={(e) => setDailyDigest(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* 4. Privacy & Consent */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-200 mb-4">
            <Lock className="w-4 h-4 text-indigo-600" />
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Privacy &amp; Consent Framework</h2>
          </div>

          <div className="space-y-3 text-xs leading-relaxed text-slate-600">
            <div className="p-3 bg-indigo-50/50 border border-indigo-200 rounded-lg text-indigo-950">
              <span className="font-bold">Digital Personal Data Protection (DPDP) Act 2023 Compliance:</span>{' '}
              All citizen voice recordings and written statements are ingested with real-time anonymization.
              Personally Identifiable Information (PII) such as phone numbers, Aadhaar digits, and exact residence
              landmarks are tokenized into non-reversible hash IDs.
            </div>

            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50">
              <div>
                <span className="font-bold text-slate-900 block">Automated In-Memory PII Redaction</span>
                <span className="text-slate-500 text-[11px]">
                  Enforce immediate regex scrubbing of names, account numbers, and addresses from displayed transcripts.
                </span>
              </div>
              <input
                type="checkbox"
                checked={piiMasking}
                onChange={(e) => setPiiMasking(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
            </label>

            <div className="text-[11px] text-slate-500">
              Data retention timeline: <strong className="text-slate-800">90 Days Statutory Hold</strong> for legal audit,
              after which unescalated acoustic records are cryptographically shredded.
            </div>
          </div>
        </div>

        {/* 5. System Status & Telemetry */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-200 mb-4">
            <Cpu className="w-4 h-4 text-cyan-600" />
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">System Status &amp; Architecture Node</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-slate-400 text-[10px] font-bold uppercase">VIONEX Inference Node</div>
              <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">v2.4.1-sih</div>
              <div className="text-emerald-600 text-[10px] mt-1 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Ready / Active
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-slate-400 text-[10px] font-bold uppercase">Model Architecture</div>
              <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">Multimodal SVI Transformer</div>
              <div className="text-slate-500 text-[10px] mt-1">Voice + NLP Joint Embedding</div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-slate-400 text-[10px] font-bold uppercase">Average Latency</div>
              <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">42 ms</div>
              <div className="text-emerald-600 text-[10px] mt-1 font-semibold">Sub-second streaming</div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-slate-400 text-[10px] font-bold uppercase">14566 Ingestion Stream</div>
              <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">WebRTC SIP Gateway</div>
              <div className="text-emerald-600 text-[10px] mt-1 font-semibold">Zero Packet Drop</div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-100 rounded-lg text-[11px] text-slate-600">
            <strong>Demonstration Note:</strong> All system status readings and configuration toggles operate on local
            state in this SIH26093 prototype build.
          </div>
        </div>
      </div>
    </div>
  );
};
