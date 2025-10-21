const BASE_URL = 'http://localhost:3001/api/options';

// Get all bases
export const getAllBases = async () => {
    const response = await fetch(`${BASE_URL}/bases`);
    return response.json();
};

// Get all fruits
export const getAllFruits = async () => {
    const response = await fetch(`${BASE_URL}/fruits`);
    return response.json();
};

// Get all add-ins
export const getAllAddins = async () => {
    const response = await fetch(`${BASE_URL}/addins`);
    return response.json();
};

// Get all boosters
export const getAllBoosters = async () => {
    const response = await fetch(`${BASE_URL}/boosters`);
    return response.json();
};