import { ProfileData } from './types';

export const CV_DATA: ProfileData = {
  name: "Matheus Costa de Araújo",
  title: "Analista de Suporte Técnico | Engenheiro de Software em Formação",
  summary: "Analista de Suporte Técnico com mais de 2 anos de experiência em ambientes de TI complexos, especializado em sistemas ERP, servidores e automação. Tenho uma sólida trajetória de 9 anos em logística e operações de varejo na Casa o Toureiro, o que me proporciona uma visão de negócio única. Atualmente, estou aprimorando minhas habilidades técnicas através da graduação em Engenharia de Software e múltiplas certificações em Cloud (AWS, Google Cloud, Oracle) e bancos de dados (SQL, MongoDB), buscando aplicar meu conhecimento para desenvolver soluções de software eficientes e escaláveis.",
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
      description: "Presto suporte especializado para o sistema ERP TOTVS Winthor, atendendo a mais de 2320 usuários e garantindo a continuidade das operações de varejo. Realizo a manutenção e o monitoramento de servidores Windows e Linux, assegurando alta disponibilidade e segurança dos dados da empresa. Desenvolvo e implemento scripts para automação de processos técnicos, o que reduziu o tempo gasto em tarefas manuais em aproximadamente 20%. Utilizo SQL e PL/SQL para realizar consultas complexas e extrair dados para análise de negócio, apoiando a tomada de decisões estratégicas.",
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
    { category: 'Cloud Computing', skills: ['AWS', 'Google Cloud Platform (GCP)', 'Oracle Cloud Infrastructure (OCI)'] },
    { category: 'Banco de Dados', skills: ['SQL', 'PL/SQL', 'Oracle Database', 'MongoDB', 'XML'] },
    { category: 'Sistemas Operacionais', skills: ['Windows Server', 'Linux'] },
    { category: 'ERP', skills: ['TOTVS Winthor (Varejo e Distribuição)'] },
    { category: 'Infraestrutura como Código (IaC)', skills: ['Terraform'] },
    { category: 'Redes e Segurança', skills: ['VPC', 'Balanceamento de Carga', 'IAM', 'Segurança em Nuvem'] },
    { category: 'Linguagens e Frameworks', skills: ['Conhecimento em .NET Framework', 'Lógica de Programação'] },
    { category: 'Outras Ferramentas', skills: ['Active Directory', 'Resolução de Problemas de Hardware e Software'] }
  ],
  certifications: [
    {
      issuer: "Google Cloud",
      certs: [
        "Google Cloud Computing Foundations",
        "Build Infrastructure with Terraform",
        "Build a Secure Google Cloud Network"
      ]
    },
    {
      issuer: "Oracle",
      certs: [
        "Oracle Cloud Infrastructure 2025 Foundations Associate"
      ]
    },
    {
      issuer: "Amazon Web Services",
      certs: [
        "AWS Educate Introduction to Cloud 101"
      ]
    },
     {
      issuer: "MongoDB",
      certs: [
        "MongoDB Database Administrator Path",
        "MongoDB Data Modeling",
        "MongoDB Indexes"
      ]
    },
    {
      issuer: "TOTVS",
      certs: [
        "TOTVS Varejo e Distribuição - Linha Winthor - Distribuidor"
      ]
    }
  ],
};
