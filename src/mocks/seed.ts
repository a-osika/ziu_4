import { Todo } from '../types/todo.types';

export const DEFAULT_TODOS: Todo[] = [
  {
    id: 'mock-1',
    title: 'Zrobić zakupy spożywcze',
    description:
      'Kupić mleko owsiane, jajka, pierś z kurczaka, świeżą bazylię i składniki na obiad.',
    priority: 'high',
    completed: false,
    createdAt: new Date('2026-06-10T10:00:00'),
    dueDate: new Date('2026-06-15'),
  },
  {
    id: 'mock-2',
    title: 'Przygotować prezentację na sprint',
    description: 'Podsumować wyniki kwartalne i przygotować slajdy dla zespołu developerskiego.',
    priority: 'medium',
    completed: false,
    createdAt: new Date('2026-06-12T14:30:00'),
    dueDate: new Date('2026-06-19'),
  },
  {
    id: 'mock-3',
    title: 'Opłacić rachunek za internet',
    description:
      'Faktura ze stycznia, kwota 69.99 zł. Przelew do zrobienia na konto bankowe operatora.',
    priority: 'low',
    completed: true,
    createdAt: new Date('2026-06-01T09:00:00'),
    dueDate: new Date('2026-06-10'),
  },
  {
    id: 'mock-4',
    title: 'Naprawić rower',
    description: 'Dokręcić hamulce i nasmarować łańcuch przed weekendową wycieczką.',
    priority: 'medium',
    completed: false,
    createdAt: new Date('2026-06-14T11:00:00'),
    dueDate: null,
  },
];
