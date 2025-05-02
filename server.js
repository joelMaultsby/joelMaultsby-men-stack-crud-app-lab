const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
})

const Plant = mongoose.model('Plant', plantSchema)
module.exports = Plant

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/test', (req, res) => {
  res.send('Server is running and /test route works!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});