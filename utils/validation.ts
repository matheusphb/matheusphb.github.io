import { ProfileData, SkillGroup } from '../types';

export const isProfileData = (value: unknown): value is ProfileData => {
  if (!value || typeof value !== 'object') return false;
  const data = value as Partial<ProfileData>;
  return (
    typeof data.name === 'string' &&
    typeof data.title === 'string' &&
    typeof data.summary === 'string' &&
    typeof data.contact === 'object' &&
    Array.isArray(data.experience) &&
    Array.isArray(data.education) &&
    Array.isArray(data.certifications) &&
    Array.isArray(data.technicalSkills) &&
    Array.isArray(data.recentHighlights) &&
    Array.isArray(data.projects)
  );
};

export const parseTechnicalSkills = (input: string): SkillGroup[] => {
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const separatorIndex = line.indexOf(':');
      if (separatorIndex === -1) return null;
      const category = line.slice(0, separatorIndex).trim();
      const skillsText = line
        .slice(separatorIndex + 1)
        .split(',')
        .map(skill => skill.trim())
        .filter(Boolean);

      if (!category || skillsText.length === 0) return null;
      
      const skills = skillsText.map(skillName => ({
        name: skillName,
        proficiency: 75 // Valor padrão
      }));
      
      return { category, skills };
    })
    .filter((group): group is SkillGroup => group !== null);
};
