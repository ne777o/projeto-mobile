# 🤖 Registro de Engenharia de Prompt (Prompt Log)

**Projeto:** Mobile Task App
**Integrantes:** José Agnaldo dos Santos Neto e Daniel Santos Lima
**Ferramenta de IA:** LLM (Large Language Model) para Apoio ao Desenvolvimento
**Período:** Ciclo de Desenvolvimento (4 Semanas)

Este registro documenta as principais interações técnicas realizadas com a IA para definição de arquitetura, resolução de problemas e implementação de boas práticas de engenharia de software durante o desenvolvimento do projeto.

---

## 📋 Histórico de Consultas Técnicas

| **Semana 1** | **Arquitetura & Setup** | *"Quais são as melhores práticas atuais para estruturar um projeto React Native com TypeScript visando escalabilidade e Clean Architecture?"* | Definição da estrutura de pastas modular (`src/screens`, `src/store`, `src/models`) separando responsabilidades. |
| **Semana 1** | **Ambiente de Dev** | *"Como solucionar conflitos de dependências nativas e configurar variáveis de ambiente para o Android Emulator no Windows?"* | Correção do ambiente de desenvolvimento e configuração do SDK Android para execução do emulador. |
| **Semana 2** | **Navegação & Tipagem** | *"Como implementar uma navegação em pilha (Stack Navigation) fortemente tipada utilizando TypeScript para garantir segurança na passagem de parâmetros entre telas?"* | Implementação do `AppNavigator.tsx` com interfaces estritas (`RootStackParamList`) para as rotas. |
| **Semana 2** | **UI/UX Design** | *"Gere um exemplo de componente de Card otimizado para FlatList, com feedback visual de status e estilização responsiva."* | Criação da interface da `TaskListScreen` com foco em performance de renderização e usabilidade. |
| **Semana 3** | **Gerenciamento de Estado** | *"Comparativo entre Context API e Zustand para um MVP: Qual oferece melhor performance e menor boilerplate para operações CRUD?"* | Decisão pela adoção do **Zustand** e implementação da `useTaskStore` para gerenciamento centralizado. |
| **Semana 3** | **Segurança & Validação** | *"Como integrar a biblioteca Zod para validação de esquemas em tempo real dentro de um formulário React Native, prevenindo submissão de dados inválidos?"* | Criação do `taskSchema.ts` e lógica de proteção no formulário de cadastro contra dados inconsistentes. |
| **Semana 4** | **Quality Assurance (QA)** | *"Como configurar o ambiente de testes Jest para projetos Expo e criar Mocks para módulos nativos como o AsyncStorage?"* | Configuração do arquivo `jest.config.js` e resolução de erros de dependência nativa nos testes automatizados. |
| **Semana 4** | **Testes Unitários** | *"Refatoração de testes unitários: Ajustar a lógica de validação para cobrir novos requisitos de negócios (alteração de limites de caracteres)."* | Atualização dos testes de `taskSchema` para garantir cobertura correta das regras de validação finais. |
| **Semana 4** | **Documentação Técnica** | *"Gere uma documentação técnica padronizada (Markdown) detalhando a arquitetura, decisões de projeto e instruções de execução."* | Elaboração do README, Relatório Técnico final e preenchimento dos checkpoints semanais. |

---

## 💡 Análise do Impacto da IA

A utilização assistida da Inteligência Artificial permitiu:
1.  **Aceleração do Setup:** Redução drástica no tempo de configuração inicial e resolução de conflitos de ambiente.
2.  **Adoção de Boas Práticas:** Implementação de padrões de mercado (como Zustand e Zod) sugeridos pela análise técnica da IA.
3.  **Qualidade de Código:** Otimização da tipagem TypeScript e cobertura de testes mais robusta.
4.  **Documentação Profissional:** Estruturação formal dos entregáveis e relatórios técnicos.