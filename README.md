# 📄 Currículo Interativo - Matheus Costa

[![Deploy](https://github.com/matheusphb/matheusphb.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/matheusphb/matheusphb.github.io/actions/workflows/deploy.yml)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Um currículo digital moderno, totalmente editável e responsivo. Desenvolvido com **React**, **TypeScript** e **Tailwind CSS**.

🔗 **Acesse em:** [https://matheusphb.github.io](https://matheusphb.github.io)

---

## ✨ Funcionalidades Principais

### 🎨 Painel de Edição em Tempo Real
- ✏️ Edite seu nome, título profissional e resumo
- 📋 Atualize todas as informações de contato
- 🔧 Edite competências técnicas com suporte a categorias
- 📝 Editor JSON para edição avançada do currículo completo

### 💾 Persistência Automática
- 💪 Todas as mudanças são salvas no navegador (`localStorage`)
- 🔄 Seus dados não se perdem ao atualizar a página
- 🔁 Botão para restaurar dados padrão a qualquer momento

### 📥 Download e Impressão
- 📄 Baixe seu currículo em **PDF** formatado profissionalmente
- 🖨️ Versão otimizada para impressão via `Ctrl+P`
- 📐 Bordas e espaçamentos ajustados para papel A4

### 📱 Design Responsivo
- 📱 Visualização perfeita em smartphones, tablets e desktops
- 🎯 Layout fluido que se adapta ao tamanho da tela

---

## 🚀 Como Começar

### 1. Clonar o Projeto

```bash
git clone https://github.com/matheusphb/matheusphb.github.io.git
cd matheusphb.github.io
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Rodar em Desenvolvimento

```bash
npm run dev
```

Acesse: **http://localhost:5173**

### 4. Build para Produção

```bash
npm run build
```

---

## 📍 Páginas Disponíveis

### 🏠 Página Principal (`/`)
- Visualização do currículo formatado
- Botão "Painel" para edição
- Opções para baixar PDF e imprimir

### ⚙️ Painel de Controle (`/#/painel`)
- Edição completa de todas as seções
- Interface dedicada e focada
- Botão para voltar ao CV

---

## 🎨 Como Alterar o Visual

### 🖌️ Estrutura e Layout (`src/App.tsx` e `src/pages/HomePage.tsx`)
Nestes arquivos está toda a organização visual:
- Onde fica o cabeçalho e estrutura das seções
- Como a timeline de experiência é desenhada
- Como o painel de edição funciona
- Layout responsivo para diferentes tamanhos de tela

**Para modificar:**
- Altere classes Tailwind CSS (ex: `lg:col-span-2` para `lg:col-span-3`)
- Reorganize os componentes `<Section>` para mudar a ordem das seções
- Ajuste o grid com `grid-cols-1`, `grid-cols-2`, etc.

---

### 🎨 Estilos e Cores (`src/index.css`)
É aqui que definimos:
- Fontes principais (Inter)
- Cores de fundo e destaques
- Efeitos de transição e hover
- **Regras de impressão** (garantem que o PDF saia perfeito)

**Para alterar cores:**
```css
/* Procure por classes como: */
bg-slate-900    /* Fundo escuro */
bg-sky-600      /* Cor de destaque */
border-slate-300 /* Cor de bordas */
text-slate-700   /* Cor de texto */

/* E troque para (exemplos): */
bg-emerald-900   /* Verde escuro */
bg-purple-600    /* Roxo */
border-gray-300  /* Cinza */
text-gray-700    /* Cinza escuro */
```

---

### 🏷️ Componentes Menores (`src/components/Pill.tsx`)
Define o visual das "Pills" (etiquetas de tecnologias como React, TypeScript).

**Para modificar:**
- Altere classes Tailwind para cores diferentes
- Mude o tamanho (padding, font-size)
- Adicione efeitos de hover diferentes

---

### 📝 Dados do Conteúdo (`src/constants.ts`)
Aqui você altera todo o texto:
- Nome, título, resumo profissional
- Experiência profissional
- Educação e certificações
- Competências técnicas
- Destaques e projetos

**Exemplo:**
```typescript
export const CV_DATA: ProfileData = {
  name: "Seu Nome Aqui",
  title: "Seu Título Profissional",
  summary: "Seu resumo profissional aqui...",
  // ... resto dos dados
};
```

O design pega esses dados e os encaixa no layout automaticamente!

---

## 💡 Dicas Práticas de Customização

### Trocar Cores Principais
1. Abra `src/App.tsx`
2. Procure por classes como `bg-blue-400` ou `text-sky-600`
3. Substitua pelos valores que preferir
   - `bg-slate-900` → `bg-emerald-900`
   - `text-sky-600` → `text-purple-600`

### Trocar Ícones
1. Abra `src/components/Icons.tsx`
2. Os ícones estão como componentes React
3. Substitua pelos ícones que preferir (mesma biblioteca)

### Adicionar Novas Seções
1. Vá para `src/pages/HomePage.tsx`
2. Copie um `<Section>` existente
3. Altere o conteúdo e o ícone
4. Adicione os dados em `src/constants.ts`

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Função |
|------------|--------|
| **React 18** | Biblioteca UI |
| **TypeScript** | Tipagem estática |
| **Vite** | Build rápido |
| **Tailwind CSS** | Estilização utilitária |
| **React Router** | Roteamento entre páginas |
| **html2pdf.js** | Exportação em PDF |

---

## 📁 Estrutura do Projeto

```
src/
├── App.tsx                 # Router e gerenciador de estado global
├── index.tsx              # Entry point da aplicação
│
├── pages/
│   ├── HomePage.tsx       # Visualização e layout do CV
│   └── PanelPage.tsx      # Painel de edição
│
├── components/
│   ├── ControlPanel.tsx   # Formulário de edição
│   ├── FloatingButton.tsx # Botão flutuante "Painel"
│   ├── Pill.tsx           # Tag/etiqueta de skill
│   └── Icons.tsx          # Ícones SVG customizados
│
├── utils/
│   └── validation.ts      # Funções de validação de dados
│
├── constants.ts           # Dados iniciais do CV
├── types.ts              # Interfaces TypeScript
└── index.css             # Estilos globais e utilitários
```

---

## 🚀 Deploy Automático

O projeto está configurado para **deploy automático no GitHub Pages**:

1. **Faça alterações localmente**
2. **Commit e push para `main`:**
   ```bash
   git add -A
   git commit -m "sua mensagem aqui"
   git push
   ```
3. **Aguarde 1-2 minutos** - site atualiza automaticamente!

---

## 📚 Documentação Técnica

Para detalhes técnicos sobre arquitetura de componentes, consulte [ARQUITETURA.md](./ARQUITETURA.md).

---

## 🎯 Funcionalidades em Roadmap

- [ ] Edição avançada de experiência profissional no painel
- [ ] Upload de foto do perfil
- [ ] Temas personalizáveis (claro/escuro)
- [ ] Exportar em múltiplos formatos (Word, Markdown)
- [ ] Preview em tempo real do PDF

---

## 📝 Licença

Este projeto está sob a licença MIT.

---

## 📞 Contato

**Matheus Costa de Araújo**
- Email: mateusphb20@gmail.com
- GitHub: [@matheusphb](https://github.com/matheusphb)
- LinkedIn: [Matheus Costa](https://www.linkedin.com/in/matheus-costa-05093b254/)

---

**Desenvolvido com ❤️ por Matheus Costa**
