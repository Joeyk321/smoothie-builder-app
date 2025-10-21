import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllBases, getAllFruits, getAllAddins, getAllBoosters } from '../services/optionsAPI';
import { getSmoothie, updateSmoothie } from '../services/smoothiesAPI';
import { calculateTotalPrice } from '../utilities/priceCalculator';
import { validateSmoothie } from '../utilities/validation';
import SmoothieVisual from '../components/SmoothieVisual';
import './CreateSmoothie.css';

function EditSmoothie() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [drinkType, setDrinkType] = useState('smoothie');
    const [bases, setBases] = useState([]);
    const [fruits, setFruits] = useState([]);
    const [addins, setAddins] = useState([]);
    const [boosters, setBoosters] = useState([]);
    
    const [name, setName] = useState('');
    const [selectedBase, setSelectedBase] = useState(null);
    const [selectedFruits, setSelectedFruits] = useState([]);
    const [selectedAddins, setSelectedAddins] = useState([]);
    const [selectedBooster, setSelectedBooster] = useState(null);
    const [size, setSize] = useState('medium');
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [id]);

    useEffect(() => {
        const price = calculateTotalPrice(selectedBase, selectedFruits, selectedAddins, selectedBooster, size);
        setTotalPrice(price);
    }, [selectedBase, selectedFruits, selectedAddins, selectedBooster, size]);

    const fetchData = async () => {
        try {
            const [basesData, fruitsData, addinsData, boostersData, smoothieData] = await Promise.all([
                getAllBases(),
                getAllFruits(),
                getAllAddins(),
                getAllBoosters(),
                getSmoothie(id)
            ]);
            
            setBases(basesData);
            setFruits(fruitsData);
            setAddins(addinsData);
            setBoosters(boostersData);
            
            setName(smoothieData.name);
            setSize(smoothieData.size);
            
            const base = basesData.find(b => b.id === smoothieData.base_id);
            setSelectedBase(base);
            
            // Detect drink type based on base
            if (base && ['Espresso Base', 'Cold Brew Base', 'Latte Base', 'Matcha Base'].includes(base.name)) {
                setDrinkType('coffee');
            } else {
                setDrinkType('smoothie');
            }
            
            if (smoothieData.fruits) {
                const fruitIds = JSON.parse(smoothieData.fruits);
                const selectedFruitsData = fruitsData.filter(f => fruitIds.includes(f.id));
                setSelectedFruits(selectedFruitsData);
            }
            
            if (smoothieData.addins) {
                const addinIds = JSON.parse(smoothieData.addins);
                const selectedAddinsData = addinsData.filter(a => addinIds.includes(a.id));
                setSelectedAddins(selectedAddinsData);
            }
            
            if (smoothieData.booster_id) {
                const booster = boostersData.find(b => b.id === smoothieData.booster_id);
                setSelectedBooster(booster);
            }
            
            setLoading(false);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load smoothie');
            setLoading(false);
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

        if (!name.trim()) {
            setError('Please enter a name for your beverage');
            return;
        }
        if (!selectedBase) {
            setError('Please select a base');
            return;
        }
        if (selectedFruits.length === 0) {
            setError('Please select at least one fruit or flavor');
            return;
        }

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

            await updateSmoothie(id, smoothieData);
            navigate('/smoothies');
        } catch (err) {
            console.error('Error updating smoothie:', err);
            setError('Failed to update smoothie');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="create-smoothie">
            <h1>✏️ Edit Your {drinkType === 'smoothie' ? 'Smoothie' : 'Coffee'}</h1>
            
            {error && <div className="error-message">{error}</div>}

            <div className="create-layout">
                <div className="form-column">
                    <form onSubmit={handleSubmit}>
                        <section className="form-section">
                            <h2>Name Your {drinkType === 'smoothie' ? 'Smoothie' : 'Coffee'}</h2>
                            <input
                                type="text"
                                placeholder="e.g., Berry Blast"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="smoothie-name-input"
                            />
                        </section>

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

                        <div className="summary">
                            <div className="total-price">
                                <h2>Total Price: ${totalPrice}</h2>
                            </div>
                            <button type="submit" className="submit-btn">
                                Update {drinkType === 'smoothie' ? 'Smoothie' : 'Coffee'} ✅
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

export default EditSmoothie;