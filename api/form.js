const express = require('express');
const form = require('../model/form'); // Adjust the path if necessary
const app = express();
const router = express.Router();
const mongoose = require('mongoose');

const cors = require('cors');



app.use(cors({
    origin: '*', // Allow all domains or restrict to your frontend's domain
    methods: ['GET', 'POST','PUT','DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Allowed headers
}));
app.options('*', cors()); // This handles preflight requests

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Create a new form entry
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log('MongoDB connection error: ' + err));

app.post('/api/form', async (req, res) => {
    try {
        if (!Array.isArray(req.body)) {
            return res.status(400).json({ message: 'Expected an array of form data' });
        }
        const savedForms = await form.insertMany(req.body);
        // await form.save();
        res.status(201).json(savedForms);

        // const form = new form(req.body);
        // res.status(201).json(savedform);
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
app.delete('/api/form', async (req, res) => {
    try {
        await form.deleteMany({});
        // if (!deletedform) return res.status(404).json({ message: 'form not found' });
        res.status(200).json({ message: 'form deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', ' GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});