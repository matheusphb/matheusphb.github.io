import { ProfileData } from './types';

export const CV_DATA: ProfileData = {
  name: "Matheus Costa de Araújo",
  title: "Analista de Suporte ERP | Especialista em Automação e Administração de Bancos de Dados",
  summary: "Analista de Suporte ERP e graduando em Engenharia de Software, com foco em automação de processos, administração de bancos de dados e resolução de incidentes críticos. Atuação voltada à padronização de ambientes, análise de performance e sustentação de operações em sistemas corporativos de alta demanda.",
  contact: {
    email: "mateusphb20@gmail.com",
    phone: "+55 (86) 99449-1061",
    location: "Parnaíba, PI, Brasil",
    github: "github.com/matheusphb"
  },
  experience: [
    {
      role: "Analista de Suporte Técnico",
      company: "Casa o Toureiro",
      period: "junho de 2023 - presente",
      description: "• Automação de Infraestrutura: Desenvolvimento e implementação de scripts em PowerShell para automatizar a instalação de bancos de dados em PDVs, reduzindo drasticamente o tempo de configuração manual e garantindo a padronização do ambiente.\n• Administração de Dados: Responsável pela manutenção de servidores Windows/Linux e bancos de dados críticos, realizando a migração e configuração de ambientes de teste Oracle 19c idênticos à produção para validação segura de processos.\n• Análise de Performance: Execução de auditorias e análises de gargalos em bancos de dados de larga escala, utilizando scripts de diagnóstico para identificar falhas estruturais e de performance diretamente em produção.\n• Suporte Especializado ERP: Resolução de erros complexos em rotinas do WinThor por meio de traces e análise profunda de dicionários de dados, garantindo a continuidade da operação para mais de 2300 usuários.",
    },
    {
      role: "Encarregado da Logística de Devolução",
      company: "Casa o Toureiro",
      period: "junho de 2022 - maio de 2023",
      description: "Coordenei a logística reversa, otimizando o processo de devolução de mercadorias e alcançando uma redução de 15% em perdas. Garanti 100% de conformidade nos procedimentos de recebimento e reenvio de produtos, melhorando a comunicação com fornecedores e clientes.",
    },
    {
      role: "Encarregado de Abastecimentos",
      company: "Casa o Toureiro",
      period: "maio de 2019 - junho de 2022",
      description: "Gerenciei o reabastecimento de produtos para 3 Centros de Distribuição e 11 filiais, mantendo os níveis de estoque ideais e evitando rupturas. Otimizei os fluxos de recebimento e distribuição de mercadorias, utilizando o sistema ERP para controle de suprimentos.",
    },
    {
      role: "Auxiliar de Depósito",
      company: "Casa o Toureiro",
      period: "junho de 2018 - maio de 2019",
      description: "Prestei suporte às operações de armazenamento e logística interna, controlando e organizando os produtos.",
    },
    {
      role: "Conferente de Mercadorias",
      company: "Casa o Toureiro",
      period: "fevereiro de 2016 - junho de 2018",
      description: "Realizei a verificação de entradas e saídas de mercadorias, assegurando a conformidade dos processos.",
    },
    {
      role: "Separador de Mercadorias",
      company: "Casa o Toureiro",
      period: "agosto de 2015 - fevereiro de 2016",
      description: "Responsável pela organização e separação de mercadorias para uma distribuição eficiente.",
    },
  ],
  education: [
    {
      degree: "Bacharelado em Engenharia de Software",
      institution: "UniCesumar",
      period: "Conclusão prevista para Julho de 2026",
    }
  ],
  technicalSkills: [
    { category: 'Bancos de Dados', skills: ['Oracle (PL/SQL, 11g/18c/19c)', 'SQL Server', 'Firebird', 'MongoDB'] },
    { category: 'Linguagens e Automação', skills: ['PowerShell (Automação de Infra)', 'Python (Selenium para Web Scraping)', '.NET Framework', 'Scripts de automação de sistema'] },
    { category: 'Sistemas ERP', skills: ['Domínio do ecossistema TOTVS WinThor', 'Rotinas fiscais e de distribuição', 'ProcFit'] },
    { category: 'Cloud e Infra', skills: ['AWS', 'Google Cloud', 'Oracle Cloud Infrastructure (OCI)', 'Terraform'] },
    { category: 'Sistemas Operacionais', skills: ['Windows Server', 'Linux', 'Active Directory', 'Gerenciamento de usuários'] },
    { category: 'Outras Ferramentas', skills: ['Power BI', 'Resolução de problemas de hardware/software'] }
  ],
  recentHighlights: [
    {
      title: 'Automação de Infraestrutura',
      description: 'Desenvolvimento e implementação de scripts em PowerShell para automatizar a instalação de bancos de dados em PDVs, reduzindo o tempo de configuração manual e padronizando ambientes.',
    },
    {
      title: 'Administração de Dados',
      description: 'Manutenção de servidores Windows/Linux e bancos de dados críticos, com migração e configuração de ambientes de teste Oracle 19c idênticos à produção.',
    },
    {
      title: 'Análise de Performance',
      description: 'Auditorias e análises de gargalos em bancos de dados de larga escala, com scripts de diagnóstico para identificar falhas estruturais e de performance em produção.',
    },
    {
      title: 'Suporte Especializado ERP',
      description: 'Resolução de erros complexos em rotinas do WinThor por meio de traces e análise profunda de dicionários de dados, sustentando a operação para mais de 2300 usuários.',
    },
  ],
  projects: [
    {
      title: 'MVP Android e Reporte Crítico',
      description: 'Desenvolvimento de aplicativos MVP para Android e histórico de reporte de falhas críticas em sistemas de software.',
    },
    {
      title: 'Fábrica de Software',
      description: 'Planejamento de padronização de processos de desenvolvimento utilizando modelos CMMI e MPS.BR.',
    },
  ],
  certifications: [
    {
      issuer: "Google Cloud",
      certs: [
        "Google Cloud Computing Foundations (2025)",
        "Build Infrastructure with Terraform (2025)",
        "Build a Secure Google Cloud Network (2025)"
      ]
    },
    {
      issuer: "Oracle",
      certs: [
        "Oracle Cloud Infrastructure 2025 Foundations Associate (2025)"
      ]
    },
    {
      issuer: "Amazon Web Services",
      certs: [
        "AWS Educate Introduction to Cloud 101 (2025)"
      ]
    },
    {
      issuer: "MongoDB",
      certs: [
        "MongoDB Database Administrator Path (2025)",
        "MongoDB Data Modeling (2025)",
        "MongoDB Indexes (2025)"
      ]
    },
    {
      issuer: "TOTVS",
      certs: [
        "TOTVS Varejo e Distribuição - Linha Winthor - Distribuidor (2025)"
      ]
    }
  ],
};
