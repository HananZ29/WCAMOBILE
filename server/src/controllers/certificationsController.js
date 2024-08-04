const pool = require('../models/db');

// Handler to get all certifications
const getAllCertifications = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM certifications');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const addCertification = async (req, res) => {
  const { certification, full_certificate_name, accreditation, price_usd, additionalcost } = req.body;
  try {
    await pool.query(
      'INSERT INTO certifications (certification, full_certificate_name, accreditation, price_usd, additionalcost) VALUES ($1, $2, $3, $4, $5)',
      [certification, full_certificate_name, accreditation, price_usd, additionalcost]
    );
    res.status(201).send('Certification added');
  } catch (error) {
    console.error('Error adding certification:', error);
    res.status(500).send('Server Error');
  }
};
// Handler to get a certification by ID
const getCertificationById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM certifications WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Certification not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching certification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const updateCertification = async (req, res) => {
  const { id } = req.params;
  const { certification, full_certificate_name, accreditation, price_usd, additionalcost } = req.body;
  try {
    await pool.query(
      'UPDATE certifications SET certification = $1, full_certificate_name = $2, accreditation = $3, price_usd = $4, additionalcost = $5 WHERE id = $6',
      [certification, full_certificate_name, accreditation, price_usd, additionalcost, id]
    );
    res.status(200).send('Certification updated');
  } catch (error) {
    console.error('Error updating certification:', error);
    res.status(500).send('Server Error');
  }
};

const deleteCertification = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM certifications WHERE id = $1', [id]);
    res.status(200).send('Certification deleted');
  } catch (error) {
    console.error('Error deleting certification:', error);
    res.status(500).send('Server Error');
  }
};
module.exports = {
  getAllCertifications,
  getCertificationById,
  updateCertification,
  deleteCertification,
  addCertification,
};
