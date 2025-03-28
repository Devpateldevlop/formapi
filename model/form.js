const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://pdev5771:rxHFzG2xPEkkocvM@cluster0.bso1d.mongodb.net")
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log('MongoDB connection error: ' + err));

const collectionASchema = new mongoose.Schema({
    label: {type :'String'},
    inputType: { type:'String'},
});

const form = mongoose.model('form', collectionASchema,'form');
module.exports = form;