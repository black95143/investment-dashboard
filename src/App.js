import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Selector from './components/Selector/Selector';
import Charts from './components/Charts/Charts';
import chartCollections from './data/chart-collections.json';
import releases from './data/releases.json';
import sources from './data/sources.json';

function App() {
  const [filteredReleaseId, setFilteredReleaseId] = useState(0);
  const [filteredSourceId, setFilteredSourceId] = useState(0);

  const filteredCharts = chartCollections.filter(chart => {
    if (filteredReleaseId === 0 && filteredSourceId === 0) return true
    if (filteredReleaseId === 0 && filteredSourceId !== 0) {
      return chart.source_id === filteredSourceId
    }
    if (filteredReleaseId !== 0 && filteredSourceId === 0) {
      return chart.release_id === filteredReleaseId
    }
    if (filteredReleaseId !== 0 && filteredSourceId !== 0) {
      return chart.release_id === filteredReleaseId && chart.source_id === filteredSourceId
    }
  });

  const releaseIdChangeHandler = (selectedReleaseId) => {
    setFilteredReleaseId(selectedReleaseId);
  };

  const sourceIdChangeHandler = (selectedSourceId) => {
    setFilteredSourceId(selectedSourceId);
  };

  return (
    <div className="App">
      <Navbar />
      <Selector
        selectedReleaseId={filteredReleaseId}
        selectedSourceId={filteredSourceId}
        releases={releases}
        sources={sources}
        onReleaseIdChange={releaseIdChangeHandler}
        onSourceIdChange={sourceIdChangeHandler}
      />
      <Charts charts={filteredCharts} />
    </div>
  );
}

export default App;
