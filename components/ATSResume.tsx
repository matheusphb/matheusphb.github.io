import { ResumeData } from '../types';

interface ATSResumeProps {
  data: ResumeData;
}

export function ATSResume({ data }: ATSResumeProps) {
  return (
    <div className="w-full bg-white text-gray-800 font-serif">
      <style>{`
        @page {
          margin: 0.5in;
          size: letter;
        }
        
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .ats-resume {
            max-width: 100%;
            padding: 0.5in;
          }
          .ats-section {
            page-break-inside: avoid;
          }
        }
        
        body {
          line-height: 1.4;
        }
        
        .ats-resume {
          max-width: 8.5in;
          margin: 0 auto;
          line-height: 1.4;
        }
      `}</style>

      <div className="ats-resume px-4 py-6">
        {/* Header */}
        <div className="border-b border-gray-800 pb-3 mb-4 ats-section">
          <h1 className="text-2xl font-bold text-gray-900 mb-0.5">{data.name}</h1>
          <p className="text-sm font-semibold text-gray-700 mb-2">{data.title}</p>
          
          <div className="flex flex-wrap gap-3 text-xs">
            {data.email && <div>{data.email}</div>}
            {data.phone && <div>{data.phone}</div>}
            {data.location && <div>{data.location}</div>}
          </div>
          {(data.github || data.linkedin) && (
            <div className="flex flex-wrap gap-3 text-xs mt-1">
              {data.github && <div>{data.github}</div>}
              {data.linkedin && <div>{data.linkedin}</div>}
            </div>
          )}
        </div>

        {/* Professional Summary */}
        {data.summary && (
          <div className="mb-3 ats-section">
            <h2 className="text-sm font-bold text-gray-900 mb-1 uppercase">Professional Summary</h2>
            <p className="text-justify text-xs leading-tight">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-3 ats-section">
            <h2 className="text-sm font-bold text-gray-900 mb-1 uppercase">Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-2 ats-section">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="font-bold text-gray-900 text-xs">{exp.role}</p>
                  <p className="text-xs text-gray-600">{exp.period}</p>
                </div>
                <p className="text-gray-700 font-semibold text-xs">{exp.company}</p>
                <p className="text-justify text-xs leading-tight mt-0.5">{exp.description}</p>
                {exp.tags && exp.tags.length > 0 && (
                  <p className="text-xs text-gray-600 mt-0.5">Keywords: {exp.tags.join(', ')}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-3 ats-section">
            <h2 className="text-sm font-bold text-gray-900 mb-1 uppercase">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-2 ats-section">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="font-bold text-gray-900 text-xs">{edu.degree}</p>
                  <p className="text-xs text-gray-600">{edu.period}</p>
                </div>
                <p className="text-gray-700 text-xs">{edu.institution}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-3 ats-section">
            <h2 className="text-sm font-bold text-gray-900 mb-1 uppercase">Skills</h2>
            {Array.from(new Set(data.skills.map((s) => s.category))).map((category) => (
              <div key={category} className="mb-2">
                <p className="font-semibold text-gray-900 text-xs">{category}</p>
                <p className="text-gray-700 text-xs">
                  {data.skills
                    .filter((s) => s.category === category)
                    .map((s) => `${s.name} (${s.level}%)`)
                    .join(', ')}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="mb-3 ats-section">
            <h2 className="text-sm font-bold text-gray-900 mb-1 uppercase">Languages</h2>
            <p className="text-gray-700 text-xs">
              {data.languages.map((lang) => `${lang.name} - ${lang.level}`).join(', ')}
            </p>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-3 ats-section">
            <h2 className="text-sm font-bold text-gray-900 mb-1 uppercase">Projects</h2>
            {data.projects.map((proj, idx) => (
              <div key={idx} className="mb-2 ats-section">
                <p className="font-bold text-gray-900 text-xs">{proj.name}</p>
                <p className="text-justify text-xs leading-tight">{proj.description}</p>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className="text-xs text-gray-600 mt-0.5">Technologies: {proj.technologies.join(', ')}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="ats-section">
            <h2 className="text-sm font-bold text-gray-900 mb-1 uppercase">Certifications</h2>
            {data.certifications.map((cert, idx) => (
              <div key={idx} className="mb-1 ats-section">
                <p className="font-semibold text-gray-900 text-xs">{cert.name}</p>
                <p className="text-gray-700 text-xs">
                  {cert.issuer} - {cert.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
