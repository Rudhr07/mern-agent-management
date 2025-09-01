const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');

const createAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Validation
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    if (!/^\+91[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({ message: 'Mobile must be +91 followed by 10 digits' });
    }

    const agentExists = await Agent.findOne({ email });
    if (agentExists) {
      return res.status(400).json({ message: 'Agent already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const agent = await Agent.create({
      name,
      email,
      mobile,
      password: hashedPassword
    });

    res.status(201).json({
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      mobile: agent.mobile
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().select('-password');
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const agent = await Agent.findById(req.params.id);

    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    // Validation
    if (!name || !email || !mobile) {
      return res.status(400).json({ message: 'Name, email, and mobile are required' });
    }

    if (!/^\+91[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({ message: 'Mobile must be +91 followed by 10 digits' });
    }

    if (password && password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if email is already taken by another agent
    const emailExists = await Agent.findOne({ email, _id: { $ne: req.params.id } });
    if (emailExists) {
      return res.status(400).json({ message: 'Email already taken' });
    }

    agent.name = name;
    agent.email = email;
    agent.mobile = mobile;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      agent.password = await bcrypt.hash(password, salt);
    }

    const updatedAgent = await agent.save();

    res.json({
      _id: updatedAgent._id,
      name: updatedAgent.name,
      email: updatedAgent.email,
      mobile: updatedAgent.mobile
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);

    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    await Agent.deleteOne({ _id: req.params.id });
    res.json({ message: 'Agent removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAgent,
  getAgents,
  updateAgent,
  deleteAgent
};