// filepath: /workspaces/matheusphb.github.io/components/AdaptResume.tsx
import React, { useState } from 'react';
import { CV_DATA } from '../constants';
import { SparklesIcon } from './Icons';

const AdaptResume: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdaptClick = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setError("A chave da API do Gemini não foi configurada. Crie um arquivo .env.local com VITE_GEMINI_API_KEY=SUA_CHAVE.");
      setIsLoading(false);
      return;
    }

    try {
      const prompt = `
        Analise meu currículo e a descrição da vaga a seguir.
        Meu currículo (em JSON): ${JSON.stringify(CV_DATA)}
        Descrição da vaga: "${jobDescription}"

        Com base nisso, por favor, faça o seguinte:
        1. Reescreva meu "Resumo Profissional" para alinhar perfeitamente com os requisitos da vaga, destacando minhas experiências mais relevantes.
        2. Liste em bullet points as 3 a 5 habilidades e experiências do meu currículo que são mais importantes para esta vaga.
        3. Sugira como posso descrever minhas experiências de forma a usar palavras-chave da descrição da vaga.

        Formate a resposta de maneira clara e organizada, usando Markdown.
      `;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || `Erro na API: ${response.statusText}`);
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setSuggestion(text || "Não foi possível gerar uma sugestão.");

    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="p-4 bg-slate-50 rounded-lg">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
        <SparklesIcon className="w-6 h-6 text-sky-600" />
        <span>Adapte o Currículo com IA</span>
      </h2>
      <p className="text-slate-600 mb-6">Cole a descrição da vaga abaixo e a IA irá sugerir como adaptar seu currículo para se destacar.</p>
      
      <textarea
        className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
        rows={8}
        placeholder="Cole a descrição da vaga aqui..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      
      <button
        onClick={handleAdaptClick}
        disabled={isLoading || !jobDescription}
        className="mt-4 w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-md hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? 'Analisando...' : 'Gerar Sugestões'}
      </button>

      {error && <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md">{error}</div>}
      
      {suggestion && (
        <div className="mt-6 p-4 border-t border-slate-200">
          <h3 className="text-xl font-semibold text-slate-800 mb-3">Sugestões da IA</h3>
          <div className="prose prose-slate max-w-none whitespace-pre-wrap bg-white p-4 rounded-md shadow-sm">
            {suggestion}
          </div>
        </div>
      )}
    </section>
  );
};

export default AdaptResume;