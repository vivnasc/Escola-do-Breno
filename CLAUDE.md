# PITCH — Play. Interact. Think. Challenge. Hone.

Plataforma de aprendizagem adaptativa para criancas com necessidades especiais.
Construida originalmente para o Breno (12 anos, espectro autista, homeschooling).

## Visao Geral

- **Stack**: React 18 + React Router 6 + Vite + Workbox PWA
- **Dependencias externas**: react, react-dom, react-router-dom, @paypal/react-paypal-js (producao)
- **Persistencia**: localStorage (multi-perfil)
- **Audio**: Web Speech API nativa (TTS)
- **Styling**: CSS Variables + inline styles React (sem framework CSS)
- **Offline**: PWA com service worker + CacheFirst para imagens

## Estrutura do Projecto

```
src/
  App.jsx                    # Router principal (20 routes de actividades + 16 paginas)
  main.jsx                   # Entry point
  components/
    ActivityShell.jsx         # Wrapper de todas as actividades (instrucoes, score, TTS)
    FeedbackMessage.jsx       # Feedback visual de acerto/erro
    BancoDaCalma.jsx          # Exercicio de respiracao (trigger por frustracao)
    VisualTimer.jsx           # Timer visual adaptativo
    UpgradePrompt.jsx         # Modal gentil para upgrade de plano
  hooks/
    useProfile.js             # Multi-perfil, localStorage, deep merge
    useProgress.js            # Stars, streaks, trofeus, actividades completadas
    useAdaptive.js            # Motor de personalizacao (30+ configs)
    useSubscription.js        # Gestao de tier (free/family/therapist)
    useTTS.js                 # Text-to-Speech (Web Speech API)
    useFrustration.js         # Deteccao de frustracao (clicks rapidos, erros consecutivos)
    usePlanner.js             # Planeador diario (3 actividades/dia)
  data/
    activities.js             # Registo das 20 actividades (5 por campo)
    tiers.js                  # 3 planos de subscricao (Semente, Flor, Floresta)
    competencies.js           # Framework de 10 niveis + 4 fases + diagnostico
    vocabulary.js             # 299 palavras ingles Cambridge Pre-A1 (19 categorias inc. sentimentos e social)
    universes.js              # 5 universos tematicos
    universeContent.js        # Conteudo contextualizado por universo
    brenoProfile.js           # Perfil pre-configurado do Breno
    challenges.js             # Desafios semanais rotativos
    news.js                   # Feed de noticias
    shop.js                   # 18 items cosmeticos (celebracoes, badges, stickers)
    worksheets.js             # Fichas para impressao
  pages/                      # 17 paginas (Home, Welcome, Intake, 4 Campos, Planos, etc.)
  activities/
    campo1/                   # 5 actividades de Linguagem
    campo2/                   # 5 actividades de Matematica
    campo3/                   # 5 actividades de Descoberta
    campo4/                   # 5 actividades de Autonomia
  styles/
    variables.css             # Design tokens
    global.css                # Base + a11y + print
    animations.css            # Animacoes suaves
```

## Os 4 Campos

| Campo | Nome | Cor | Actividades |
|-------|------|-----|-------------|
| 1 | Linguagem e Comunicacao | #1565C0 | vocab-match, dress-player, color-kit, read-score, phonics |
| 2 | Matematica e Logica | #E65100 | goal-math, clock-reader, team-division, ticket-shop, patterns |
| 3 | Conhecimento e Descoberta | #2E7D32 | flag-match, world-explorer, body-science, weather-match, nature-lab |
| 4 | Autonomia e Vida | #6A1B9A | daily-routine, fair-play, emotion-cards, real-world, problem-solving |

## 5 Universos Tematicos

Futebol (default), Dinossauros, Espaco, Animais, Musica.
O mesmo curriculo, re-contextualizado por universo.

## Framework de Competencias

### 10 Niveis Progressivos

| Nv | Id | Label | Emoji |
|----|----|-------|-------|
| 1 | seed | Semente | 🌱 |
| 2 | root | Raiz | 🌿 |
| 3 | sprout | Broto | 🌾 |
| 4 | stem | Caule | 🪴 |
| 5 | leaf | Folha | 🍃 |
| 6 | bud | Botao | 🌷 |
| 7 | flower | Flor | 🌸 |
| 8 | fruit | Fruto | 🍎 |
| 9 | tree | Arvore | 🌳 |
| 10 | forest | Floresta | 🌲 |

### 4 Fases Narrativas (comunicacao com terapeutas/pais)

| Fase | Niveis | Significado |
|------|--------|-------------|
| Germinar | 1-3 | Exploracao, tentativa, curiosidade |
| Estruturar | 4-6 | Competencia a formar-se, menos apoio |
| Florescer | 7-8 | Autonomia emergente |
| Sustentar | 9-10 | Autonomia consolidada, pode ajudar outros |

