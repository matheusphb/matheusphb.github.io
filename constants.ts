import { ProfileData } from './types';

export const CV_DATA: ProfileData = {
  name: "Matheus Costa de Araújo",
  title: "Analista de Suporte Técnico | Especialista em ERP | Engenheiro de Software em Formação",
  summary: "Analista de Suporte Técnico com experiência em sistemas ERP (WinThor, Procfit, Fortes AC), servidores e automação de processos. Atendo mais de 2.300 usuários, garantindo alta disponibilidade e segurança em ambientes críticos de TI. Atuação comprovada na resolução de falhas em rotinas fiscais, inventários e integrações com bancos de dados Oracle e SQL Server. Atualmente, curso Engenharia de Software e possuo certificações em Cloud (AWS, Google Cloud, Oracle) e Banco de Dados (MongoDB), buscando aplicar meu conhecimento em soluções escaláveis e seguras.",
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
      description: "Suporte especializado para os sistemas ERP TOTVS WinThor, Procfit e Fortes AC, atendendo mais de 2.300 usuários. Gestão e resolução de chamados técnicos envolvendo criação de usuários, perfis de acesso, auditorias e inventários. Correção de falhas em rotinas críticas (notas fiscais, PDVs, rejeições fiscais) e ajustes em integrações com bancos de dados Oracle e SQL Server. Manutenção e monitoramento de servidores Windows/Linux, assegurando alta disponibilidade e segurança. Desenvolvimento de scripts de automação que reduziram em aproximadamente 20% o tempo gasto em tarefas manuais. Apoio em projetos de integração com BI (Power BI) e melhorias contínuas.",
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
    { category: 'ERP e Gestão', skills: ['TOTVS Winthor (Varejo e Distribuição)', 'Procfit', 'Fortes AC'] },
    { category: 'Banco de Dados', skills: ['SQL', 'PL/SQL', 'Oracle Database', 'SQL Server', 'MongoDB', 'XML'] },
    { category: 'Cloud Computing', skills: ['AWS', 'Google Cloud Platform (GCP)', 'Oracle Cloud Infrastructure (OCI)'] },
    { category: 'Sistemas Operacionais', skills: ['Windows Server', 'Linux'] },
    { category: 'Infraestrutura como Código (IaC)', skills: ['Terraform'] },
    { category: 'Redes e Segurança', skills: ['VPC', 'Balanceamento de Carga', 'IAM', 'Segurança em Nuvem'] },
    { category: 'Automação e Programação', skills: ['Scripts de Automação', '.NET Framework (básico)', 'Lógica de Programação'] },
    { category: 'Outras Ferramentas', skills: ['Active Directory', 'Resolução de Problemas de Hardware e Software', 'Power BI (Integração com ERP)'] }
  ],
  certifications: [
    {
      issuer: "Google Cloud",
      certs: [
        "Google Cloud Computing Foundations (2024)",
        "Build Infrastructure with Terraform (2024)",
        "Build a Secure Google Cloud Network (2024)"
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
        "AWS Educate Introduction to Cloud 101 (2024)"
      ]
    },
    {
      issuer: "MongoDB",
      certs: [
        "MongoDB Database Administrator Path (2024)",
        "MongoDB Data Modeling (2024)",
        "MongoDB Indexes (2024)"
      ]
    },
    {
      issuer: "TOTVS",
      certs: [
        "TOTVS Varejo e Distribuição - Linha Winthor - Distribuidor (2023)"
      ]
    }
  ],
};
