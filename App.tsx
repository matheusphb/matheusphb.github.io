import React, { useState } from 'react';
import { CV_DATA } from './constants';
import { Experience } from './types';
import Pill from './components/Pill';
import { BriefcaseIcon, AcademicCapIcon, SparklesIcon, UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, PrinterIcon, GithubIcon, CpuChipIcon } from './components/Icons';
import { PROFILE_IMAGE_BASE64 } from './assets';
import AdaptResume from './components/AdaptResume';

  const getTabClass = (tabName: 'resume' | 'adapt') => {
    const baseClasses = "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium";
    if (activeTab === tabName) {
      return `${baseClasses} border-sky-500 text-sky-600`;
    }
    return `${baseClasses} border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700`;
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-slate-100 flex items-center justify-center print:bg-white print:p-0">
      {/* COLOQUE A LINHA DE TESTE AQUI */}
      <h1 className="absolute top-0 left-0 bg-red-500 text-white p-2 font-bold z-50">VERSÃO DE TESTE DEPLOY</h1>

      <main className="container mx-auto max-w-6xl bg-white shadow-2xl rounded-2xl relative print:shadow-none print:rounded-none print:w-full print:max-w-none">
        
        <button 
          onClick={handlePrint}
          className="absolute top-6 right-6 p-3 bg-sky-600 text-white rounded-full shadow-lg hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-transform duration-200 hover:scale-105 print:hidden"
          aria-label="Imprimir Currículo"
        >
          <PrinterIcon className="w-5 h-5" />
        </button>
      </main>
    </div>
  );
};

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, icon, children, className = '' }) => (
  <section className={`mb-10 print:mb-6 ${className}`}>
    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3 border-b-2 border-slate-200 pb-2 print:text-xl print:mb-4">
      {icon}
      <span>{title}</span>
    </h2>
    <div className="text-slate-700">{children}</div>
  </section>
);

const TimelineItem: React.FC<{ item: Experience; isLast: boolean }> = ({ item, isLast }) => (
  <li className="mb-10 ms-6 print:mb-6">
    <span className="absolute flex items-center justify-center w-6 h-6 bg-sky-100 rounded-full -start-3 ring-8 ring-white dark:ring-slate-50 dark:bg-sky-900 print:w-5 print:h-5 print:ring-4">
      <BriefcaseIcon className="w-3 h-3 text-sky-600 print:w-2.5 print:h-2.5" />
    </span>
    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 print:text-base">{item.role}</h3>
    <time className="block mb-2 text-sm font-normal leading-none text-gray-500 print:text-xs print:mb-1">{item.period} &bull; {item.company}</time>
    <p className="text-base font-normal text-gray-600 whitespace-pre-line print:text-sm">{item.description}</p>
  </li>
);

