import { motion, AnimatePresence } from 'motion/react';
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Printer,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Code2,
  Sparkles,
  Download,
  Layers,
  Settings,
  X,
  Plus,
  Trash2,
  Save,
  Undo2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { INITIAL_DATA } from './constants';
import { Pill } from './components/Pill';
import { VLibrasWidget } from './components/VLibrasWidget';
import { ATSResume } from './components/ATSResume';
import { ResumeData } from './types';

const IS_EDIT_LOCKED = true;

export default function App() {
  const [data, setData] = useState<ResumeData>(() => {
    if (IS_EDIT_LOCKED) return INITIAL_DATA;

    const saved = localStorage.getItem('resume_data');
    if (!saved) return INITIAL_DATA;

    try {
      const parsed = JSON.parse(saved);
      // Ensure all arrays exist to prevent .map errors with old localStorage data
      return {
        ...INITIAL_DATA,
        ...parsed,
        experience: parsed.experience || INITIAL_DATA.experience || [],
        skills: parsed.skills || INITIAL_DATA.skills || [],
        education: parsed.education || INITIAL_DATA.education || [],
        projects: parsed.projects || INITIAL_DATA.projects || [],
        languages: parsed.languages || INITIAL_DATA.languages || [],
        certifications: parsed.certifications || INITIAL_DATA.certifications || []
      };
    } catch (e) {
      return INITIAL_DATA;
    }
  });
  const [activeTab, setActiveTab] = useState<string>('all');
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bootStep, setBootStep] = useState(0);
  const [isATSMode, setIsATSMode] = useState(false);

  const categories = ['all', ...new Set(data.skills.map(s => s.category))];

  const bootMessages = [
    '> INITIALIZING SYSTEM...',
    '> CONNECTING TO DATA REPOSITORY...',
    '> LOADING PROFILE: ' + data.name.toUpperCase() + '...',
    '> ESTABLISHING SECURE CONNECTION...',
    '> ACCESS GRANTED.'
  ];

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setBootStep(prev => {
          if (prev < bootMessages.length - 1) return prev + 1;
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 800);
          return prev;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isLoading, data.name]);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    if (!IS_EDIT_LOCKED) {
      localStorage.setItem('resume_data', JSON.stringify(data));
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data]);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm('Deseja resetar todas as alteracoes para o padrao inicial?')) {
      setData(INITIAL_DATA);
      localStorage.removeItem('resume_data');
    }
  };

  const filteredSkills = activeTab === 'all'
    ? data.skills
    : data.skills.filter(s => s.category === activeTab);
  const certifications = data.certifications || [];
  const skillsByCategory = data.skills.reduce<Record<string, Array<{ name: string; level: number }>>>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push({ name: skill.name, level: skill.level });
    return acc;
  }, {});

  return (
    <>
      {isATSMode ? (
        <div className="bg-white min-h-screen">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-3 flex justify-between items-center z-50 flex-wrap gap-2">
            <h3 className="font-bold text-gray-900 text-sm">Modo ATS-Friendly</h3>
            <div className="flex gap-2 flex-wrap justify-end">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-gray-900 text-white rounded text-xs font-medium hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                Imprimir PDF
              </button>
              <button
                onClick={() => setIsATSMode(false)}
                className="px-3 py-1.5 bg-gray-200 text-gray-900 rounded text-xs font-medium hover:bg-gray-300 transition-colors whitespace-nowrap"
              >
                Voltar
              </button>
            </div>
          </div>
          <ATSResume data={data} />
        </div>
      ) : (
    <div className="min-h-screen bg-slate-50 selection:bg-slate-900 selection:text-white transition-all duration-500 overflow-x-hidden">
      <div className="presentation-only">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-6 text-white no-print"
          >
            <div className="w-full max-w-sm space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              <div className="font-mono text-sm sm:text-base space-y-3">
                {bootMessages.slice(0, bootStep + 1).map((msg, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={i === bootStep ? 'text-green-400' : 'text-slate-400'}
                  >
                    {msg}
                    {i === bootStep && (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2 h-4 ml-2 bg-green-400 align-middle"
                      />
                    )}
                  </motion.p>
                ))}
              </div>

              <div className="pt-8 h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(bootStep + 1) * 20}%` }}
                  className="h-full bg-green-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="bg-blob w-[500px] h-[500px] bg-blue-400 top-[-100px] left-[-100px] rounded-full" />
      <div className="bg-blob w-[400px] h-[400px] bg-purple-400 bottom-[100px] right-[-100px] rounded-full" />

      {/* Floating Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
          hasScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`font-bold tracking-tight text-slate-900 transition-all ${hasScrolled ? 'text-lg' : 'text-xl'}`}
          >
            {data.name.split(' ')[0]}{' '}
            <span className="text-slate-400 font-normal italic">{data.name.split(' ').slice(1).join(' ')}</span>
          </motion.h2>

          <div className="flex items-center gap-3">
            {!IS_EDIT_LOCKED && (
              <button
                onClick={() => setIsEditPanelOpen(true)}
                className="p-2 text-slate-400 hover:text-slate-900 transition-colors no-print"
                title="Abrir Painel de Edicao"
              >
                <Settings className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setIsATSMode(true)}
              className="group flex items-center gap-2 bg-slate-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-700 transition-all active:scale-95 shadow-lg shadow-slate-200"
              title="Visualizar em modo ATS-friendly (compatível com sistemas de rastreamento)"
            >
              <Code2 className="w-4 h-4" />
              <span className="hidden sm:inline">Modo ATS</span>
            </button>
            <button
              onClick={handlePrint}
              className="group flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              <Printer className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Imprimir PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Edit Panel Drawer */}
      <AnimatePresence>
        {!IS_EDIT_LOCKED && isEditPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditPanelOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] no-print"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[70] overflow-y-auto no-print border-l border-slate-200"
            >
              <div className="sticky top-0 bg-white/90 backdrop-blur border-b border-slate-100 p-6 flex justify-between items-center z-10">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900">Painel de Edicao</h3>
                  <p className="text-xs text-slate-400 font-medium">As alteracoes sao salvas localmente.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleReset} className="p-2 text-slate-400 hover:text-amber-500 transition-colors" title="Resetar Dados">
                    <Undo2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => setIsEditPanelOpen(false)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-10">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Informacoes Basicas</h4>
                  <div className="grid gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500">Nome Completo</label>
                      <input
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all"
                        value={data.name}
                        onChange={e => setData({ ...data, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500">Titulo Profissional</label>
                      <input
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5"
                        value={data.title}
                        onChange={e => setData({ ...data, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500">Sobre Mim (Sumario)</label>
                      <textarea
                        className="w-full h-32 px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 resize-none"
                        value={data.summary}
                        onChange={e => setData({ ...data, summary: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Experiences */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Experiencia Profissional</h4>
                    <button
                      onClick={() =>
                        setData({
                          ...data,
                          experience: [
                            {
                              id: Date.now().toString(),
                              company: 'Nova Empresa',
                              role: 'Cargo',
                              period: '2024',
                              description: 'Descricao da experiencia',
                              tags: ['Novo']
                            },
                            ...data.experience
                          ]
                        })
                      }
                      className="text-xs font-bold text-slate-900 hover:bg-slate-100 px-2 py-1 rounded transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Adicionar
                    </button>
                  </div>
                  <div className="space-y-6">
                    {data.experience.map((exp, i) => (
                      <div key={exp.id} className="p-4 bg-slate-50 rounded-xl relative group">
                        <button
                          onClick={() => setData({ ...data, experience: data.experience.filter((_, idx) => idx !== i) })}
                          className="absolute -right-2 -top-2 w-6 h-6 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                        <div className="space-y-3">
                          <input
                            className="bg-transparent font-bold text-sm w-full outline-none"
                            value={exp.role}
                            onChange={e => {
                              const newList = [...data.experience];
                              newList[i].role = e.target.value;
                              setData({ ...data, experience: newList });
                            }}
                          />
                          <div className="flex gap-2">
                            <input
                              className="bg-transparent text-xs text-slate-500 w-full outline-none"
                              value={exp.company}
                              onChange={e => {
                                const newList = [...data.experience];
                                newList[i].company = e.target.value;
                                setData({ ...data, experience: newList });
                              }}
                            />
                            <input
                              className="bg-transparent text-xs text-slate-400 text-right outline-none"
                              value={exp.period}
                              onChange={e => {
                                const newList = [...data.experience];
                                newList[i].period = e.target.value;
                                setData({ ...data, experience: newList });
                              }}
                            />
                          </div>
                          <textarea
                            className="w-full bg-transparent text-xs text-slate-600 outline-none resize-none"
                            value={exp.description}
                            onChange={e => {
                              const newList = [...data.experience];
                              newList[i].description = e.target.value;
                              setData({ ...data, experience: newList });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pb-12">
                  <button
                    onClick={() => setIsEditPanelOpen(false)}
                    className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
                  >
                    <Save className="w-4 h-4" /> Finalizar Edicao
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 space-y-24">
        {/* Intro */}
        <section id="hero" className="space-y-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider"
            >
              <Sparkles className="w-3 h-3 text-amber-500" /> Disponivel para novos projetos
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight leading-[0.9]"
            >
              {data.name}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-2xl sm:text-3xl font-bold text-slate-400 tracking-tight"
            >
              {data.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl text-lg text-slate-500 leading-relaxed font-light"
            >
              {data.summary}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-6 text-sm text-slate-500 pb-12 border-b border-slate-100"
          >
            <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-slate-900 transition-colors">
              <Mail className="w-4 h-4" /> {data.email}
            </a>
            <a href={`tel:${data.phone}`} className="flex items-center gap-2 hover:text-slate-900 transition-colors">
              <span className="w-4 h-4 flex items-center justify-center">&#128222;</span> {data.phone}
            </a>
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href={data.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {data.location}
            </span>
          </motion.div>
        </section>

        {/* Experience */}
        <section id="experience" className="space-y-12">
          <div className="section-title">
            <Briefcase className="w-4 h-4" /> Experiencia Profissional
          </div>

          <div className="space-y-12 relative before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-[2px] before:bg-slate-100">
            {data.experience.map(exp => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-12 space-y-4"
              >
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-slate-900 z-10" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                    <p className="text-slate-500 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-center">
                    {exp.period}
                  </span>
                </div>

                <div className="text-slate-600 font-light leading-relaxed whitespace-pre-wrap">{exp.description}</div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.tags.map((tech, i) => (
                    <Pill key={i} label={tech} variant="outline" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="section-title mb-0">
              <Code2 className="w-4 h-4" /> Habilidades Tecnicas
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl no-print overflow-x-auto max-w-full">
              {categories.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map(skill => (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-end">
                    <span className="text-slate-900 font-semibold">{skill.name}</span>
                    <span className="text-xs font-bold text-slate-400 tracking-tighter italic">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-slate-900 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Education & Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <section className="space-y-8">
            <div className="section-title">
              <GraduationCap className="w-4 h-4" /> Formacao Academica
            </div>

            {data.education.map(edu => (
              <div key={edu.id} className="space-y-2 border-l-2 border-slate-100 pl-6 relative">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-slate-300" />
                <h3 className="font-bold text-slate-900 leading-tight">{edu.degree}</h3>
                <p className="text-sm font-medium text-slate-500">{edu.institution}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{edu.period}</p>
              </div>
            ))}
          </section>

          {data.projects && data.projects.length > 0 && (
            <section className="space-y-8">
              <div className="section-title">
                <Layers className="w-4 h-4" /> Projetos em Destaque
              </div>

              <div className="grid grid-cols-1 gap-6">
                {data.projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="group p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 card-print"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{proj.name}</h3>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-slate-900 transition-colors no-print">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 font-light mb-4 leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer info (print only) */}
        <footer className="hidden print:block pt-12 border-t border-slate-100 mt-24">
          <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            <span>Gerado em {new Date().toLocaleDateString('pt-BR')}</span>
            <span>{data.name} - Portfolio Digital</span>
          </div>
        </footer>
      </main>

      {/* Floating Action Buttons (Mobile) */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 no-print sm:hidden z-50">
        {!IS_EDIT_LOCKED && (
          <button
            onClick={() => setIsEditPanelOpen(true)}
            className="w-14 h-14 rounded-full bg-white text-slate-900 shadow-2xl border border-slate-100 flex items-center justify-center active:scale-95 transition-transform"
          >
            <Settings className="w-6 h-6" />
          </button>
        )}
        <button
          onClick={handlePrint}
          className="w-14 h-14 rounded-full bg-slate-900 text-white shadow-2xl shadow-slate-900/40 flex items-center justify-center active:scale-95 transition-transform"
        >
          <Download className="w-6 h-6" />
        </button>
      </div>
      </div>

      <section className="print-only print-root text-slate-900">
        <article className="print-page">
          <div className="print-grid">
            <aside className="print-left print-avoid-break">
              <img
                src="/perfil.jpg"
                alt="Foto de perfil"
                className="w-28 h-28 rounded-2xl object-cover border border-slate-200 mx-auto"
                onError={event => {
                  event.currentTarget.src = '/perfil.png';
                }}
              />
              <h1 className="text-base font-black mt-4 leading-tight text-center">{data.name}</h1>
              <p className="text-[10px] text-slate-600 font-semibold mt-1 text-center">{data.title}</p>

              <div className="mt-5 space-y-2 text-[10px] text-slate-700 leading-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">Contatos</h2>
                <p>{data.email}</p>
                <p>{data.phone}</p>
                <p>{data.location}</p>
                {data.linkedin && <p>{data.linkedin}</p>}
                {data.github && <p>{data.github}</p>}
              </div>

              <div className="mt-6 space-y-3 text-[10px]">
                <h2 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">Competencias Tecnicas</h2>
                {Object.entries(skillsByCategory).map(([category, skills]) => (
                  <div key={category}>
                    <h3 className="font-bold text-slate-800 mb-1">{category}</h3>
                    <div className="space-y-0.5 text-slate-700">
                      {skills.map(skill => (
                        <p key={skill.name} className="flex items-center justify-between gap-2">
                          <span>{skill.name}</span>
                          <span className="text-slate-500 whitespace-nowrap">{skill.level}%</span>
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            <div className="print-divider" />

            <section className="print-right">
              <section className="print-avoid-break">
                <h2 className="print-title">Resumo Profissional</h2>
                <p className="text-[11px] leading-5 text-slate-700 mt-2">{data.summary}</p>
              </section>

              <section className="mt-5">
                <h2 className="print-title">Experiencia Profissional</h2>
                <div className="mt-3 space-y-3">
                  {data.experience.map(exp => (
                    <article key={exp.id} className="print-avoid-break">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-[12px] font-bold text-slate-900">{exp.role}</h3>
                          <p className="text-[10px] font-semibold text-slate-600">{exp.company}</p>
                        </div>
                        <span className="print-date">{exp.period}</span>
                      </div>
                      <p className="text-[10px] leading-4 text-slate-700 mt-1">{exp.description}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="mt-5 print-avoid-break">
                <h2 className="print-title">Projetos</h2>
                <div className="mt-2 space-y-2">
                  {data.projects.map((project, index) => (
                    <article key={index} className="print-avoid-break">
                      <h3 className="text-[12px] font-bold">{project.name}</h3>
                      <p className="text-[10px] leading-4 text-slate-700 mt-1">{project.description}</p>
                      <p className="text-[9px] text-slate-500 mt-1">Tecnologias: {project.technologies.join(', ')}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="mt-5 print-avoid-break">
                <h2 className="print-title">Formacao Academica</h2>
                <div className="mt-2 space-y-2">
                  {data.education.map(edu => (
                    <div key={edu.id} className="flex items-start justify-between gap-3 print-avoid-break">
                      <div>
                        <h3 className="text-[12px] font-bold">{edu.degree}</h3>
                        <p className="text-[10px] text-slate-600">{edu.institution}</p>
                      </div>
                      <span className="print-date">{edu.period}</span>
                    </div>
                  ))}
                </div>
              </section>

              {certifications.length > 0 && (
                <section className="mt-5 print-avoid-break">
                  <h2 className="print-title">Certificacoes</h2>
                  <div className="mt-2 space-y-2">
                    {certifications.map((cert, index) => (
                      <article key={index} className="print-avoid-break">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-[12px] font-bold text-slate-900">{cert.name}</h3>
                            <p className="text-[10px] text-slate-600">{cert.issuer}</p>
                          </div>
                          <span className="print-date">{cert.date}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              <section className="mt-5 print-avoid-break">
                <h2 className="print-title">Idiomas</h2>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {data.languages.map(language => (
                    <span key={language.name} className="text-[10px] px-2 py-0.5 border border-slate-200 rounded-full">
                      {language.name} - {language.level}
                    </span>
                  ))}
                </div>
              </section>
            </section>
          </div>
        </article>
      </section>

      <VLibrasWidget />
    </div>
      )}
    </>
  );
}
