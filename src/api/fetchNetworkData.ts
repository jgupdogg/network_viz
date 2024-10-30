// src/api/fetchNetworkData.ts
const API_URL = 'https://w0jium37l6.execute-api.us-east-1.amazonaws.com/prod/flipside';

export const fetchNetworkData = async () => {
    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Simplified fetch request without unnecessary headers
            const response = await fetch(API_URL);

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
