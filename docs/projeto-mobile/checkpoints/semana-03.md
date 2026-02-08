# Checkpoint 03 - Formulário Crítico e Validação

## Data: 29/10/2024
## Status: Concluído ✅

### 1. Criação do Formulário Crítico
A tela `TaskFormScreen` foi implementada para permitir a entrada de dados do usuário. O formulário inclui:
*   Campo de Título (Texto).
*   Campo de Descrição (Multilinha).
*   Botão de Salvar.

### 2. Validação com Zod
Para garantir a integridade dos dados, integramos a biblioteca **Zod**.
*   Arquivo: `src/validators/taskSchema.ts`.
*   **Regras:**
    *   Título obrigatório (mínimo 3 caracteres).
    *   Descrição opcional (máximo 200 caracteres).

### 3. Tratamento de Erros
Implementamos lógica para exibir alertas (`Alert.alert`) caso o usuário tente salvar dados inválidos, impedindo a persistência de informações corrompidas na Store.

### 4. Edição de Dados
Reutilizamos a tela de formulário para permitir a edição. Se um `taskId` for passado via rota, o formulário pré-carrega os dados existentes para modificação.