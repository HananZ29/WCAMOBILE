const db = require('../models/db');

// Insert order into the database
const createOrder = async (req, res) => {
  const { certificationId, userId, activityId, price } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO orders (certification_id, user_id, activity_id, price, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [certificationId, userId, activityId, price]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

const getOrders = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM orders');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  createOrder,
  getOrders,
};
