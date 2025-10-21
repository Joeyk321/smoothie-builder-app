import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBases, getAllFruits, getAllAddins, getAllBoosters } from '../services/optionsAPI';
import { createSmoothie } from '../services/smoothiesAPI';
import { calculateTotalPrice } from '../utilities/priceCalculator';
import { validateSmoothie } from '../utilities/validation';
import SmoothieVisual from '../components/SmoothieVisual';
import './CreateSmoothie.css';

function CreateSmoothie() {
    const navigate = useNavigate();
    
    // State for drink type
    const [drinkType, setDrinkType] = useState('smoothie'); // 'smoothie' or 'coffee'
    
    // State for options
    const [bases, setBases] = useState([]);
    const [fruits, setFruits] = useState([]);
    const [addins, setAddins] = useState([]);
    const [boosters, setBoosters] = useState([]);
    
    // State for selections
    const [name, setName] = useState('');
    const [selectedBase, setSelectedBase] = useState(null);
    const [selectedFruits, setSelectedFruits] = useState([]);
    const [selectedAddins, setSelectedAddins] = useState([]);
    const [selectedBooster, setSelectedBooster] = useState(null);
    const [size, setSize] = useState('medium');
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState('');

    // Fetch options on mount
    useEffect(() => {
        fetchOptions();
    }, []);

    // Recalculate price when selections change
    useEffect(() => {
        const price = calculateTotalPrice(selectedBase, selectedFruits, selectedAddins, selectedBooster, size);
        setTotalPrice(price);
    }, [selectedBase, selectedFruits, selectedAddins, selectedBooster, size]);

    // Reset selections when switching drink type
    useEffect(() => {
        setSelectedBase(null);
        setSelectedFruits([]);
        setSelectedAddins([]);
        setSelectedBooster(null);
    }, [drinkType]);

    const fetchOptions = async () => {
        try {
            const [basesData, fruitsData, addinsData, boostersData] = await Promise.all([
                getAllBases(),
                getAllFruits(),
                getAllAddins(),
                getAllBoosters()
            ]);
            setBases(basesData);
            setFruits(fruitsData);
            setAddins(addinsData);
            setBoosters(boostersData);
        } catch (err) {
            console.error('Error fetching options:', err);
            setError('Failed to load options');
        }
    };

    const handleFruitToggle = (fruit) => {
        if (selectedFruits.find(f => f.id === fruit.id)) {
            setSelectedFruits(selectedFruits.filter(f => f.id !== fruit.id));
        } else {
            setSelectedFruits([...selectedFruits, fruit]);
        }
    };

    const handleAddinToggle = (addin) => {
        if (selectedAddins.find(a => a.id === addin.id)) {
            setSelectedAddins(selectedAddins.filter(a => a.id !== addin.id));
        } else {
            setSelectedAddins([...selectedAddins, addin]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!name.trim()) {
            setError(`Please enter a name for your ${drinkType}`);
            return;
        }
        if (!selectedBase) {
            setError('Please select a base');
            return;
        }
        if (selectedFruits.length === 0) {
            setError(drinkType === 'smoothie' ? 'Please select at least one fruit' : 'Please select at least one flavor');
            return;
        }

        // Validate combination (only for smoothies)
        if (drinkType === 'smoothie') {
            const validation = validateSmoothie(selectedBase, selectedBooster);
            if (!validation.valid) {
                setError(validation.error);
                return;
            }
        }

        try {
            const smoothieData = {
                name: name.trim(),
                size,
                base_id: selectedBase.id,
                fruits: JSON.stringify(selectedFruits.map(f => f.id)),
                addins: JSON.stringify(selectedAddins.map(a => a.id)),
                booster_id: selectedBooster ? selectedBooster.id : null,
                total_price: totalPrice
            };

            await createSmoothie(smoothieData);
            navigate('/smoothies');
        } catch (err) {
            console.error('Error creating smoothie:', err);
            setError('Failed to create smoothie');
        }
    };

    return (
        <div className="create-smoothie">
            <h1>Build Your Custom Beverage</h1>
            
            <div className="drink-type-toggle">
                <button
                    type="button"
                    className={`toggle-btn ${drinkType === 'smoothie' ? 'active' : ''}`}
                    onClick={() => setDrinkType('smoothie')}
                >
                    🥤 Smoothies
                </button>
                <button
                    type="button"
                    className={`toggle-btn ${drinkType === 'coffee' ? 'active' : ''}`}
                    onClick={() => setDrinkType('coffee')}
                >
                    ☕ Coffee
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="create-layout">
                <div className="form-column">
                    <form onSubmit={handleSubmit}>
                        {/* Drink Name */}
                        <section className="form-section">
                            <h2>Name Your {drinkType === 'smoothie' ? 'Smoothie' : 'Coffee'}</h2>
                            <input
                                type="text"
                                placeholder={drinkType === 'smoothie' ? 'e.g., Berry Blast' : 'e.g., Caramel Dream'}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="smoothie-name-input"
                            />
                        </section>

                        {/* Size Selection */}
                        <section className="form-section">
                            <h2>Choose Size</h2>
                            <div className="size-options">
                                {['small', 'medium', 'large'].map(s => (
                                    <button
                                        key={s}
                                        type="button"
                                        className={`size-btn ${size === s ? 'active' : ''}`}
                                        onClick={() => setSize(s)}
                                    >
                                        {s.charAt(0).toUpperCase() + s.slice(1)}
                                        {s !== 'small' && <span className="price-tag">+${s === 'medium' ? '1.50' : '3.00'}</span>}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Base Selection */}
                        <section className="form-section">
                            <h2>Choose Your Base</h2>
                            <div className="options-grid">
                                {bases.filter(base => {
                                    if (drinkType === 'smoothie') {
                                        return ['Acai Base', 'Green Juice Base', 'Protein Base', 'Coconut Base'].includes(base.name);
                                    } else {
                                        return ['Espresso Base', 'Cold Brew Base', 'Latte Base', 'Matcha Base'].includes(base.name);
                                    }
                                }).map(base => (
                                    <div
                                        key={base.id}
                                        className={`option-card ${selectedBase?.id === base.id ? 'selected' : ''}`}
                                        onClick={() => setSelectedBase(base)}
                                        style={{ borderColor: selectedBase?.id === base.id ? base.color : '#ddd' }}
                                    >
                                        <div className="option-color" style={{ backgroundColor: base.color }}></div>
                                        <h3>{base.name}</h3>
                                        <p className="description">{base.description}</p>
                                        <span className="price">${base.price}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Fruits/Flavors Selection */}
                        <section className="form-section">
                            <h2>Add {drinkType === 'smoothie' ? 'Fruits' : 'Flavors'} (Select Multiple)</h2>
                            <div className="options-grid">
                                {fruits.filter(fruit => {
                                    if (drinkType === 'smoothie') {
                                        return !fruit.name.includes('Flavor');
                                    } else {
                                        return fruit.name.includes('Flavor');
                                    }
                                }).map(fruit => (
                                    <div
                                        key={fruit.id}
                                        className={`option-card ${selectedFruits.find(f => f.id === fruit.id) ? 'selected' : ''}`}
                                        onClick={() => handleFruitToggle(fruit)}
                                    >
                                        <div className="fruit-emoji">{fruit.emoji}</div>
                                        <h3>{fruit.name.replace(' Flavor', '')}</h3>
                                        <span className="price">${fruit.price}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Add-ins Selection */}
                        <section className="form-section">
                            <h2>Add-ins (Optional)</h2>
                            <div className="options-grid">
                                {addins.filter(addin => {
                                    if (drinkType === 'smoothie') {
                                        return ['protein', 'seeds', 'greens', 'nut', 'sweetener'].includes(addin.category);
                                    } else {
                                        return ['topping', 'shot', 'milk', 'spice', 'sugar'].includes(addin.category);
                                    }
                                }).map(addin => (
                                    <div
                                        key={addin.id}
                                        className={`option-card small ${selectedAddins.find(a => a.id === addin.id) ? 'selected' : ''}`}
                                        onClick={() => handleAddinToggle(addin)}
                                    >
                                        <h3>{addin.name}</h3>
                                        <span className="category">{addin.category}</span>
                                        <span className="price">${addin.price}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Booster Selection - Only for Smoothies */}
                        {drinkType === 'smoothie' && (
                            <section className="form-section">
                                <h2>Add a Booster (Optional)</h2>
                                <div className="options-grid">
                                    {boosters.map(booster => (
                                        <div
                                            key={booster.id}
                                            className={`option-card ${selectedBooster?.id === booster.id ? 'selected' : ''}`}
                                            onClick={() => setSelectedBooster(selectedBooster?.id === booster.id ? null : booster)}
                                        >
                                            <h3>{booster.name}</h3>
                                            <p className="benefit">{booster.benefit}</p>
                                            <span className="price">${booster.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Total Price and Submit */}
                        <div className="summary">
                            <div className="total-price">
                                <h2>Total Price: ${totalPrice}</h2>
                            </div>
                            <button type="submit" className="submit-btn">
                                Create My {drinkType === 'smoothie' ? 'Smoothie' : 'Coffee'} 🎉
                            </button>
                        </div>
                    </form>
                </div>

                <div className="visual-column">
                    <SmoothieVisual 
                        base={selectedBase}
                        fruits={selectedFruits}
                        size={size}
                        drinkType={drinkType}
                    />
                </div>
            </div>
        </div>
    );
}

export default CreateSmoothie;