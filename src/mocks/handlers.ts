import { delay, http, HttpResponse } from 'msw';
import { Todo } from '../types/todo.types';
import { DEFAULT_TODOS } from './seed';

let todos: Todo[] = [...DEFAULT_TODOS];

const TODOS_URL = '/api/todos';

const NETWORK_DELAY_MS = 800;

const shouldSimulateError = (operation: 'get' | 'post' | 'put' | 'delete') =>
  localStorage.getItem(`mock:fail:${operation}`) === 'true';

const serverError = () => new HttpResponse(null, { status: 500 });

export const handlers = [
  http.get(TODOS_URL, async () => {
    await delay(NETWORK_DELAY_MS);
    if (shouldSimulateError('get')) return serverError();
    return HttpResponse.json(todos);
  }),


  http.post(TODOS_URL, async ({ request }) => {
    await delay(NETWORK_DELAY_MS);
    if (shouldSimulateError('post')) return serverError();

    const requestBody = (await request.json()) as Partial<Todo>;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date(),
      title: requestBody.title ?? '',
      description: requestBody.description,
      priority: requestBody.priority ?? 'medium',
      dueDate: requestBody.dueDate ? new Date(requestBody.dueDate) : null,
    };

    todos = [newTodo, ...todos];
    return HttpResponse.json(newTodo, { status: 201 });
  }),

  http.put(`${TODOS_URL}/:id`, async ({ request, params }) => {
    await delay(NETWORK_DELAY_MS);
    if (shouldSimulateError('put')) return serverError();

    const changes = (await request.json()) as Partial<Todo>;
    let updatedTodo: Todo | undefined;

    todos = todos.map((todo) => {
      if (todo.id !== params.id) return todo;
      updatedTodo = { ...todo, ...changes };
      return updatedTodo;
    });

    if (!updatedTodo) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(updatedTodo);
  }),


  http.delete(`${TODOS_URL}/:id`, async ({ params }) => {
    await delay(NETWORK_DELAY_MS);
    if (shouldSimulateError('delete')) return serverError();

    todos = todos.filter((todo) => todo.id !== params.id);
    return new HttpResponse(null, { status: 204 });
  }),
];