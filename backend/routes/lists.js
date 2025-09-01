const express = require('express');
const { uploadAndDistribute, getDistributedLists } = require('../controllers/listController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

router.route('/upload')
  .post(protect, upload.single('file'), uploadAndDistribute);

router.route('/')
  .get(protect, getDistributedLists);

module.exports = router;