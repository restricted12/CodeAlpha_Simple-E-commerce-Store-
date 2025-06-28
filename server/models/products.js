const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  stock: { type: Number, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