### Diagnostico de Intake

O wizard de onboarding inclui 12 perguntas diagnosticas (3 por campo, nos tiers low/mid/high).
Cada campo recebe um nivel inicial independente (ex: nivel 7 em linguagem, nivel 3 em matematica).
Factores de ajuste: idade, nivel de leitura, nivel de apoio.

## Subscricao e Tiers

### 3 Planos

| Tier | Nome | Emoji | Preco | Perfis | Universos | Actividades |
|------|------|-------|-------|--------|-----------|-------------|
| free | Semente | 🌱 | Gratis | 1 | 1 (Futebol) | 4 (1/campo) |
| family | Flor | 🌸 | 5,99/mes | 5 | 5 (todos) | 20 (todas) |
| therapist | Floresta | 🌲 | 14,99/mes | 20 | 5 (todos) | 20 (todas) |

### Actividades Gratis (1 por campo)
- Campo 1: vocab-match
- Campo 2: goal-math
- Campo 3: flag-match
- Campo 4: daily-routine

### Principios de Monetizacao
- **Gratis funciona de verdade** — nao e demo, e 4 actividades com 10 niveis completos
- **Acessibilidade nunca e premium** — TTS, alto contraste, deteccao de frustracao, Banco da Calma
- **Zero publicidade** — publico vulneravel, sem ads
- **Zero dados vendidos**
- **Breno tem sempre acesso completo** (`subscriptionTier: 'family'` hardcoded)

### Pagamento: PayPal Subscriptions
- **Dependencia**: `@paypal/react-paypal-js` v8.9.2
- **Moeda**: EUR (Portugal e Mocambique suportados)
- **Componente**: `src/components/PayPalSubscribeButton.jsx`
- **Fluxo**: Escolher plano → botao PayPal → login PayPal → aprovar → tier activado
- **Env vars**:
  - `VITE_PAYPAL_CLIENT_ID` — Client ID da REST App no PayPal Developer
  - `VITE_PAYPAL_PLAN_FAMILY` — Plan ID do plano Flor (5,99€/mes)
  - `VITE_PAYPAL_PLAN_THERAPIST` — Plan ID do plano Floresta (14,99€/mes)
- **Setup PayPal Dashboard**: Products → Subscriptions → criar 2 plans
- **Activacao**: `onApprove` actualiza `profile.subscriptionTier` + `paypalSubscriptionId`
- **Sem env vars**: mostra placeholder "Pagamentos PayPal em breve"

### Ficheiros
- `src/data/tiers.js` — definicao dos tiers, limites, helpers
- `src/hooks/useSubscription.js` — hook que le o tier do perfil
- `src/components/UpgradePrompt.jsx` — modal gentil para upgrade
- `src/components/PayPalSubscribeButton.jsx` — botao PayPal para subscricoes
- `src/pages/Planos.jsx` — pagina de pricing com FAQ e PayPal

### Gating
- `ActivityCard` recebe `locked` e `onLockedClick`
- Cada pagina de campo verifica `subscription.isActivityLocked(activityId, campoId)`
- Universos verificados via `subscription.isUniverseLocked(universeId)`
- Features: `subscription.hasFichas`, `subscription.hasDesafios`, `subscription.hasLoja`

### Futuro (nao implementado)
- Webhooks PayPal no Supabase Edge Functions (validacao server-side)
- Trial period
- Codigos de desconto
- Cancelamento/downgrade automatico via webhook

## Motor Adaptativo (useAdaptive.js)

Traduz o perfil da crianca em adaptacoes concretas de UI/UX:
- **Dificuldade**: 1-3 por campo (derivada dos niveis de competencia)
- **Opcoes**: 2-4 escolhas por pergunta
- **Texto**: linguagem simples, suportes visuais, instrucoes audio
- **Visual**: tamanho de fonte, contraste alto, animacoes reduzidas
- **Sessao**: limite de tempo, lembretes de pausa
- **Frustracao**: deteccao automatica → Banco da Calma (respiracao guiada)

## Acessibilidade

- Touch targets minimos 44x44px (WCAG 2.5.5)
- Focus visible 3px outline
- `prefers-reduced-motion` respeitado
- `forced-colors` (high contrast mode)
- Font Quicksand (dyslexia-friendly)
- Sem flashs ou animacoes bruscas
- TTS para leitura de instrucoes
- Perfil sensorial configuravel (som, animacao, contraste, tamanho)

## Tecnologias de Audio/Fala

