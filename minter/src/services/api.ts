const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const newNFT = (data: any): Promise<any> =>
    fetch(`${API_URL}/mint`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(data),
    });
