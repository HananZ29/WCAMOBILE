const pool = require('../models/db');

// Fetch all activity types
const fetchActivityTypes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM activity');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching activity types:', error);
    res.status(500).send('Server Error');
  }
};

// Add a new activity type
const addActivityType = async (req, res) => {
  const { activityname } = req.body; // Ensure the name matches the key in the frontend
  console.log('Received activityname:', activityname); // Debugging line
  try {
    const result = await pool.query('INSERT INTO activity (activityname) VALUES ($1) RETURNING *', [activityname]); // Ensure RETURNING *
    console.log('Query result:', result.rows); // Debugging line
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding activity type:', error);
    res.status(500).send('Server Error');
  }
};

// Edit an activity type
const editActivityType = async (req, res) => {
  const { id } = req.params;
  const { activityname } = req.body; // Ensure the name matches the key in the frontend
  console.log('Editing activity ID:', id, 'New name:', activityname); // Debugging line
  try {
    const result = await pool.query(
      'UPDATE activity SET activityname = $1 WHERE id = $2 RETURNING *',
      [activityname, id]
    );
    console.log('Query result:', result.rows); // Debugging line
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error editing activity type:', error);
    res.status(500).send('Server Error');
  }
};

// Delete an activity type
const deleteActivityType = async (req, res) => {
  const { id } = req.params;
  console.log('Deleting activity ID:', id); // Debugging line
  try {
    await pool.query('DELETE FROM activity WHERE id = $1', [id]);
    res.json({ message: 'Activity type deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity type:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  fetchActivityTypes,
  addActivityType,
  editActivityType,
  deleteActivityType,
};
