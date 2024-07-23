// src/api/fetchNetworkData.ts
export const fetchNetworkData = async () => {
    try {
        const response = await fetch('https://5waa71moa0.execute-api.us-east-2.amazonaws.com/cytoscape_graph', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow all origins (modify as needed)
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allow these methods
                'Access-Control-Allow-Headers': 'Content-Type, Authorization' // Allow these headers
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
        console.log("Fetched network data:", data); // Log the fetched data
        return data;
    } catch (error) {
        console.error('Failed to fetch network data:', error);
        throw error;
    }
};
