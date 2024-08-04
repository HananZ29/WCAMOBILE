const express = require('express');
const { getAllCertifications, getCertificationById,updateCertification,deleteCertification,addCertification } = require('../controllers/certificationsController');

const router = express.Router();

// Route to get all certifications
router.get('/', getAllCertifications);

// Route to get a certification by ID
router.get('/:id', getCertificationById);
router.post('/', addCertification);
router.put('/:id', updateCertification);
router.delete('/:id', deleteCertification);
module.exports = router;
