// Check for invalid feature combinations
export const validateSmoothie = (base, booster) => {
    // Rule: Protein Base conflicts with Detox Boost
    if (base && base.name === 'Protein Base' && booster && booster.name === 'Detox Boost') {
        return {
            valid: false,
            error: '❌ Invalid combination: Protein Base cannot be paired with Detox Boost. They have conflicting nutritional properties.'
        };
    }
    
    // Rule: Green Juice Base conflicts with Beauty Boost
    if (base && base.name === 'Green Juice Base' && booster && booster.name === 'Beauty Boost') {
        return {
            valid: false,
            error: '❌ Invalid combination: Green Juice Base cannot be paired with Beauty Boost. Please choose a different combination.'
        };
    }
    
    return { valid: true };
};