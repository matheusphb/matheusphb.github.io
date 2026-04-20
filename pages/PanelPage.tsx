import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CV_DATA } from '../constants';
import { ProfileData } from '../types';
import { parseTechnicalSkills, isProfileData } from '../utils/validation';

const STORAGE_KEY = 'cv_profile_data_v1';

const loadProfileData = (): ProfileData => {
  if (typeof window === 'undefined') return CV_DATA;
  try {
    const rawData = window.localStorage.getItem(STORAGE_KEY);
    if (!rawData) return CV_DATA;
    const parsedData = JSON.parse(rawData);
    return isProfileData(parsedData) ? parsedData : CV_DATA;
  } catch {
    return CV_DATA;
  }
};

interface PanelPageProps {
  profileData: ProfileData;
  onUpdate: (data: ProfileData) => void;
}

const PanelPage: React.FC<PanelPageProps> = ({ profileData, onUpdate }) => {
  const [skillsDraft, setSkillsDraft] = useState(
    profileData.technicalSkills.map(group => `${group.category}: ${group.skills.join(', ')}`).join('\n')
  );
  const [jsonDraft, setJsonDraft] = useState(JSON.stringify(profileData, null, 2));
  const [error, setError] = useState('');

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

  const handleResetData = () => {
    onUpdate(CV_DATA);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Painel de Controle</h1>
            <p className="text-lg text-slate-600 mt-2">Edite seu currículo em tempo real</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            ← Voltar ao CV
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8">
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="border-b border-slate-200 pb-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Informações Básicas</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nome</label>
                  <input
                    value={profileData.name}
                    onChange={e => handleUpdateBasic('name', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Título Profissional</label>
                  <input
                    value={profileData.title}
                    onChange={e => handleUpdateBasic('title', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Resumo Profissional</label>
                  <textarea
                    value={profileData.summary}
                    onChange={e => handleUpdateBasic('summary', e.target.value)}
                    rows={6}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-b border-slate-200 pb-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Informações de Contato</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <input
                    value={profileData.contact.email}
                    onChange={e => handleUpdateContact('email', e.target.value)}
                    type="email"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Telefone</label>
                  <input
                    value={profileData.contact.phone}
                    onChange={e => handleUpdateContact('phone', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Localização</label>
                  <input
                    value={profileData.contact.location}
                    onChange={e => handleUpdateContact('location', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">GitHub</label>
                  <input
                    value={profileData.contact.github ?? ''}
                    onChange={e => handleUpdateContact('github', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="border-b border-slate-200 pb-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Competências Técnicas</h2>
              <p className="text-sm text-slate-600 mb-3">
                Formato: <code className="bg-slate-100 px-2 py-1 rounded">Categoria: skill1, skill2</code>
              </p>
              <textarea
                value={skillsDraft}
                onChange={e => setSkillsDraft(e.target.value)}
                rows={10}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-sky-500 mb-3"
              />
              <button
                onClick={handleApplySkills}
                className="px-6 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors"
              >
                Aplicar Competências
              </button>
            </div>

            {/* JSON Editor */}
            <div className="pb-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Editor Avançado (JSON)</h2>
              <textarea
                value={jsonDraft}
                onChange={e => setJsonDraft(e.target.value)}
                rows={16}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-sky-500 mb-3"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleApplyJson}
                  className="px-6 py-2 rounded-lg bg-slate-700 text-white font-medium hover:bg-slate-800 transition-colors"
                >
                  Aplicar JSON
                </button>
                <button
                  onClick={handleResetData}
                  className="px-6 py-2 rounded-lg bg-red-100 text-red-700 font-medium hover:bg-red-200 transition-colors"
                >
                  Restaurar Dados Padrão
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {!error && (
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <p className="text-sm font-medium text-green-700">✓ Dados salvos automaticamente no navegador</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelPage;
