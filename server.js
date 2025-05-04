const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose')
app.use(express.urlencoded({ extended: true }));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/plantDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
})

const Plant = mongoose.model('Plant', plantSchema)
module.exports = Plant

app.get('/', (req, res) => {
  res.redirect('index');
});

app.get('/plants/new', (req, res) => {
  res.render('new');
});

app.use(express.urlencoded({ extended: false }));

app.post('/plants', async (req, res) => {
    const { name, description, image } = req.body;

    const newPlant = new Plant({ name, description, image });
    newPlant.save()
        .then(() => res.redirect('/plants'))
});

app.get('/plants', async (req, res) => {
    const plants = await Plant.find();
    res.render('index', { plants });

});

app.get('/plants/:id', async (req, res) => {
    const plant = await Plant.findById(req.params.id);
    res.render('show', { plant });

});

app.get('/plants/:id/edit', async (req, res) => {
    const plant = await Plant.findById(req.params.id);
    res.render('edit', { plant });

});

app.post('/plants/:id', async (req, res) => {
  const { name, description, image } = req.body;

    await Plant.findByIdAndUpdate(req.params.id, {
      name,
      description,
      image,
    });
    res.redirect(`/plants/${req.params.id}`);

});

app.put('/plants/:id', async (req, res) => {
    const { name, description, image } = req.body;
    await Plant.findByIdAndUpdate(req.params.id, { name, description, image });
    res.redirect('/plants');

});

app.delete('/plants/:id', async (req, res) => {
    await Plant.findByIdAndDelete(req.params.id);
    res.redirect('/plants');

});




app.get('/test', (req, res) => {
  res.send('test route is working');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
