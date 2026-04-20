import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CV_DATA } from '../constants';
import { ProfileData } from '../types';
import { parseTechnicalSkills, isProfileData } from '../utils/validation';
import { ExperienceForm } from '../components/ExperienceForm';
import { EducationForm } from '../components/EducationForm';
import { SkillsEditor } from '../components/SkillsEditor';

const STORAGE_KEY = 'cv_profile_data_v1';

interface PanelPageProps {
  profileData: ProfileData;
  onUpdate: (data: ProfileData) => void;
}

const PanelPage: React.FC<PanelPageProps> = ({ profileData, onUpdate }) => {
  const [jsonDraft, setJsonDraft] = useState(JSON.stringify(profileData, null, 2));
  const [error, setError] = useState('');

  // Sincroniza drafts apenas quando a chave mudar completamente
  useEffect(() => {
    setJsonDraft(JSON.stringify(profileData, null, 2));
  }, [JSON.stringify(profileData)]);

  const handleChange = (field: string, value: string) => {
    const update = { ...profileData };
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      if (parent === 'contact') {
        update.contact = { ...update.contact, [child]: value };
      }
    } else {
      (update as any)[field] = value;
    }
    onUpdate(update);
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
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 relative">
      {/* Blobs de fundo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-sky-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-10" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-10" />
      </div>

      <div className="mx-auto max-w-4xl relative z-10">
        {/* Header com glassmorphism */}
        <div className="mb-8 flex items-center justify-between backdrop-blur-md bg-white/30 rounded-xl p-6 border border-white/20 shadow-lg">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Painel de Controle</h1>
            <p className="text-lg text-slate-600 mt-2">Edite seu currículo em tempo real</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
          >
            ← Voltar ao CV
          </Link>
        </div>

        {/* Main Content com glassmorphism */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6 sm:p-8">
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="border-b border-slate-200 pb-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Informações Básicas</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nome</label>
                  <input
                    value={profileData.name}
                    onChange={e => handleChange('name', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Título Profissional</label>
                  <input
                    value={profileData.title}
                    onChange={e => handleChange('title', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Resumo Profissional</label>
                  <textarea
                    value={profileData.summary}
                    onChange={e => handleChange('summary', e.target.value)}
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
                    onChange={e => handleChange('contact.email', e.target.value)}
                    type="email"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Telefone</label>
                  <input
                    value={profileData.contact.phone}
                    onChange={e => handleChange('contact.phone', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Localização</label>
                  <input
                    value={profileData.contact.location}
                    onChange={e => handleChange('contact.location', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">GitHub</label>
                  <input
                    value={profileData.contact.github ?? ''}
                    onChange={e => handleChange('contact.github', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="border-b border-slate-200 pb-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Competências Técnicas</h2>
              <SkillsEditor 
                skills={profileData.technicalSkills}
                onUpdate={(skills) => onUpdate({ ...profileData, technicalSkills: skills })}
              />
            </div>

            {/* Experience */}
            <div className="border-b border-slate-200 pb-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Experiência Profissional</h2>
              <ExperienceForm
                experiences={profileData.experience}
                onUpdate={(experiences) => onUpdate({ ...profileData, experience: experiences })}
              />
            </div>

            {/* Education */}
            <div className="border-b border-slate-200 pb-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Formação Acadêmica</h2>
              <EducationForm
                education={profileData.education}
                onUpdate={(education) => onUpdate({ ...profileData, education: education })}
              />
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
