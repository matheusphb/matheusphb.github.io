export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  github?: string;
  linkedin?: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}
