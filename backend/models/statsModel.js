const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  views: {
    type: Number,
    default: 0
  }
});

const StatsMock = {
  data: { views: 0 },
  async findOne(query) {
    return this.data;
  },
  async create(data) {
    this.data = { ...this.data, ...data };
    return this.data;
  },
  async save() {
    return this.data;
  }
};

let Stats;
try {
  Stats = mongoose.model('Stats', statsSchema);
} catch (e) {
  Stats = mongoose.models.Stats;
}

module.exports = { Stats, StatsMock };
