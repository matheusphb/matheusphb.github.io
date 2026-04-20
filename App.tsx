import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Phone, Settings, Download, X, Save, Plus, ExternalLink, Globe, Briefcase, Sparkles, GraduationCap, ShieldCheck } from "lucide-react";
import { ResumeData } from "./types";
import { INITIAL_DATA } from "./constants";

// --- Extensão de Tipos para o novo modelo ---
// Nota: Adicionando campos que estão nos prints mas podem não estar no INITIAL_DATA
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

interface ExtendedResumeData extends ResumeData {
  projects: Project[];
  languages: { name: string; level: string }[];
  availability: string;
}

const STORAGE_KEY = "resume_masterpiece_v5";

const createId = () => `item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const normalizeUrl = (value?: string) => {
  if (!value) return "#";
  if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("mailto:") || value.startsWith("tel:")) {
    return value;
  }
  if (value.includes("@") && !value.includes(" ")) {
    return `mailto:${value}`;
  }
  return `https://${value.replace(/^\/+/, "")}`;
};

const normalizeLoadedData = (rawData: Partial<ExtendedResumeData>): ExtendedResumeData => ({
  ...EXTENDED_INITIAL,
  ...rawData,
  experience: (rawData.experience ?? EXTENDED_INITIAL.experience).map((item, index) => ({
    ...item,
    id: item.id ?? `legacy-experience-${index}-${createId()}`,
  })),
  projects: (rawData.projects ?? EXTENDED_INITIAL.projects).map((item, index) => ({
    ...item,
    id: item.id ?? `legacy-project-${index}-${createId()}`,
  })),
});

const EXTENDED_INITIAL: ExtendedResumeData = {
  ...INITIAL_DATA,
  availability: "Disponível para novos projetos",
  languages: [
    { name: "Português", level: "Nativo" },
    { name: "Inglês", level: "Técnico" }
  ],
  projects: [
    {
      id: "p1",
      title: "Automação de Infraestrutura",
      description: "Desenvolvimento e implementação de scripts em PowerShell para automatizar a instalação de bancos de dados em PDVs, reduzindo o tempo de configuração manual e padronizando ambientes.",
      tags: ["PowerShell", "Automação", "Bancos de Dados"]
    },
    {
      id: "p2",
      title: "Fábrica de Software",
      description: "Planejamento de padronização de processos de desenvolvimento utilizando modelos CMMI e MPS.BR.",
      tags: ["Processos", "CMMI", "MPS.BR"]
    }
  ]
};

