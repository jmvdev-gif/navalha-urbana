# Navalha Urbana — projeto conceito

Site de uma barbearia **fictícia**, feito pela JMVTECH para o portfólio. Ele resolve um problema simples:
mostrar serviços, preços, equipe e trabalhos, e deixar o cliente **marcar horário sem trocar mensagens**.

> Endereço, telefone, Instagram e equipe são fictícios. Não há cliente real nem métricas de resultado.

## O que tem

- Seção inicial com foto, animação ao rolar e o próximo horário livre calculado na hora
- Serviços com preço e duração, equipe, galeria com ampliação, localização e horário de funcionamento (com selo "Aberto agora")
- Botão **Agendar horário** sempre visível (no celular, barra fixa embaixo)
- Agendamento em 5 etapas: serviço → profissional (ou "sem preferência") → dia e horário → dados → confirmação
- No fim, abre o WhatsApp da barbearia com a mensagem pronta e permite salvar o horário na agenda (.ics)
- Sem pagamento online e sem banco de dados: a agenda é simulada em `lib/schedule.ts`

## Rodar

```bash
npm install
npm run dev
```

Abre em http://localhost:3000.

## Publicar (Cloudflare Pages)

O site é exportado como arquivos estáticos: `npm run build` gera a pasta `out/`.
No painel da Cloudflare (**Workers & Pages → Create → Pages → Connect to Git**):

- **Framework preset:** Next.js (Static HTML Export)
- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Variável:** `NODE_VERSION` = `20`
- **Custom domain:** `barbearia.techjmv.com`

Os cabeçalhos de segurança ficam em `public/_headers`.

## Onde mudar as coisas

| O quê | Arquivo |
| --- | --- |
| Serviços, preços, equipe, fotos, endereço, WhatsApp, horários, perguntas | `lib/data.ts` |
| Regras da agenda simulada (intervalo, antecedência, ocupação) | `lib/schedule.ts` |
| Texto da mensagem do WhatsApp | `lib/whatsapp.ts` |
| Cores e fontes | `tailwind.config.ts`, `app/layout.tsx` |

## Base

Next.js 15 · React 19 · Tailwind CSS 3 · Framer Motion · lucide-react · fontes Big Shoulders, Instrument Serif e DM Sans (`next/font/google`).

## Créditos

Fotos do [Unsplash](https://unsplash.com) (Unsplash License, uso livre). A versão original do projeto está no primeiro commit
e os prints antigos em `docs/versao-original/`.
