# Criador - Arrastar para Imagem e Texto (Drag to Reveal)

Ferramenta interativa para criação de componentes educacionais de **"Arrastar / Clicar para Revelar Informações"**, com gerador de código HTML/CSS/JS 100% autônomo e isolado (`all: initial`), pronto para incorporação (embed) em LMS, Moodle, Google Sites, Canvas, Blackboard e plataformas de e-learning.

---

## 🚀 Publicação no GitHub e GitHub Pages

Este projeto já está pré-configurado com caminhos relativos (`base: './'`) e fluxo automatizado com **GitHub Actions** (`.github/workflows/deploy.yml`).

### Opção 1: Exportar direto do Google AI Studio Build
1. No menu superior ou de configurações do AI Studio, clique em **Export to GitHub** ou baixe o arquivo **ZIP**.
2. No seu repositório do GitHub, vá em **Settings** > **Pages** (na barra lateral esquerda).
3. Em **Build and deployment** > **Source**, selecione **GitHub Actions**.
4. Ao fazer qualquer commit/push na branch `main`, a compilação e publicação acontecerão automaticamente!

### Opção 2: Publicação Manual via Git
```bash
# 1. Inicialize o repositório git (se ainda não o fez)
git init
git add .
git commit -m "feat: configuracao inicial e deploy no GitHub Pages"

# 2. Conecte ao seu repositório no GitHub
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

---

## 🛠️ Execução Local

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev

# 3. Gerar a versão de produção
npm run build
```

---

## ✨ Funcionalidades Principais

- 🎨 **Contraste Automático de Cores**: Ao selecionar cores de preenchimento escuras para o card clicado, o texto e subtítulo adaptam-se automaticamente para branco de alto contraste (compatibilidade WCAG AA).
- 🖱️ **Padrão Neutro**: Cor padrão ao clicar definida como cinza neutro (`#e2e8f0`) com tipografia nítida e profissional.
- 📱 **Drag & Drop e Clique Híbrido**: Suporte completo a mouse, toque em telas mobile e navegação via teclado.
- 📦 **Exportação HTML Autônoma**: Código puro sem dependências externas, compatível com iframe e embed direto em qualquer AVA/LMS.
