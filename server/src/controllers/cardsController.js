const pool = require('../models/db'); // Make sure to require your database connection

// Function to handle adding card information
const addCard = async (req, res) => {
    const { card_number, valid_until, cvv, card_holder_name } = req.body;
                                               
    try {
        const result = await pool.query(
            'INSERT INTO cards (card_number, valid_until, cvv, card_holder_name) VALUES ($1, $2, $3, $4) RETURNING *',
            [card_number, valid_until, cvv, card_holder_name]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding card information:', error);
        res.status(500).json({ message: 'Failed to add card information' });
    }
};

module.exports = {
    addCard,
};
