import { SearchBar } from '../components/SearchBar/SearchBar';
import { FilterBar } from '../components/FilterBar/FilterBar';
import { TodoList } from '../components/TodoList/TodoList';
import { SidePanel } from '../components/SidePanel/SidePanel';
import { Fab } from '../components/Fab/Fab';

export default function TodosPage() {
  return (
    <main>
      <section aria-label='Wyszukiwanie i filtrowanie zadań'>
        <SearchBar />
        <FilterBar />
      </section>
      <section aria-label='Lista zadań'>
        <TodoList />
      </section>
      <SidePanel />
      <Fab />
    </main>
  );
}
