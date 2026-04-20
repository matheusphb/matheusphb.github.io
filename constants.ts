import { ResumeData } from './types';

export const INITIAL_DATA: ResumeData = {
  name: "Matheus Costa de Araújo",
  title: "Analista de Suporte ERP | Especialista em Automação e Administração de Bancos de Dados",
  summary: "Analista de Suporte ERP e graduando em Engenharia de Software, com foco em automação de processos, administração de bancos de dados e resolução de incidentes críticos. Atuação voltada à padronização de ambientes, análise de performance e sustentação de operações em sistemas corporativos de alta demanda.",
  email: "mateusphb20@gmail.com",
  phone: "+55 (86) 99449-1061",
  location: "Parnaíba, PI, Brasil",
  github: "https://github.com/matheusphb",
  linkedin: "https://www.linkedin.com/in/matheus-costa-05093b254/",
  experience: [
    {
      id: "1",
      role: "Analista de Suporte Técnico",
      company: "Casa o Toureiro",
      period: "junho de 2023 - presente",
      description: "Automação de infraestrutura com PowerShell para instalação de bancos de dados em PDVs, manutenção de servidores Windows/Linux e bancos críticos, migração de ambientes Oracle 19c e suporte especializado em rotinas do WinThor para mais de 2300 usuários.",
      tags: ["PowerShell", "Oracle 19c", "WinThor", "Windows/Linux"]
    },
    {
      id: "2",
      role: "Encarregado da Logística de Devolução",
      company: "Casa o Toureiro",
      period: "junho de 2022 - maio de 2023",
      description: "Coordenação da logística reversa, otimização do processo de devolução de mercadorias, redução de 15% em perdas e garantia de conformidade nos procedimentos de recebimento e reenvio de produtos.",
      tags: ["Logística", "Processos", "Conformidade"]
    },
    {
      id: "3",
      role: "Encarregado de Abastecimentos",
      company: "Casa o Toureiro",
      period: "maio de 2019 - junho de 2022",
      description: "Gestão de reabastecimento para 3 Centros de Distribuição e 11 filiais, controle de estoque e otimização dos fluxos de recebimento e distribuição de mercadorias via ERP.",
      tags: ["ERP", "Estoque", "Distribuição"]
    },
    {
      id: "4",
      role: "Auxiliar de Depósito",
      company: "Casa o Toureiro",
      period: "junho de 2018 - maio de 2019",
      description: "Suporte às operações de armazenamento e logística interna, com controle e organização de produtos.",
      tags: ["Depósito", "Logística", "Operações"]
    },
    {
      id: "5",
      role: "Conferente de Mercadorias",
      company: "Casa o Toureiro",
      period: "fevereiro de 2016 - junho de 2018",
      description: "Verificação de entradas e saídas de mercadorias, assegurando a conformidade dos processos.",
      tags: ["Conferência", "Qualidade", "Processos"]
    },
    {
      id: "6",
      role: "Separador de Mercadorias",
      company: "Casa o Toureiro",
      period: "agosto de 2015 - fevereiro de 2016",
      description: "Organização e separação de mercadorias para uma distribuição eficiente.",
      tags: ["Separação", "Distribuição", "Operação"]
    }
  ],
  education: [
    {
      id: "e1",
      degree: "Bacharelado em Engenharia de Software",
      institution: "UniCesumar",
      period: "conclusão prevista para julho de 2026"
    }
  ],
  skills: [
    { name: "Oracle (PL/SQL, 11g/18c/19c)", level: 96, category: "Bancos de Dados" },
    { name: "SQL Server", level: 90, category: "Bancos de Dados" },
    { name: "Firebird", level: 84, category: "Bancos de Dados" },
    { name: "MongoDB", level: 82, category: "Bancos de Dados" },
    { name: "PowerShell", level: 96, category: "Linguagens e Automação" },
    { name: "Python (Selenium)", level: 86, category: "Linguagens e Automação" },
    { name: ".NET Framework", level: 74, category: "Linguagens e Automação" },
    { name: "Scripts de automação de sistema", level: 92, category: "Linguagens e Automação" },
    { name: "TOTVS", level: 95, category: "Sistemas ERP" },
    { name: "WinThor", level: 96, category: "Sistemas ERP" },
    { name: "Rotinas fiscais e de distribuição", level: 90, category: "Sistemas ERP" },
    { name: "ProcFit", level: 84, category: "Sistemas ERP" },
    { name: "AWS", level: 76, category: "Cloud e Infra" },
    { name: "Google Cloud", level: 74, category: "Cloud e Infra" },
    { name: "Oracle Cloud Infrastructure (OCI)", level: 72, category: "Cloud e Infra" },
    { name: "Terraform", level: 68, category: "Cloud e Infra" },
    { name: "Windows Server", level: 88, category: "Sistemas Operacionais" },
    { name: "Linux", level: 80, category: "Sistemas Operacionais" },
    { name: "Active Directory", level: 86, category: "Sistemas Operacionais" },
    { name: "Power BI", level: 78, category: "Outras Ferramentas" },
    { name: "Hardware/software troubleshooting", level: 85, category: "Outras Ferramentas" }
  ]
};
