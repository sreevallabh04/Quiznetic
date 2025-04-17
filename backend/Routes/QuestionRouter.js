const express = require('express');
const router = express.Router();
const QuestionController = require('../Controllers/QuestionController');
const { authenticateToken } = require('../Middlewares/auth');

// Generate questions based on parameters
router.post('/generate', authenticateToken, QuestionController.generateQuestions);

// Get question types available for a subject and class
router.get('/types', authenticateToken, QuestionController.getQuestionTypes);

module.exports = router; 