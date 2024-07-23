export const fetchNetworkData = async () => {
    try {
        const response = await fetch('https://5waa71moa0.execute-api.us-east-2.amazonaws.com/cytoscape_graph', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Add your request payload here
                // Example:
                // query: 'your-query'
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch network data:', error);
        throw error;
    }
};
