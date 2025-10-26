# 🍒 Convite Digital - Aniversário da Isís (1 Aninho)

Landing page moderna e responsiva para o aniversário de 1 ano da Isís, com tema de cerejinhas.

## ✨ Características

- 🚀 **Ultra-rápido** - Next.js 14 com otimizações de performance
- 📱 **Mobile-first** - Design responsivo e otimizado para celulares
- 🎨 **Visual delicado** - Paleta de cores suave com tema de cereja
- 💫 **Animações suaves** - Animações CSS leves e elegantes
- 📲 **PWA** - Pode ser instalado no celular como app
- 🗺️ **Google Maps** - Link direto para o local da festa
- 💬 **WhatsApp** - Confirmação de presença automática
- 🎯 **SEO otimizado** - Metadados configurados para compartilhamento

## 🛠️ Tecnologias

- **Next.js 14** - Framework React com SSG
- **React 18** - Biblioteca JavaScript
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **PWA** - Progressive Web App

## 🚀 Como usar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build para produção

```bash
npm run build
```

### Executar versão de produção localmente

```bash
npm run start
```

## ⚙️ Configuração

### Dados do evento

Edite o arquivo `app/page.tsx` e modifique o objeto `eventData`:

```typescript
const eventData = {
  name: 'Isís',
  age: 1,
  date: '15 de Novembro de 2025',        // Altere a data
  time: '15h00',                          // Altere o horário
  location: 'Buffet Alegria Infantil',   // Altere o local
  address: 'Rua das Flores, 123',        // Altere o endereço
  mapsUrl: 'https://maps.google.com/...', // Altere o link do Google Maps
  whatsapp: '5511999999999',             // IMPORTANTE: Altere para o número real
  whatsappMessage: 'Olá! Confirmo presença no aniversário da Isís! 🍒',
}
```

### Google Maps

1. Acesse [Google Maps](https://www.google.com/maps)
2. Busque o endereço da festa
3. Clique em "Compartilhar"
4. Copie o link e cole em `mapsUrl`

### WhatsApp

1. Use o formato internacional: `55` (Brasil) + `11` (DDD) + `999999999` (número)
2. Exemplo: `5511987654321`
3. Substitua em `whatsapp`

## 🌐 Deploy na Vercel (Recomendado)

1. Crie uma conta em [Vercel](https://vercel.com)
2. Instale o Vercel CLI:
```bash
npm i -g vercel
```
3. Faça o deploy:
```bash
vercel
```

Ou conecte seu repositório GitHub diretamente na Vercel para deploys automáticos.

## 📱 PWA - Instalação no celular

Após o deploy, os convidados podem:

1. Acessar o link no celular
2. No navegador, clicar em "Adicionar à tela inicial"
3. O convite ficará instalado como um app

## 🎨 Personalização de cores

As cores podem ser ajustadas no arquivo `tailwind.config.js`:

```javascript
colors: {
  cherry: {
    50: '#fff5f7',   // Rosa bem claro
    500: '#ff4069',  // Rosa cereja principal
    700: '#d10f44',  // Rosa cereja escuro
  },
}
```

## 📄 Licença

Projeto criado com ❤️ para o aniversário da Isís.

---

**Importante:** Lembre-se de atualizar o número do WhatsApp antes de compartilhar o convite! 🍒

