import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CV_DATA } from '../constants';
import { Experience, ProfileData } from '../types';
import Pill from '../components/Pill';
import html2pdf from 'html2pdf.js';
import { BriefcaseIcon, AcademicCapIcon, SparklesIcon, UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, PrinterIcon, DownloadIcon, GithubIcon } from '../components/Icons';
import profileImage from '../perfil.png?url';
import { isProfileData } from '../utils/validation';

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

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, icon, children, className = '' }) => (
  <section className={`mb-10 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm print:mb-6 print:rounded-none print:border-slate-300 print:shadow-none ${className}`}>
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

const HomePage: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>(() => loadProfileData());
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { name, title, summary, contact, experience, education, certifications, technicalSkills, recentHighlights, projects } = profileData;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData));
  }, [profileData]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!contentRef.current) return;
    
    setIsGeneratingPdf(true);
    try {
      const element = contentRef.current;
      const width = element.scrollWidth;
      const height = element.scrollHeight;
      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'matheus-costa-de-araujo-curriculo.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 1.5,
          useCORS: true,
          backgroundColor: '#ffffff',
          windowWidth: width,
          windowHeight: height,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy', 'avoid-all'] },
      } as const;

      await html2pdf().set(opt).from(element).save();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-slate-100 flex items-center justify-center print:bg-white print:p-0">
      <main className="container mx-auto max-w-6xl bg-white border border-slate-200 shadow-2xl rounded-2xl relative print:shadow-none print:rounded-none print:border-slate-300 print:w-full print:max-w-none">
        <div className="sticky top-4 z-20 flex justify-end gap-3 px-4 pt-4 sm:px-8 sm:pt-6 print:hidden">
          <Link
            to="/painel"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg shadow-lg hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 transition-transform duration-200 hover:scale-105"
            aria-label="Abrir painel de controle"
          >
            <span className="text-sm font-medium">Painel</span>
          </Link>
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg shadow-lg hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-sky-300 transition-transform duration-200 hover:scale-105"
            aria-label="Baixar Currículo em PDF"
          >
            {isGeneratingPdf ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium">Gerando...</span>
              </>
            ) : (
              <>
                <DownloadIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Baixar PDF</span>
              </>
            )}
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg shadow-lg hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-300 transition-transform duration-200 hover:scale-105"
            aria-label="Imprimir Currículo"
          >
            <PrinterIcon className="w-5 h-5"/>
            <span className="text-sm font-medium">Imprimir</span>
          </button>
        </div>

        <div ref={contentRef} className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12 print:grid-cols-3 print:gap-8 print:p-6 print:text-slate-900">
          {/* Left Column (Sidebar) */}
          <aside className="lg:col-span-1 print:col-span-1 lg:pr-8 lg:border-r lg:border-slate-200 print:border-slate-300">
            <div className="text-center lg:text-left">
                <img src={profileImage} alt="Foto do Perfil" className="w-40 h-40 rounded-full mx-auto mb-4 shadow-md border-4 border-white object-cover print:w-28 print:h-28 print:shadow-none print:border-2"/>
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
          <div className="lg:col-span-2 print:col-span-2 lg:pl-2">
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

            <Section title="Destaques Recentes" icon={<SparklesIcon className="w-6 h-6 text-sky-600 print:w-5 print:h-5" />}>
              <div className="grid gap-4 md:grid-cols-2 print:gap-3">
                {recentHighlights.map((item, index) => (
                  <article key={index} className="rounded-xl border-2 border-slate-300 bg-slate-50 p-4 shadow-sm print:p-3 print:rounded-lg print:border-slate-400 hover:shadow-md transition-shadow">
                    <h3 className="text-base font-semibold text-slate-800 mb-2 print:text-sm">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600 print:text-xs">{item.description}</p>
                  </article>
                ))}
              </div>
            </Section>

            <Section title="Projetos e Conquistas" icon={<SparklesIcon className="w-6 h-6 text-sky-600 print:w-5 print:h-5" />}>
              <div className="space-y-4 print:space-y-3">
                {projects.map((item, index) => (
                  <div key={index} className="rounded-xl border-2 border-slate-300 bg-white p-4 print:p-3 print:border-slate-400 hover:shadow-md transition-shadow">
                    <h3 className="text-base font-semibold text-slate-800 mb-1 print:text-sm">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600 print:text-xs">{item.description}</p>
                  </div>
                ))}
              </div>
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
