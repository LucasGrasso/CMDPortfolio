import Console from "./components/Console";
import SnakeGame from "./components/SnakeGame";


function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <SnakeGame width={10} height={10} />
      {true == false && <Console />}
    </div>
  );
}

export default App
