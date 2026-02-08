# Checkpoint 02 - Construção das Telas e Navegação

## Data: 22/10/2024
## Status: Concluído ✅

### 1. Implementação da Navegação
Configuramos o `Stack Navigator` no arquivo `AppNavigator.tsx` para gerenciar o fluxo entre as telas:

*   **Lista de Tarefas (Home):** Tela inicial.
*   **Formulário:** Tela para adicionar/editar.
*   **Detalhes:** Tela de visualização única.

### 2. Desenvolvimento das Interfaces (UI)
As telas foram estilizadas utilizando `StyleSheet` do React Native, focando em usabilidade e design limpo:

*   **TaskListScreen:** Utiliza `FlatList` para renderizar a lista de itens com performance.
*   **TaskDetailScreen:** Exibe informações completas do item selecionado.
*   **Estilização:** Criação de cards com sombras, botões flutuantes (FAB) e feedback visual de status.

### 3. Gerenciamento de Estado (Zustand)
Criamos a `useTaskStore` em `src/store/taskStore.ts` para permitir que todas as telas compartilhem os mesmos dados sem precisar de "prop drilling".
*   Ações implementadas: `addTask`, `removeTask`, `toggleTask`.

### 4. Desafios Superados
*   Ajuste de layout para evitar sobreposição na `StatusBar` do Android.
*   Tipagem correta das rotas de navegação com TypeScript (`NativeStackNavigationProp`).