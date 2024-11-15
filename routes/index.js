var express = require('express');
var router = express.Router();
const mongodb = 'mongodb+srv://quyndph48339:123456quy@quynguyen12.45xzb.mongodb.net/?retryWrites=true&w=majority&appName=Quynguyen12'
const mongoose = require('mongoose')
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log("Connected to MongoDB")
}).catch(err => {
  console.log(err)
})

const carSchema = new mongoose.Schema({
  maXe: {type: String, required: true},
  name: {type: String, required: true},
  price: {type: Number, required: true},
  year: {type: Number, required: true},
  brand: {type: String, required: true},
});

const Car = require('../models/Car');
exports.createCar = async (req, res) => {
  try {
    const { MaXe, Name, Price, Year, Brand } = req.body;

    if (!MaXe || !Name || !Price || !Year || !Brand) {
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin!' });
    }

    const newCar = new Car({ MaXe, Name, Price, Year, Brand });
    await newCar.save();
    res.status(201).json({ message: 'Ô tô đã được tạo thành công', car: newCar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const { createCar, getCars } = require('../controllers/carController');

router.post('/create', createCar);
router.get('/list', getCars);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
