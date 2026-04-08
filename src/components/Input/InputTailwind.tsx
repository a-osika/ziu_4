import { useState } from 'react';
import { useTodoContext } from '../../context/TodoContext';

export default function InputTailwind() {
  const { dispatch, setFilter, setQuery } = useTodoContext();

  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;

    dispatch({ type: 'ADD', payload: text.trim() });

    setFilter('all');
    setQuery('');
    setText('');
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Dodaj nowe zadanie
      </h2>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Wpisz treść zadania..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          className="flex-1 px-4 py-2 text-sm rounded-lg border
        border-gray-300 dark:border-gray-600
        bg-white dark:bg-gray-900
        text-gray-800 dark:text-gray-100
        placeholder-gray-400 dark:placeholder-gray-500
        focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />

        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="px-5 py-2 text-sm font-semibold text-white
        bg-brand-500 hover:bg-brand-700
        dark:bg-brand-500 dark:hover:bg-brand-700
        rounded-lg transition-colors
        disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Dodaj
        </button>
      </div>
    </div>
  );
}
