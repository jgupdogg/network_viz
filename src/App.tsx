import React from 'react';
import './App.css';
import NetworkGraph from './components/NetworkGraph';

const App: React.FC = () => {
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <header className="w-full bg-blue-600 text-white py-4 text-center">
                <h1 className="text-3xl">Network Viz</h1>
            </header>
            <NetworkGraph />
        </div>
    );
}

export default App;
