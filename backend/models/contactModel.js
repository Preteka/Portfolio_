const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address'
    ]
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Fallback Mock collection in case MongoDB is not connected
const ContactMock = {
  messages: [],
  async create(data) {
    const msg = { ...data, _id: Math.random().toString(36).substring(2, 9), createdAt: new Date() };
    this.messages.push(msg);
    return msg;
  },
  async find() {
    return this.messages;
  }
};

let Contact;
try {
  Contact = mongoose.model('Contact', contactSchema);
} catch (e) {
  Contact = mongoose.models.Contact;
}

module.exports = { Contact, ContactMock };