export default function App() {
  const [data, setData] = useState<ExtendedResumeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? normalizeLoadedData(JSON.parse(saved)) : EXTENDED_INITIAL;
    } catch (e) {
      console.error("Error parsing resume data from localStorage:", e);
      return EXTENDED_INITIAL;
    }
  });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [skillFilter, setSkillFilter] = useState("ALL");
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [isBooting, setIsBooting] = useState(false);
  const [bootStep, setBootStep] = useState(0);

  const bootMessages = [
    "> Iniciando sistema...",
    "> Validando perfil profissional...",
    `> Carregando currículo de ${data.name}...`,
    "> Sincronizando dados locais...",
    "> Acesso autorizado."
  ];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (!isBooting) return;

    const interval = setInterval(() => {
      setBootStep(prev => {
        if (prev < bootMessages.length - 1) return prev + 1;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoginOpen(false);
          setIsBooting(false);
          setBootStep(0);
        }, 500);
        return prev;
      });
    }, 420);

    return () => clearInterval(interval);
  }, [isBooting, bootMessages.length]);

  const filteredSkills = useMemo(() => {
    if (skillFilter === "ALL") return data.skills;
    return data.skills.filter(s => s.category.toUpperCase() === skillFilter);
  }, [data.skills, skillFilter]);

  const skillCategories = ["ALL", ...new Set(data.skills.map(s => s.category.toUpperCase()))];

  const addExperience = () => {
    setData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: createId(),
          role: "Novo cargo",
          company: "Nova empresa",
          period: "2026 - Atual",
          description: "Descreva aqui as responsabilidades e conquistas.",
          tags: ["Novo"]
        }
      ]
    }));
  };

  const addProject = () => {
    setData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: createId(),
          title: "Novo projeto",
          description: "Descreva aqui o projeto e o impacto gerado.",
          tags: ["React", "TypeScript"]
        }
      ]
    }));
  };

  const removeExperience = (id: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter(item => item.id !== id)
    }));
  };

  const removeProject = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(item => item.id !== id)
    }));
  };

  const startAccess = () => {
    if (isBooting) return;
    setIsBooting(true);
    setBootStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 font-sans text-slate-900 selection:bg-blue-100 pb-20 overflow-x-hidden">
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div
            key="login-gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] no-print bg-slate-950 text-white px-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.25),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.18),transparent_28%)]" />
            <div className="relative max-w-xl mx-auto min-h-screen flex items-center">
              <div className="w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
                {!isBooting ? (
                  <>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-300/30 text-cyan-200 text-xs font-bold uppercase tracking-widest mb-6">
                      <ShieldCheck size={14} /> Acesso ao Portfólio
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-3 uppercase">Painel Profissional</h2>
                    <p className="text-slate-300 leading-relaxed mb-8">
                      Versão interativa do currículo com projetos, experiência e dados técnicos atualizados.
                    </p>
                    <button
                      onClick={startAccess}
                      className="w-full rounded-2xl bg-cyan-400 text-slate-950 font-black uppercase tracking-[0.2em] py-4 hover:bg-cyan-300 transition-colors"
                      type="button"
                    >
                      Entrar
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200 mb-6">Inicializando</h3>
                    <div className="font-mono text-sm space-y-3 mb-8">
                      {bootMessages.slice(0, bootStep + 1).map((msg, index) => (
                        <motion.p key={msg} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className={index === bootStep ? "text-cyan-200" : "text-slate-400"}>
                          {msg}
                        </motion.p>
                      ))}
                    </div>
                    <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((bootStep + 1) / bootMessages.length) * 100}%` }}
                        className="h-full bg-cyan-300"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute top-[30%] -right-28 w-80 h-80 rounded-full bg-emerald-200/30 blur-3xl" />

      {/* Top Navigation Bar - Match Print 1 & 3 */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 no-print">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl tracking-tighter">{data.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsEditOpen(true)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <Settings size={20} />
            </button>
            <button onClick={() => window.print()} className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
              <Download size={16} /> Imprimir PDF
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-16 relative">
        {/* Hero Section - Match Print 3 */}
        <section className="mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 mb-8">
              <Sparkles size={12} className="text-amber-400" /> {data.availability}
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 mb-4 uppercase whitespace-pre-line">
              {data.name}
            </h1>
            <p className="text-2xl md:text-3xl text-slate-400 font-medium leading-tight max-w-4xl uppercase tracking-tight">
              {data.title}
            </p>
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mt-10 max-w-3xl">
              {data.summary}
            </p>
            
            <div className="flex flex-wrap gap-8 mt-12 text-sm font-bold text-slate-400 uppercase tracking-widest border-t border-slate-100 pt-8">
              <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                <Mail size={16} /> {data.email}
              </a>
              <a href={`tel:${data.phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                 <Phone size={16} /> {data.phone}
              </a>
              <a href={normalizeUrl(data.linkedin)} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-slate-900 transition-colors uppercase">
                <Linkedin size={16} /> LinkedIn
              </a>
              <a href={normalizeUrl(data.github)} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-slate-900 transition-colors uppercase">
                <Github size={16} /> GitHub
              </a>
              <div className="flex items-center gap-2 uppercase">
                 <MapPin size={16} /> {data.location}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Experiência - Match Print 2 */}
        <section className="mb-32">
          <h2 className="text-xs font-black text-slate-300 uppercase tracking-[0.4em] mb-12 flex items-center gap-3">
             <Briefcase size={18} /> Experiência Profissional
          </h2>
          <div className="space-y-16">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative pl-12">
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center bg-white z-10" />
                <div className="absolute left-[15px] top-9 bottom-[-40px] w-[2px] bg-slate-100" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase leading-none mb-1">{exp.role}</h3>
                    <p className="text-slate-400 font-bold uppercase tracking-tight">{exp.company}</p>
                  </div>
                  <span className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-black uppercase text-slate-400 tracking-widest self-start md:self-auto">
                    {exp.period}
                  </span>
                </div>
                <div className="space-y-3 max-w-3xl">
                   <p className="text-slate-500 leading-relaxed text-lg">
                     {exp.description}
                   </p>
                   <div className="flex flex-wrap gap-2 pt-4">
                     {exp.tags.map(tag => (
                       <span key={tag} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase text-slate-400 tracking-widest">{tag}</span>
                     ))}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Habilidades - Match Print 1 */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <h2 className="text-xs font-black text-slate-300 uppercase tracking-[0.4em] flex items-center gap-3">
               <Sparkles size={18} /> Habilidades Técnicas
            </h2>
            <div className="flex gap-2 bg-slate-50 p-1 rounded-xl no-print">
              {skillCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSkillFilter(cat)}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${skillFilter === cat ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {filteredSkills.map(skill => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-black text-slate-800">{skill.name}</span>
                  <span className="text-[10px] font-bold text-slate-300 italic">{skill.level}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    whileInView={{ width: `${skill.level}%` }} 
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-slate-900" 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Formação e Projetos - Match Print 1 bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
           {/* Coluna Esquerda: Formação e Idiomas */}
           <section>
              <h2 className="text-xs font-black text-slate-300 uppercase tracking-[0.4em] mb-12 flex items-center gap-3 text-slate-300">
                 <GraduationCap size={18} /> Formação Acadêmica
              </h2>
              <div className="border-l-2 border-slate-50 pl-8 space-y-12">
                {data.education.map(edu => (
                  <div key={edu.id} className="relative">
                    <div className="absolute left-[-37px] top-1.5 w-4 h-4 rounded-full bg-slate-200 border-2 border-white" />
                    <h3 className="text-xl font-black text-slate-900 uppercase mb-1">{edu.degree}</h3>
                    <p className="text-slate-500 font-bold uppercase text-xs mb-2">{edu.institution}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">{edu.period}</p>
                  </div>
                ))}
              </div>

              <div className="mt-20">
                 <h2 className="text-xs font-black text-slate-300 uppercase tracking-[0.4em] mb-8">Idiomas</h2>
                 <div className="flex flex-wrap gap-4">
                   {data.languages.map(lang => (
                     <div key={lang.name} className="px-6 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center gap-4">
                        <span className="font-bold text-slate-800 uppercase text-sm">{lang.name}</span>
                        <span className="text-[10px] font-black text-slate-300 uppercase">({lang.level})</span>
                     </div>
                   ))}
                 </div>
              </div>
           </section>

           {/* Coluna Direita: Projetos */}
           <section>
              <h2 className="text-xs font-black text-slate-300 uppercase tracking-[0.4em] mb-12 flex items-center gap-3">
                 <Globe size={18} /> Projetos em Destaque
              </h2>
              <div className="space-y-6">
                {data.projects.map(proj => (
                  <div key={proj.id} className="group p-8 bg-slate-50/50 border border-slate-100 rounded-3xl hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{proj.title}</h3>
                      <ExternalLink size={20} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                    </div>
                    <p className="text-slate-500 text-lg leading-relaxed mb-8">{proj.description}</p>
                    <div className="flex flex-wrap gap-2">
                       {proj.tags.map(tag => (
                         <span key={tag} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase text-slate-300 group-hover:text-slate-900 group-hover:border-slate-300 transition-all">{tag}</span>
                       ))}
                    </div>
                  </div>
                ))}
              </div>
           </section>
        </div>
      </main>

      {/* Painel de Edição - Match Print 4 */}
      <AnimatePresence>
        {isEditOpen && (
          <div className="fixed inset-0 z-50 no-print overflow-hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditOpen(false)} className="absolute inset-0 bg-slate-900/10 backdrop-blur-sm" />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }} 
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl flex flex-col pt-8"
            >
              <div className="px-8 flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-xl font-black uppercase">Painel de Edição</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase">As alterações são salvas localmente.</p>
                </div>
                <div className="flex gap-2">
                   <button onClick={addProject} className="p-2 text-slate-300 hover:text-slate-900" title="Adicionar projeto"><Plus size={20}/></button>
                   <button onClick={() => setIsEditOpen(false)} className="p-2 text-slate-300 hover:text-slate-900"><X size={20}/></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-8 space-y-10 pb-20">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-300 border-b pb-2">Informações Básicas</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Nome Completo</label>
                      <input value={data.name} onChange={e => setData({...data, name: e.target.value})} className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl font-bold focus:bg-white focus:border-blue-400 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Título Profissional</label>
                      <input value={data.title} onChange={e => setData({...data, title: e.target.value})} className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl font-bold focus:bg-white focus:border-blue-400 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Sobre Mim</label>
                      <textarea value={data.summary} onChange={e => setData({...data, summary: e.target.value})} className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl font-medium text-slate-600 h-40 focus:bg-white focus:border-blue-400 outline-none transition-all resize-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                   <div className="flex justify-between items-center border-b pb-2">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-300">Experiência Profissional</h4>
                     <button onClick={addExperience} className="text-[10px] font-black uppercase text-slate-900 flex items-center gap-1 hover:underline">+ Adicionar</button>
                   </div>
                   {data.experience.map(exp => (
                     <div key={exp.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <h5 className="font-black text-slate-900 uppercase text-sm">{exp.role}</h5>
                          <button
                            onClick={() => removeExperience(exp.id)}
                            className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-700"
                            type="button"
                          >
                            Excluir
                          </button>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-4">{exp.company} • {exp.period}</p>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 rounded-full bg-white border border-slate-200 text-[10px] font-black uppercase text-slate-400">{tag}</span>
                          ))}
                        </div>
                     </div>
                   ))}
                </div>

                <div className="space-y-6">
                   <div className="flex justify-between items-center border-b pb-2">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-300">Projetos</h4>
                      <button onClick={addProject} className="text-[10px] font-black uppercase text-slate-900 flex items-center gap-1 hover:underline" type="button">+ Adicionar</button>
                   </div>
                   {data.projects.map(project => (
                     <div key={project.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <h5 className="font-black text-slate-900 uppercase text-sm">{project.title}</h5>
                          <button
                            onClick={() => removeProject(project.id)}
                            className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-700"
                            type="button"
                          >
                            Excluir
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 rounded-full bg-white border border-slate-200 text-[10px] font-black uppercase text-slate-400">{tag}</span>
                          ))}
                        </div>
                     </div>
                   ))}
                </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 no-print">
                <button onClick={() => setIsEditOpen(false)} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                  <Save size={18} /> Salvar Alterações
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