const App: React.FC = () => {
  const { name, title, summary, contact, experience, education, certifications, technicalSkills } = CV_DATA;
  const [activeTab, setActiveTab] = useState<'resume' | 'adapt'>('resume');

  const handlePrint = () => {
    window.print();
  };

  const getTabClass = (tabName: 'resume' | 'adapt') => {
    const baseClasses = "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium";
    if (activeTab === tabName) {
      return `${baseClasses} border-sky-500 text-sky-600`;
    }
    return `${baseClasses} border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700`;
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-slate-100 flex items-center justify-center print:bg-white print:p-0">
      <main className="container mx-auto max-w-6xl bg-white shadow-2xl rounded-2xl relative print:shadow-none print:rounded-none print:w-full print:max-w-none">
        
        <button 
          onClick={handlePrint} 
          className="absolute top-6 right-6 p-3 bg-sky-600 text-white rounded-full shadow-lg hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-transform duration-200 hover:scale-105 print:hidden"
          aria-label="Imprimir Currículo"
        >
          <PrinterIcon className="w-6 h-6"/>
        </button>

        <div className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12 print:grid-cols-3 print:gap-8 print:p-6">
          {/* Left Column (Sidebar) */}
          <aside className="lg:col-span-1 print:col-span-1">
            <div className="text-center lg:text-left">
                <img src={PROFILE_IMAGE_BASE64} alt="Foto do Perfil" className="w-41 h-41 rounded-full mx-auto mb-4 shadow-md border-4 border-white object-cover print:w-28 print:h-28 print:shadow-none print:border-2"/>
                <h1 className="text-4xl font-bold text-slate-900 print:text-3xl">{name}</h1>
                <p className="text-lg text-sky-600 font-medium mt-1 print:text-base print:mt-0.5">{title}</p>
            </div>

            <div className="mt-10 print:mt-6">
              <h3 className="text-xl font-semibold text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 print:text-lg print:mb-3">Contato</h3>
              <ul className="space-y-3 text-slate-700 print:space-y-2 print:text-sm">
                <li className="flex items-center gap-3">
                  <EnvelopeIcon className="w-5 h-5 text-sky-500 print:w-4 print:h-4" />
                  <a href={`mailto:${contact.email}`} className="hover:text-sky-600">{contact.email}</a>
                </li>
                <li className="flex items-center gap-3">
                  <PhoneIcon className="w-5 h-5 text-sky-500 print:w-4 print:h-4" />
                  <span>{contact.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPinIcon className="w-5 h-5 text-sky-500 print:w-4 print:h-4" />
                  <span>{contact.location}</span>
                </li>
                {contact.github && (
                  <li className="flex items-center gap-3">
                    <GithubIcon className="w-5 h-5 text-sky-500 print:w-4 print:h-4" />
                    <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-sky-600">
                      {contact.github.replace('github.com/', '@')}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div className="mt-10 print:mt-6">
              <h3 className="text-xl font-semibold text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 flex items-center gap-2 print:text-lg print:mb-3">
                <CpuChipIcon className="w-5 h-5 text-sky-600 print:w-4 print:h-4"/>
                <span>Competências Técnicas</span>
              </h3>
              {technicalSkills.map((group, index) => (
                <div key={index} className="mb-4 print:mb-2">
                  <h4 className="font-semibold text-slate-700 text-sm mb-2 print:mb-1">{group.category}</h4>
                  <div className="flex flex-wrap gap-1.5 print:gap-1">
                    {group.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="bg-slate-200 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-md print:px-2 print:py-0.5 print:text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 lg:hidden print:hidden">
              <Section title="Certificações" icon={<SparklesIcon className="w-6 h-6 text-sky-600" />}>
                {certifications.map((group, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="font-semibold text-slate-800 mb-2">{group.issuer}</h4>
                    <div>
                      {group.certs.map((cert, certIndex) => <Pill key={certIndex}>{cert}</Pill>)}
                    </div>
                  </div>
                ))}
              </Section>
            </div>
          </aside>
          
          {/* Right Column (Main Content) */}
          <div className="lg:col-span-2 print:col-span-2">
            {/* Tab Navigation */}
            <div className="mb-8 print:hidden">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <button onClick={() => setActiveTab('resume')} className={getTabClass('resume')}>
                    Meu Currículo
                  </button>
                  <button onClick={() => setActiveTab('adapt')} className={getTabClass('adapt')}>
                    Adaptar com IA
                  </button>
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'resume' && (
              <>
                <Section title="Resumo Profissional" icon={<UserIcon className="w-6 h-6 text-sky-600 print:w-5 print:h-5" />}>
                  <p className="leading-relaxed print:text-sm">{summary}</p>
                </Section>

                <Section title="Experiência Profissional" icon={<BriefcaseIcon className="w-6 h-6 text-sky-600 print:w-5 print:h-5" />}>
                  <ol className="relative border-s border-gray-200 dark:border-gray-700 ms-3">
                    {experience.map((item, index) => (
                      <TimelineItem 
                        key={index} 
                        item={item} 
                        isLast={index === experience.length - 1}
                      />
                    ))}
                  </ol>
                </Section>

                <Section title="Formação Acadêmica" icon={<AcademicCapIcon className="w-6 h-6 text-sky-600 print:w-5 print:h-5" />}>
                  <div className="space-y-6 print:space-y-4">
                    {education.map((edu, index) => (
                      <div key={index}>
                        <h3 className="text-lg font-semibold text-slate-800 print:text-base">{edu.degree}</h3>
                        <p className="text-sm text-slate-600 print:text-xs">{edu.institution} • {edu.period}</p>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section 
                  title="Certificações" 
                  icon={<SparklesIcon className="w-6 h-6 text-sky-600 print:w-5 print:h-5" />} 
                  className="hidden lg:block print:block"
                >
                  <div className="space-y-6 print:space-y-3">
                    {certifications.map((group, index) => (
                      <div key={index} className="mb-4 print:mb-2">
                        <h4 className="font-semibold text-slate-800 mb-2 print:mb-1">{group.issuer}</h4>
                        <div className="flex flex-wrap gap-2 print:gap-1">
                          {group.certs.map((cert, certIndex) => (
                            <span key={certIndex} className="bg-sky-100 text-sky-800 text-xs font-medium px-2.5 py-1 rounded-md print:px-2 print:py-0.5">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              </>
            )}

            {activeTab === 'adapt' && <AdaptResume />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;