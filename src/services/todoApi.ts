import { Todo, NewTodoEntry } from '../types/todo.types';

const API = '/api/todos';

const revive = (t: any): Todo => ({
  ...t,
  createdAt: new Date(t.createdAt),
  dueDate: t.dueDate ? new Date(t.dueDate) : null,
});

async function parse(res: Response) {
  if (!res.ok) throw new Error(`Błąd sieci (${res.status})`);
  return res.status === 204 ? null : res.json();
}

export const todoApi = {
  list: async (): Promise<Todo[]> => ((await parse(await fetch(API))) as any[]).map(revive),

  create: async (payload: NewTodoEntry): Promise<Todo> =>
    revive(
      await parse(
        await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      )
    ),

  update: async (id: string, patch: Partial<Todo>): Promise<Todo> =>
    revive(
      await parse(
        await fetch(`${API}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(patch),
        })
      )
    ),

  remove: async (id: string): Promise<void> => {
    await parse(await fetch(`${API}/${id}`, { method: 'DELETE' }));
  },
};
