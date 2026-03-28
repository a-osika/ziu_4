import { useMemo } from 'react';
import { useTodoContext } from '../context/TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { todos, filter } = useTodoContext();

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'all':
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden" }}>
      {filteredTodos.length === 0 ? (
        <div style={{ padding: "3rem", textAlign: "center", color: "#6c757d" }}>
          <p>
            {filter === 'all'
              ? 'No todos yet. Create one to get started!'
              : `No ${filter} todos.`}
          </p>
        </div>
      ) : (
        <div>
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
      {todos.length > 0 && (
        <div style={{ padding: "1rem", background: "#f8f9fa", borderTop: "1px solid #ccc", textAlign: "center", color: "#6c757d" }}>
          <p>
            {todos.filter(t => !t.completed).length} of {todos.length} tasks remaining
          </p>
        </div>
      )}
    </div>
  );
};
