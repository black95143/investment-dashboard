import './App.css';
import Navbar from './components/Navbar/Navbar';
import Selector from './components/Selector/Selector';
import Charts from './components/Charts/Charts';
import chartCollections from './data/chart-collections.json';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Selector />
      <Charts chartCollections={chartCollections} />
    </div>
  );
}

export default App;
