const express = require('express');
const Form = require('../model/form'); // Adjust the path if necessary
const app = express();
const router = express.Router();

// Create a new form entry
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log('MongoDB connection error: ' + err));

app.post('/', async (req, res) => {
    try {
        const form = new Form(req.body);
        const savedForm = await form.save();
        res.status(201).json(savedForm);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read all form entries
app.get('/api/form', async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read a single form entry by ID
app.get('/:id', async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) return res.status(404).json({ message: 'Form not found' });
        res.status(200).json(form);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a form entry by ID
app.put('/:id', async (req, res) => {
    try {
        const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedForm) return res.status(404).json({ message: 'Form not found' });
        res.status(200).json(updatedForm);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a form entry by ID
app.delete('/:id', async (req, res) => {
    try {
        const deletedForm = await Form.findByIdAndDelete(req.params.id);
        if (!deletedForm) return res.status(404).json({ message: 'Form not found' });
        res.status(200).json({ message: 'Form deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
