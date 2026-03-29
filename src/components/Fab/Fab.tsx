import { useTodoContext } from '../../context/TodoContext';
import './Fab.css';

export function Fab() {
  const { dispatch } = useTodoContext();

  return (
    <button className="fab" onClick={() => dispatch({ type: 'OPEN_CREATE' })}>
      +
    </button>
  );
}
