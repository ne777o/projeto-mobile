import { taskSchema } from '../validators/taskSchema';

describe('Testes de Validação (Zod)', () => {
  it('deve invalidar título com menos de 3 caracteres', () => {
    const result = taskSchema.safeParse({ title: 'Oi' });
    expect(result.success).toBe(false);
  });

  it('deve invalidar título com mais de 50 caracteres', () => {
    const longTitle = 'a'.repeat(51);
    const result = taskSchema.safeParse({ title: longTitle });
    expect(result.success).toBe(false);
  });

  it('deve validar corretamente uma tarefa com descrição opcional', () => {
    const result = taskSchema.safeParse({ title: 'Estudar Jest' });
    expect(result.success).toBe(true);
  });

    // Teste de Caminho Feliz
  it('deve aceitar uma tarefa válida', () => {
    const taskValida = {
      title: 'Estudar React Native',
      description: 'Revisar hooks e navigation',
      category: 'study',
    };

    const resultado = taskSchema.safeParse(taskValida);
    expect(resultado.success).toBe(true);
  });

  // Teste de Erro (Título Vazio)
  it('deve rejeitar uma tarefa sem título', () => {
    const taskInvalida = {
      title: '', // Título vazio deve falhar
      description: 'Teste sem título',
      category: 'custom',
    };

    const resultado = taskSchema.safeParse(taskInvalida);
    expect(resultado.success).toBe(false);
  });

  // Teste de Erro (Título Curto Demais - assumindo min(3) no seu schema)
  it('deve rejeitar título muito curto', () => {
    const taskCurta = {
      title: 'Oi', 
      category: 'custom',
    };

    const resultado = taskSchema.safeParse(taskCurta);
    expect(resultado.success).toBe(false);
  });
});