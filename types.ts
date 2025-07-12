
export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface CertificationGroup {
  issuer: string;
  certs: string[];
}

export interface Contact {
    email: string;
    phone: string;
    location: string;
    github?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  summary: string;
  contact: Contact;
  experience: Experience[];
  education: Education[];
  certifications: CertificationGroup[];
  technicalSkills: SkillGroup[];
}
