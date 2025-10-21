const BASE_URL = 'http://localhost:3001/api';

// Get all smoothies
export const getAllSmoothies = async () => {
    const response = await fetch(`${BASE_URL}/smoothies`);
    return response.json();
};

// Get single smoothie
export const getSmoothie = async (id) => {
    const response = await fetch(`${BASE_URL}/smoothies/${id}`);
    return response.json();
};

// Create smoothie
export const createSmoothie = async (smoothieData) => {
    const response = await fetch(`${BASE_URL}/smoothies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smoothieData)
    });
    return response.json();
};

// Update smoothie
export const updateSmoothie = async (id, smoothieData) => {
    const response = await fetch(`${BASE_URL}/smoothies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smoothieData)
    });
    return response.json();
};

// Delete smoothie
export const deleteSmoothie = async (id) => {
    const response = await fetch(`${BASE_URL}/smoothies/${id}`, {
        method: 'DELETE'
    });
    return response.json();
};