import React, { useEffect, useState } from 'react';
import cytoscape from 'cytoscape';
import LayoutSelector from '../LayoutSelector';
import { fetchNetworkData } from '../api/fetchNetworkData';

const NetworkGraph: React.FC = () => {
    const [elements, setElements] = useState<any[]>([]);
    const [layout, setLayout] = useState('grid');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchNetworkData();
                setElements(data);
                console.log("Network data fetched successfully:", data);
            } catch (error) {
                console.error("Failed to fetch network data", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (elements.length > 0) {
            cytoscape({
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
        }
    }, [elements, layout]);

    const handleLayoutChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLayout(event.target.value);
    };

    return (
        <div>
            <LayoutSelector layout={layout} onLayoutChange={handleLayoutChange} />
            <div id="cy" style={{ width: '100%', height: '80vh', border: '1px solid #ccc' }}></div>
        </div>
    );
};

export default NetworkGraph;
