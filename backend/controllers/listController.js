const csv = require('csv-parser');
const fs = require('fs');
const List = require('../models/List');
const Agent = require('../models/Agent');
const XLSX = require('xlsx');

const uploadAndDistribute = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const agents = await Agent.find();
    if (agents.length === 0) {
      return res.status(400).json({ message: 'No agents available to distribute lists' });
    }

    const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
    let results = [];

    if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      // Process Excel files
      const workbook = XLSX.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      results = XLSX.utils.sheet_to_json(worksheet);
    } else {
      // Process CSV files
      await new Promise((resolve, reject) => {
        fs.createReadStream(req.file.path)
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', resolve)
          .on('error', reject);
      });
    }

    // Validate required fields
    const validatedResults = results.filter(item => item.FirstName && item.Phone);
    if (validatedResults.length === 0) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: 'No valid data found in the file. Ensure columns: FirstName, Phone, Notes' });
    }

    // Distribute items equally among agents
    const distributedItems = [];
    const agentsCount = agents.length;
    
    validatedResults.forEach((item, index) => {
      const agentIndex = index % agentsCount;
      distributedItems.push({
        firstName: item.FirstName || '',
        phone: item.Phone.toString(),
        notes: item.Notes || '',
        agentId: agents[agentIndex]._id
      });
    });

    // Save to database
    const list = await List.create({
      originalFileName: req.file.originalname,
      items: distributedItems
    });

    // Remove the uploaded file
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      message: `File uploaded and distributed successfully. ${validatedResults.length} items processed.`,
      list
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: error.message });
  }
};

const getDistributedLists = async (req, res) => {
  try {
    const lists = await List.find().populate('items.agentId', 'name email');
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadAndDistribute,
  getDistributedLists
};