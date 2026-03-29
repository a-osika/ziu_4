import { useTodoContext } from '../../context/TodoContext';
import { Input } from '../../components/Input/Input';

export function SearchBar() {
  const { query, setQuery } = useTodoContext();

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Szukaj zadania..."
    />
  );
}
