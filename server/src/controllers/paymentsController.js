const pool = require('../models/db');

exports.updatePaymentKey = async (req, res) => {
  const { key } = req.body;
  try {
    await pool.query('UPDATE payments SET key = $1 WHERE id = 1', [key]); // Assuming there's only one record for payment key
    res.status(200).send('Payment key updated');
  } catch (error) {
    console.error('Error updating payment key:', error);
    res.status(500).send('Server Error');
  }
};
