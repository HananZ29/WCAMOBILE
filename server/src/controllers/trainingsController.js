const pool = require('../models/db');

exports.getTrainings = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM trainings');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching trainings:', error);
    res.status(500).send('Server Error');
  }
};

exports.addTraining = async (req, res) => {
  const { training, full_training_name, accreditation, price_usd, additionalcost } = req.body;
  try {
    await pool.query(
      'INSERT INTO trainings (training, full_training_name, accreditation, price_usd, additionalcost) VALUES ($1, $2, $3, $4, $5)',
      [training, full_training_name, accreditation, price_usd, additionalcost]
    );
    res.status(201).send('Training added');
  } catch (error) {
    console.error('Error adding training:', error);
    res.status(500).send('Server Error');
  }
};

exports.updateTraining = async (req, res) => {
  const { id } = req.params;
  const { training, full_training_name, accreditation, price_usd, additionalcost } = req.body;
  try {
    await pool.query(
      'UPDATE trainings SET training = $1, full_training_name = $2, accreditation = $3, price_usd = $4, additionalcost = $5 WHERE id = $6',
      [training, full_training_name, accreditation, price_usd, additionalcost, id]
    );
    res.status(200).send('Training updated');
  } catch (error) {
    console.error('Error updating training:', error);
    res.status(500).send('Server Error');
  }
};

exports.deleteTraining = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM trainings WHERE id = $1', [id]);
    res.status(200).send('Training deleted');
  } catch (error) {
    console.error('Error deleting training:', error);
    res.status(500).send('Server Error');
  }
};
