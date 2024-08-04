const pool = require('../models/db');

// Controller for registering a user
const registerUser = async (req, res) => {
  console.log('Request Body:', req.body);  // Log the request body to debug
  const { company_name, email, phone_number, country } = req.body;

  try {
    const newUser = await pool.query(
      'INSERT INTO users (company_name, email, phone_number, country) VALUES ($1, $2, $3, $4) RETURNING *',
      [company_name, email, phone_number, country]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for logging in a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json(user.rows[0]);
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for fetching customers
const fetchCustomers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    console.log('Fetched customers:', result.rows); 
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).send('Server Error');
  }
};

// Controller for fetching a specific customer
const fetchCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Customer not found');
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).send('Server Error');
  }
};

// Controller for updating a customer
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { company_name, email, phone_number, country } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET company_name = $1, email = $2, phone_number = $3, country = $4 WHERE id = $5 RETURNING *',
      [company_name, email, phone_number, country, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Customer not found');
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).send('Server Error');
  }
};

// Controller for deleting a customer
const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Customer not found');
    }
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  registerUser,
  loginUser,
  fetchCustomers,
  fetchCustomerById,
  updateCustomer,
  deleteCustomer,
};
