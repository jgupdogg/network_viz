import React from 'react';
import './App.css';
import NetworkGraph from './components/NetworkGraph';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Network Viz</h1>
            </header>
            <NetworkGraph />
        </div>
    );
}

export default App;
