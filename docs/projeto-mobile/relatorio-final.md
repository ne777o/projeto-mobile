# Relatório Final do Projeto Mobile

## Vídeo (obrigatório)
- Link: [COLE AQUI O LINK DO VÍDEO FINAL]

## Visão geral do app (em 5 bullets)
- Resolve o gerenciamento simples de hábitos/tarefas pessoais (criar, editar, marcar concluído, excluir).
- Entidade principal: `Task` (tarefa/hábito) com campos `id`, `title`, `description`, `completed`, `createdAt`.
- Fluxo principal: Lista (`TaskListScreen`) → Formulário (`TaskFormScreen`) → Detalhe (`TaskDetailScreen`).
- Principais validações: título obrigatório, título com 3–50 caracteres, descrição com máximo de 200 caracteres.
- Estado compartilhado: `zustand` (`useTaskStore` em `src/store/taskStore.ts`) mantém a lista de tarefas em memória e expõe `addTask`, `updateTask`, `removeTask`.

## Funcionalidades entregues (checklist)
- [x] 3 telas com navegação real (`TaskList`, `TaskForm`, `TaskDetail`)
- [x] formulário crítico (criar/editar)
- [x] validações reais (mín. 3 regras úteis)
- [x] estado compartilhado da entidade principal (`src/store/taskStore.ts`)
- [x] estados mínimos de UI (estado vazio na lista, mensagens de validação)
- [x] testes mínimos (2 regras + 1 fluxo)
- [x] checkpoints S1–S4 (documentados em `docs/projeto-mobile/checkpoints`)
- [x] evidências organizadas por semana (pasta `docs/projeto-mobile/evidencias`)
- [x] vídeo 10–20 min

## Validações implementadas (liste as regras)
1. Título obrigatório (mensagem clara: "Título necessário").
2. Título com mínimo de 3 caracteres e máximo de 50 (`src/validators/taskSchema.ts`).
3. Descrição opcional com máximo de 200 caracteres (`src/validators/taskSchema.ts`).

## Estado e arquitetura (curto e objetivo)
- Onde fica o estado compartilhado: `src/store/taskStore.ts` (Zustand).
- Como as telas se mantêm consistentes:
  - `TaskListScreen` renderiza a lista a partir de `useTaskStore().tasks`.
  - `TaskDetailScreen` busca a tarefa no mesmo store por `taskId` e chama `removeTask` / `updateTask`.
  - `TaskFormScreen` usa `addTask` e `updateTask` para criar/editar; também roda validações antes de persistir no store.
- Decisão importante 1: Uso de `zustand` para estado global — simples, leve e direto para o escopo do projeto (sem necessidade de Redux).
- Decisão importante 2: Uso de `zod` para validação de formulário (`src/validators/taskSchema.ts`) para regras declarativas e testes fáceis.

## Testes (o que existe)
- Comando: `npm run test`
- Testes automatizados implementados:
  - `src/__tests__/taskSchema.test.ts` — valida regras de `taskSchema` (título vazio, mínimo, máximo, etc.).
  - `src/__tests__/taskStore.test.ts` — verifica operações do store (`addTask`, `removeTask`).
  - `src/__tests__/exemplo.test.js` — teste de exemplo/infra.

## Uso de IA (se aplicável)
- Usei IA? Sim
- Se sim:
  - Onde ajudou:
    - Sugestão e implementação de validação de título vazio e mensagem de alerta.
    - Ajuste do comportamento de confirmação de exclusão para web (`window.confirm` no `TaskDetailScreen`).
    - Geração de propostas para o relatório e organização das evidências.
  - Como validei: testes automatizados existentes (`taskSchema` e `taskStore`) e verificação manual no fluxo local (recomenda-se abrir em Expo web ou dispositivo para validação visual).

## Limitações e próximos passos (curto)
- Limitação 1: Estado em memória — não persiste entre sessões (sem armazenamento local/remote).
- Limitação 2: Falta de testes E2E que cubram fluxo completo de criação → edição → exclusão.
- Limitação 3: Padrões de acessibilidade e internacionalização não implementados.

Próximos passos:
- Implementar persistência (AsyncStorage / SQLite / backend) para manter tarefas após reinício.
- Adicionar testes E2E (Detox / Cypress) para fluxos críticos.
- Gravar vídeo final (10–20 min) mostrando telas, validações, e execução dos testes.

---

**Localização do relatório:** `docs/projeto-mobile/relatorio-final.md`
