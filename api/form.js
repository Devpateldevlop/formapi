const express = require('express');
const form = require('../model/form'); // Adjust the path if necessary
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Create a new form entry
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log('MongoDB connection error: ' + err));

app.post('/', async (req, res) => {
    try {
        const form = new form(req.body);
        const savedform = await form.save();
        res.status(201).json(savedform);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read all form entries
app.get('/api/form', async (req, res) => {
    try {
        const forms = await form.find();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read a single form entry by ID
app.get('/:id', async (req, res) => {
    try {
        const form = await form.findById(req.params.id);
        if (!form) return res.status(404).json({ message: 'form not found' });
        res.status(200).json(form);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a form entry by ID
app.put('/:id', async (req, res) => {
    try {
        const updatedform = await form.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedform) return res.status(404).json({ message: 'form not found' });
        res.status(200).json(updatedform);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a form entry by ID
app.delete('/:id', async (req, res) => {
    try {
        const deletedform = await form.findByIdAndDelete(req.params.id);
        if (!deletedform) return res.status(404).json({ message: 'form not found' });
        res.status(200).json({ message: 'form deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
