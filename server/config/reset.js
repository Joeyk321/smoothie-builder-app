const pool = require('./database.js');

const createTablesQuery = `
    DROP TABLE IF EXISTS custom_smoothies CASCADE;
    DROP TABLE IF EXISTS bases CASCADE;
    DROP TABLE IF EXISTS fruits CASCADE;
    DROP TABLE IF EXISTS addins CASCADE;
    DROP TABLE IF EXISTS boosters CASCADE;

    CREATE TABLE bases (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        color VARCHAR(7) NOT NULL,
        description TEXT
    );

    CREATE TABLE fruits (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        color VARCHAR(7) NOT NULL,
        emoji VARCHAR(10)
    );

    CREATE TABLE addins (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(50)
    );

    CREATE TABLE boosters (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        benefit VARCHAR(100)
    );

    CREATE TABLE custom_smoothies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        size VARCHAR(20) NOT NULL,
        base_id INTEGER REFERENCES bases(id),
        fruits TEXT,
        addins TEXT,
        booster_id INTEGER REFERENCES boosters(id),
        total_price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

const insertDataQuery = `
    INSERT INTO bases (name, price, color, description) VALUES
    ('Acai Base', 5.00, '#8B008B', 'Rich in antioxidants'),
    ('Green Juice Base', 4.50, '#228B22', 'Packed with vitamins'),
    ('Protein Base', 6.00, '#D2691E', 'High protein content'),
    ('Coconut Base', 4.00, '#F5F5DC', 'Refreshing and hydrating'),
    ('Espresso Base', 4.50, '#3E2723', 'Rich coffee flavor'),
    ('Cold Brew Base', 5.00, '#1A1A1A', 'Smooth and bold'),
    ('Latte Base', 5.50, '#8D6E63', 'Creamy coffee blend'),
    ('Matcha Base', 5.00, '#4CAF50', 'Premium Japanese green tea');

    INSERT INTO fruits (name, price, color, emoji) VALUES
    ('Strawberry', 1.00, '#FF0000', '🍓'),
    ('Banana', 0.75, '#FFD700', '🍌'),
    ('Mango', 1.50, '#FFA500', '🥭'),
    ('Blueberry', 1.25, '#0000FF', '🫐'),
    ('Pineapple', 1.00, '#FFFF00', '🍍'),
    ('Kiwi', 1.00, '#00FF00', '🥝'),
    ('Vanilla Flavor', 0.75, '#F5E6D3', '🍦'),
    ('Caramel Flavor', 0.75, '#C68E17', '🍮'),
    ('Hazelnut Flavor', 0.75, '#8B4513', '🌰'),
    ('Mocha Flavor', 1.00, '#3E2723', '🍫');

    INSERT INTO addins (name, price, category) VALUES
    ('Protein Powder', 2.00, 'protein'),
    ('Chia Seeds', 1.00, 'seeds'),
    ('Flax Seeds', 1.00, 'seeds'),
    ('Spinach', 0.50, 'greens'),
    ('Kale', 0.50, 'greens'),
    ('Peanut Butter', 1.50, 'nut'),
    ('Almond Butter', 1.75, 'nut'),
    ('Honey', 0.75, 'sweetener'),
    ('Agave', 0.75, 'sweetener'),
    ('Whipped Cream', 1.00, 'topping'),
    ('Extra Shot', 1.50, 'shot'),
    ('Oat Milk', 0.75, 'milk'),
    ('Almond Milk', 0.75, 'milk'),
    ('Coconut Milk', 0.75, 'milk'),
    ('Cinnamon', 0.25, 'spice'),
    ('Sugar (2 tbsp)', 0.00, 'sugar');

    INSERT INTO boosters (name, price, benefit) VALUES
    ('Energy Boost', 2.50, 'Increases energy'),
    ('Immunity Boost', 2.50, 'Strengthens immune system'),
    ('Beauty Boost', 3.00, 'Skin and hair health'),
    ('Detox Boost', 2.75, 'Cleansing properties'),
    ('Focus Boost', 2.50, 'Mental clarity');
`;

async function resetDatabase() {
    try {
        console.log('Dropping and creating tables...');
        await pool.query(createTablesQuery);
        console.log('✅ Tables created successfully!');
        
        console.log('Inserting data...');
        await pool.query(insertDataQuery);
        console.log('✅ Data inserted successfully!');
        
        console.log('🎉 Database reset complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error resetting database:', error);
        process.exit(1);
    }
}

resetDatabase();