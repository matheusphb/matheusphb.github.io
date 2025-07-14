# Currículo Interativo - Matheus Costa de Araújo

[![Deploy](https://github.com/matheusphb/matheusphb.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/matheusphb/matheusphb.github.io/actions/workflows/deploy.yml)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-matheusphb.github.io-brightgreen)](https://matheusphb.github.io)

Um currículo interativo desenvolvido com React, TypeScript e Vite, com funcionalidades modernas e layout responsivo.

## 🌟 Sobre o Projeto

Este projeto é uma versão digital e interativa do meu currículo pessoal, desenvolvido para demonstrar habilidades técnicas e oferecer uma apresentação mais dinâmica das minhas experiências profissionais e acadêmicas. O currículo conta com um design moderno, responsivo e funcionalidades avançadas de impressão.

## 🚀 Funcionalidades

- **Design Responsivo**: Adaptável para desktop, tablet e mobile
- **Impressão Otimizada**: Layout específico para impressão em PDF
- **Interface Moderna**: Design limpo e profissional
- **Componentes Reutilizáveis**: Arquitetura bem estruturada
- **TypeScript**: Tipagem estática para maior confiabilidade

## 🛠️ Tecnologias Utilizadas

- **React** - Biblioteca para construção da interface
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Ferramenta de build rápida e moderna
- **Tailwind CSS** - Framework CSS utilitário (via classes inline)
- **Heroicons** - Ícones SVG otimizados

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## 🔧 Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/matheusphb/matheusphb.github.io.git
   cd matheusphb.github.io
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Abra o navegador em [http://localhost:5173](http://localhost:5173)

## 📦 Build para Produção

Para gerar os arquivos otimizados para produção:

```bash
npm run build
```

Para visualizar o build localmente:

```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
├── components/          # Componentes reutilizáveis
│   ├── Icons.tsx       # Ícones customizados
│   └── Pill.tsx        # Componente de tag/pill
├── public/             # Arquivos estáticos
│   ├── perfil.jpg      # Foto de perfil
│   └── perfil.png      # Foto de perfil alternativa
├── App.tsx             # Componente principal
├── assets.ts           # Recursos e imagens em base64
├── constants.ts        # Dados do currículo
├── types.ts            # Definições de tipos TypeScript
├── index.tsx           # Ponto de entrada da aplicação
└── vite.config.ts      # Configuração do Vite
```

## 🎨 Personalização

Para personalizar o currículo com suas informações:

1. Edite o arquivo `constants.ts` com seus dados pessoais
2. Substitua as imagens em `public/` pela sua foto de perfil
3. Ajuste os estilos no arquivo `App.tsx` conforme necessário

## 📱 Funcionalidades Especiais

- **Botão de Impressão**: Permite salvar o currículo em PDF diretamente do navegador
- **Timeline Interativa**: Experiência profissional apresentada em formato timeline
- **Seções Organizadas**: Divisão clara entre experiência, educação e habilidades
- **Responsividade**: Layout que se adapta a diferentes tamanhos de tela

## 🚀 Deploy

O projeto está configurado para deploy automático no GitHub Pages através do domínio [matheusphb.github.io](https://matheusphb.github.io).

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar como template para seu próprio currículo.

## 🤝 Contribuições

Contribuições são sempre bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir melhorias
- Enviar pull requests

## 📧 Contato

**Matheus Costa de Araújo**
- Email: mateusphb20@gmail.com
- GitHub: [@matheusphb](https://github.com/matheusphb)
- LinkedIn: [Matheus Costa de Araújo](https://www.linkedin.com/in/matheus-costa-05093b254/)
