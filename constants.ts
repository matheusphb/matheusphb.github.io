import { ResumeData } from './types';

export const INITIAL_DATA: ResumeData = {
  name: "Matheus Costa de Araújo",
  title: "Analista de Suporte ERP | Specialist em Automação",
  summary: "Analista de Suporte ERP e graduando em Engenharia de Software, com foco em automação de processos, administração de bancos de dados e resolução de incidentes críticos.",
  email: "mateusphb20@gmail.com",
  phone: "+55 (86) 99449-1061",
  location: "Parnaíba, PI, Brasil",
  github: "github.com/matheusphb",
  linkedin: "linkedin.com/in/matheusphb",
  experience: [
    {
      id: "1",
      role: "Analista de Suporte Técnico",
      company: "Casa o Toureiro",
      period: "2023 - Presente",
      description: "Automação de Infraestrutura com PowerShell, administração de bancos Oracle 19c e suporte WinThor.",
      tags: ["PowerShell", "Oracle", "WinThor"]
    }
  ],
  education: [
    {
      id: "e1",
      degree: "Bacharelado em Engenharia de Software",
      institution: "UniCesumar",
      period: "2022 - 2026"
    }
  ],
  skills: [
    { name: "Oracle SQL", level: 90, category: "Database" },
    { name: "PowerShell", level: 88, category: "Automation" },
    { name: "React", level: 75, category: "Frontend" }
  ]
};
