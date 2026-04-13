import { useTodoContext } from '../../context/TodoContext';

export default function TodoListTailwind() {
  const { todos, dispatch, filter, query } = useTodoContext();

  const filteredTodos = todos
    .filter((t) => {
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    })
    .filter((t) => t.title.toLowerCase().includes(query.toLowerCase()));

  if (filteredTodos.length === 0) {
    return (
      <p className="text-center text-gray-400 dark:text-gray-500 mt-8">
        Brak zadań. Dodaj pierwsze!
      </p>
    );
  }

  return (
    <ul className="divide-y border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-900">
      {filteredTodos.map((todo) => (
        <li
          key={todo.id}
          className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors
        ${todo.completed ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}
        hover:bg-gray-100 dark:hover:bg-gray-800
      `}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onClick={(e) => e.stopPropagation()}
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />

          <div className="flex-1 flex flex-col">
            <span
              className={`text-sm ${
                todo.completed
                  ? 'line-through text-gray-400 dark:text-gray-500'
                  : 'text-gray-800 dark:text-gray-100'
              }`}
            >
              {todo.title}
            </span>

            <span className="text-xs text-gray-400 dark:text-gray-500">
              {new Date(todo.createdAt).toLocaleDateString()}
            </span>
          </div>

          {todo.completed && (
            <span
              className="text-xs font-medium px-2 py-1 rounded-full
          bg-green-100 text-green-700
          dark:bg-green-900 dark:text-green-300
        "
            >
              Ukończone
            </span>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: 'DELETE', payload: todo.id });
            }}
            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors text-lg"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
