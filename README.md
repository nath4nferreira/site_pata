# Blog Pata

Site responsivo moderno com efeitos de liquid glass e animações suaves.

## 🚀 Funcionalidades

- **Design Responsivo**: Adaptado para mobile, tablet e desktop
- **Efeito Liquid Glass**: Efeito interativo nos blocos de texto (mobile/tablet)
- **Animações Suaves**: Transições e hover effects modernos
- **Ondas Animadas**: Sistema de múltiplas camadas no footer
- **Bolhas Decorativas**: Elementos visuais com posicionamento responsivo
- **Otimizado para Performance**: CSS otimizado com variáveis e boas práticas

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Variáveis CSS, Flexbox, Animações, Media Queries
- **JavaScript**: Efeito liquid glass e animações de scroll
- **Google Fonts**: Fonte Poppins

## 📱 Responsividade

- **Mobile Small**: ≤390px
- **Mobile General**: ≤480px  
- **Tablet**: 768px-1024px
- **Desktop**: ≥1280px

## 🎨 Efeitos Especiais

### Liquid Glass Effect
Efeito de vidro líquido que segue o movimento do cursor/toque nos blocos de texto, ativo apenas em dispositivos móveis e tablets.

### Sistema de Ondas
Quatro camadas de ondas animadas no footer com movimentos opostos e opacidades diferentes para criar profundidade.

### Bolhas Interativas
Elementos decorativos com hover effects e posicionamento responsivo usando `clamp()`.

## 🚀 Deploy

Este projeto está configurado para deploy automático no Vercel.

### Deploy Manual
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy Automático
Conecte o repositório ao Vercel para deploy automático a cada push.

## 📂 Estrutura do Projeto

```
blog_pata/
├── html/
│   └── index.html          # Página principal
├── style/
│   └── index.css           # Estilos principais
├── javascript/
│   └── script.js           # Scripts interativos
├── images/
│   ├── img-pata.png        # Imagem principal
│   └── waves.png           # Textura das ondas
├── vercel.json             # Configuração do Vercel
├── package.json            # Configuração do projeto
└── README.md               # Documentação
```

## ⚡ Performance

- **CSS Variables**: Sistema centralizado de cores e espaçamentos
- **Will-change**: Otimização para animações
- **Aspect-ratio**: Prevenção de layout shift
- **Cache Headers**: Configurados no Vercel para assets estáticos

## ♿ Acessibilidade

- **Prefers-reduced-motion**: Respeita preferências de movimento
- **Focus visible**: Outline personalizado para navegação por teclado
- **Contraste otimizado**: Cores com boa legibilidade
- **Texto justificado**: Melhor leitura em blocos de texto

## 🔧 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Servidor local
npm run dev
```

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

---

Desenvolvido com ❤️ para uma experiência web moderna e responsiva.
