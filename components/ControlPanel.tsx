import React, { useState } from 'react';
import { ProfileData } from '../types';
import { parseTechnicalSkills, isProfileData } from '../utils/validation';

interface ControlPanelProps {
  profileData: ProfileData;
  onUpdate: (data: ProfileData) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ profileData, onUpdate, isOpen, onClose }) => {
  const [skillsDraft, setSkillsDraft] = useState(
    profileData.technicalSkills.map(group => `${group.category}: ${group.skills.join(', ')}`).join('\n')
  );
  const [jsonDraft, setJsonDraft] = useState(JSON.stringify(profileData, null, 2));
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleUpdateBasic = (field: keyof Omit<ProfileData, 'contact' | 'experience' | 'education' | 'certifications' | 'technicalSkills' | 'recentHighlights' | 'projects'>, value: string) => {
    onUpdate({ ...profileData, [field]: value });
  };

  const handleUpdateContact = (field: keyof ProfileData['contact'], value: string) => {
    onUpdate({
      ...profileData,
      contact: { ...profileData.contact, [field]: value },
    });
  };

  const handleApplySkills = () => {
    const parsedSkills = parseTechnicalSkills(skillsDraft);
    if (parsedSkills.length === 0) {
      setError('Competências inválidas. Use: Categoria: skill1, skill2');
      return;
    }
    onUpdate({ ...profileData, technicalSkills: parsedSkills });
    setError('');
  };

  const handleApplyJson = () => {
    try {
      const parsedData = JSON.parse(jsonDraft);
      if (!isProfileData(parsedData)) {
        setError('JSON inválido para o formato do currículo.');
        return;
      }
      onUpdate(parsedData);
      setError('');
    } catch {
      setError('JSON inválido. Verifique a sintaxe.');
    }
  };

  return (
    <div className="fixed inset-0 z-30 bg-slate-900/30 print:hidden">
      <div className="absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl border-l border-slate-200 p-5 sm:p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold text-slate-900">Painel de Controle</h3>
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-md text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            Fechar
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nome</label>
            <input
              value={profileData.name}
              onChange={e => handleUpdateBasic('name', e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Título</label>
            <input
              value={profileData.title}
              onChange={e => handleUpdateBasic('title', e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Resumo Profissional</label>
            <textarea
              value={profileData.summary}
              onChange={e => handleUpdateBasic('summary', e.target.value)}
              rows={4}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
              <input
                value={profileData.contact.email}
                onChange={e => handleUpdateContact('email', e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Telefone</label>
              <input
                value={profileData.contact.phone}
                onChange={e => handleUpdateContact('phone', e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Localização</label>
              <input
                value={profileData.contact.location}
                onChange={e => handleUpdateContact('location', e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">GitHub</label>
              <input
                value={profileData.contact.github ?? ''}
                onChange={e => handleUpdateContact('github', e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Competências Técnicas</label>
            <p className="text-xs text-slate-500 mb-2">Formato: Categoria: skill1, skill2</p>
            <textarea
              value={skillsDraft}
              onChange={e => setSkillsDraft(e.target.value)}
              rows={8}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-mono"
            />
            <button
              onClick={handleApplySkills}
              className="mt-2 px-3 py-2 rounded-md bg-sky-600 text-white text-sm font-medium hover:bg-sky-700"
            >
              Aplicar Competências
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Editor Completo (JSON)</label>
            <textarea
              value={jsonDraft}
              onChange={e => setJsonDraft(e.target.value)}
              rows={14}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-mono"
            />
            <div className="mt-2 flex gap-2">
              <button
                onClick={handleApplyJson}
                className="px-3 py-2 rounded-md bg-slate-700 text-white text-sm font-medium hover:bg-slate-800"
              >
                Aplicar JSON
              </button>
            </div>
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
