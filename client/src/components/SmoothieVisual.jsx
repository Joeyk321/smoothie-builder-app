import React from 'react';
import './SmoothieVisual.css';

function SmoothieVisual({ base, fruits, size, drinkType = 'smoothie' }) {
    // Determine cup size
    const cupHeight = size === 'small' ? '250px' : size === 'medium' ? '300px' : '350px';
    
    // Get base color
    const baseColor = base ? base.color : '#ddd';
    
    // Get fruit colors
    const fruitColors = fruits.map(f => f.color);
    
    // Create gradient from base and fruits
    const createGradient = () => {
        if (!base) return '#ddd';
        
        if (fruitColors.length === 0) {
            return baseColor;
        }
        
        // Mix base color with fruit colors
        const colors = [baseColor, ...fruitColors];
        const percentages = colors.map((_, i) => `${(i / colors.length) * 100}%`);
        
        return `linear-gradient(180deg, ${colors.map((c, i) => `${c} ${percentages[i]}`).join(', ')})`;
    };

    return (
        <div className="smoothie-visual">
            <h3>Your {drinkType === 'coffee' ? 'Coffee' : 'Smoothie'} Preview</h3>
            <div className="cup-container">
                <div className="cup" style={{ height: cupHeight }}>
                    <div 
                        className="smoothie-liquid" 
                        style={{ background: createGradient() }}
                    >
                        {fruits.map((fruit, index) => (
                            <span key={index} className="floating-fruit">
                                {fruit.emoji}
                            </span>
                        ))}
                    </div>
                    <div className="cup-rim"></div>
                </div>
                <div className="straw"></div>
            </div>
            <p className="cup-size">{size ? size.toUpperCase() : 'SELECT SIZE'}</p>
        </div>
    );
}

export default SmoothieVisual;