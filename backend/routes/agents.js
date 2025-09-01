const express = require('express');
const { createAgent, getAgents, updateAgent, deleteAgent } = require('../controllers/agentController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .post(protect, createAgent)
  .get(protect, getAgents);

router.route('/:id')
  .put(protect, updateAgent)
  .delete(protect, deleteAgent);

module.exports = router;