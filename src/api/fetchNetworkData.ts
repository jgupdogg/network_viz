// src/api/fetchNetworkData.ts
const API_URL = 'https://5waa71moa0.execute-api.us-east-2.amazonaws.com/cytoscape_graph';

export const fetchNetworkData = async () => {
    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched network data:", data); 
            return data;
        } catch (error) {
            console.error(`Attempt ${attempt} - Failed to fetch network data:`, error);

            if (attempt === maxRetries) {
                throw error;
            }
        }
    }
};
