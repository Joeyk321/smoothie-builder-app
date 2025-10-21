// Size multipliers
const SIZE_PRICES = {
    small: 0,
    medium: 1.50,
    large: 3.00
};

export const calculateTotalPrice = (base, fruits, addins, booster, size) => {
    let total = 0;
    
    // Add base price
    if (base) {
        total += parseFloat(base.price);
    }
    
    // Add fruits prices
    if (fruits && fruits.length > 0) {
        fruits.forEach(fruit => {
            total += parseFloat(fruit.price);
        });
    }
    
    // Add add-ins prices
    if (addins && addins.length > 0) {
        addins.forEach(addin => {
            total += parseFloat(addin.price);
        });
    }
    
    // Add booster price
    if (booster) {
        total += parseFloat(booster.price);
    }
    
    // Add size upcharge
    if (size && SIZE_PRICES[size]) {
        total += SIZE_PRICES[size];
    }
    
    return total.toFixed(2);
};