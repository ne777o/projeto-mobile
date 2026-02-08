# Checkpoint 04 - Testes Automatizados e Entrega Final

## Data: 05/11/2024
## Status: Concluído ✅

### 1. Configuração de Testes (Jest)
Configuramos o ambiente de testes automatizados para garantir a qualidade do código.
*   Instalação: `npm install --save-dev jest jest-expo @types/jest`
*   Configuração: Arquivo `jest.config.js` criado na raiz.

### 2. Implementação dos Casos de Teste
Criamos testes unitários na pasta `src/__tests__/`:

*   **taskSchema.test.ts:** Valida se o Zod está rejeitando títulos curtos e aceitando dados válidos.
*   **taskStore.test.ts:** Valida se a Store adiciona e remove itens corretamente da lista em memória.

### 3. Execução e Evidências
O comando `npm run test` foi executado com sucesso, resultando em "PASS" para todas as suites de teste. Prints do terminal foram salvos na pasta de evidências.

### 4. Documentação e Vídeo
*   Preenchimento de todos os arquivos Markdown na pasta `docs/`.
*   Gravação do vídeo demonstrativo (link adicionado ao README).
*   Revisão final do código e limpeza de arquivos não utilizados.