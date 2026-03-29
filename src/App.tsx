import { TodoProvider } from './context/TodoContext';
import { ThemeProvider } from './context/ThemeContext';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar/FilterBar';
import { TodoList } from './components/TodoList/TodoList';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { SidePanel } from './components/SidePanel/SidePanel';
import './index.css';
import { Fab } from './components/Fab/Fab';

export default function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <Navbar />

        <div className="app-layout">
          <Sidebar />
          <main className="app-main">
            <div className="app-content">
              <SearchBar />
              <FilterBar />
              <TodoList />
            </div>
          </main>
        </div>

        <SidePanel />
        <Fab />
      </TodoProvider>
    </ThemeProvider>
  );
}