### Implementado
- **TTS (Text-to-Speech)**: Web Speech API (`SpeechSynthesis`)
  - `speak(text)` — fala em portugues (lang='pt')
  - `speakEn(text)` — fala em ingles (lang='en-GB')
  - Rate: 0.85 (mais lento para clareza)
  - Seleccao automatica de voz local

### STT (Speech-to-Text) — Implementado
- **Speech Recognition**: `SpeechRecognition` / `webkitSpeechRecognition` nativa
  - `useSTT(lang)` — hook com `listen()`, `listenForWord()`, `stop()`
  - Suporta multiplas alternativas de reconhecimento
  - Timeout automatico (5s default)
  - Deteccao de suporte do browser (`supported` flag)
  - Integrado no Phonics (dizer palavras em ingles em voz alta)
  - Requer internet (processamento cloud do browser)

### Efeitos Sonoros — Implementado
- **AudioContext** sintetizado (zero ficheiros de audio)
  - `useSoundEffects(enabled)` — hook com sons programaticos
  - `success()` — chime ascendente (C5→E5)
  - `error()` — tom suave baixo (nao punitivo)
  - `click()` — tick rapido
  - `celebrate()` — arpejo ascendente (C5-E5-G5-C6)
  - `levelUp()` — fanfarra triunfante
  - Funciona offline, sem dependencias, respeita `soundEnabled`

### Persistencia — Implementado
- **IndexedDB**: Wrapper robusto alem de localStorage
  - Migracao automatica localStorage → IndexedDB no primeiro load
  - Fallback para localStorage se IndexedDB indisponivel
  - Export/import JSON para backup e transferencia entre dispositivos
  - Disponivel nas Definicoes (📤 Exportar / 📥 Importar)

## Lacunas Conhecidas

### Importantes
- **Sem testes**: Zero unit tests, zero integration tests
- **Sem backend**: Tudo client-side, sem API server (dados ficam no dispositivo)
- **Conteudo robusto**: 299 palavras vocab (19 categorias inc. sentimentos e social), 26 letras phonics, 30 paises, 20 perguntas ciencia, 25 factos geografia, 24 experiencias natureza, 20 cenarios mundo real, 24 problemas resolucao
- **Export texto simples**: Relatorio e .txt, podia ser PDF com graficos
- **Sem i18n**: Tudo hardcoded em portugues, sem framework de traducao
- **TTS qualidade variavel**: Web Speech API depende do dispositivo/browser
- **STT requer internet**: Speech Recognition e cloud-processed pelo browser

### Futuras
- **PayPal client-side only**: Subscricoes PayPal integradas mas sem webhooks server-side (validacao local)
- **Sem multiplayer/colaboracao**: Cada crianca aprende sozinha
- **Sem notificacoes push**: PWA suporta mas nao implementado
- **Sem analytics**: Sem tracking de uso (tempo em cada actividade, taxas de abandono)
- **Sem modo offline completo para TTS**: TTS precisa de vozes instaladas no dispositivo

## Perfil do Breno (Quick Start)

```javascript
{
  name: 'Breno',
  age: 11,               // born 1 Oct 2014, conteudo misto de anos 1-6
  universe: 'football',
  learningNeeds: {
    areas: ['reading', 'math', 'attention'],
    readingLevel: 'beginning',
    supportLevel: 'some',
  },
  attention: {
    sessionLength: 15,
    frustrationSensitivity: 'sensitive',
  },
  competencyLevels: {     // detectados no intake
    campo1: 1,            // ajustados pela mini-avaliacao
    campo2: 1,
    campo3: 1,
    campo4: 1,
  },
}
```

## Comandos

```bash
npm run dev          # Dev server (Vite)
npm run build        # Production build
npm run preview      # Preview production build
```

## Convencoes de Codigo

- JSX com inline styles (`const styles = { ... }`)
- CSS variables para design tokens (`var(--color-primary)`)
- Hooks customizados em `src/hooks/`
- Dados estaticos em `src/data/`
- Actividades em `src/activities/campo{1-4}/`
- Portugues neutro (sem `pt-PT` ou `pt-BR`, apenas `pt`)
- Conteudo globalmente diverso (sem centrismo nacional)
- Competencias por mestria, nunca por ano escolar ou idade
- Emojis como suporte visual, nao como decoracao

## Principios de Design

1. **Competencia, nao idade** — avanca quando domina, nao por calendario
2. **Universalista** — conteudo global (Barcelona, Liverpool, Bayern — nao centrado num pais)
3. **Adaptativo** — cada crianca tem um perfil unico de necessidades
4. **Gentil** — animacoes suaves, sem pressao temporal, deteccao de frustracao
5. **Offline-first** — PWA que funciona sem internet
6. **Minimalista** — zero dependencias desnecessarias (3 deps de producao)
