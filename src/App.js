import './App.css';
import Navbar from './components/Navbar/Navbar';
import Selector from './components/Selector/Selector';
import Charts from './components/Charts/Charts';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Selector />
      <Charts />
    </div>
  );
}

export default App;
