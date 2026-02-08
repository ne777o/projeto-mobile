import { useTaskStore } from '../store/taskStore';

describe('Teste de Fluxo da Store (Zustand)', () => {
  beforeEach(() => {
    // Limpa o estado antes de cada teste se necessário
  });

  it('deve adicionar uma tarefa e depois removê-la', () => {
    const { addTask, removeTask } = useTaskStore.getState();
    const newTask = {
      id: 'test-123',
      title: 'Tarefa Teste',
      completed: false,
      createdAt: new Date(),
    };

    // Adicionar
    addTask(newTask);
    expect(useTaskStore.getState().tasks).toContainEqual(newTask);

    // Remover
    removeTask('test-123');
    expect(useTaskStore.getState().tasks.find(t => t.id === 'test-123')).toBeUndefined();
  });
});