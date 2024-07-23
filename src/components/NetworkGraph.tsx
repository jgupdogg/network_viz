import React, { useEffect, useState } from 'react';
import cytoscape from 'cytoscape';
import LayoutSelector from './LayoutSelector';
import { fetchNetworkData } from '../api/fetchNetworkData';

const NetworkGraph: React.FC = () => {
    const [elements, setElements] = useState<any[]>([]);
    const [layout, setLayout] = useState('grid');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchNetworkData();
                console.log("Fetched data:", data);
                setElements(data.data || []); // Ensure you are accessing the correct property
            } catch (error) {
                console.error("Failed to fetch network data", error);
                setError('Failed to fetch network data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (elements.length > 0) {
            const cy = cytoscape({
                container: document.getElementById('cy'),
                elements: elements,
                style: [
                    {
                        selector: 'node',
                        style: {
                            'background-color': '#666',
                            'label': 'data(label)'
                        }
                    },
                    {
                        selector: 'edge',
                        style: {
                            'width': 2,
                            'line-color': '#ccc',
                            'target-arrow-color': '#ccc',
                            'target-arrow-shape': 'triangle',
                            'curve-style': 'bezier',
                            'label': 'data(symbol)',
                            'font-size': '8px',
                            'color': '#000',
                            'text-background-opacity': 1,
                            'text-background-color': '#ffffff',
                            'text-margin-y': -10
                        }
                    }
                ],
                layout: { name: layout }
            });

            cy.layout({ name: layout }).run();
        }
    }, [elements, layout]);

    const handleLayoutChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLayout(event.target.value);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <LayoutSelector layout={layout} onLayoutChange={handleLayoutChange} />
            {loading && <p>Loading network data...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div id="cy" className="w-full h-96 border border-gray-300"></div>
        </div>
    );
};

export default NetworkGraph;
