const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const { sendContactMessage } = require('../controllers/contactController');
const { getVisitorCount } = require('../controllers/statsController');

router.post('/contact', sendContactMessage);
router.get('/stats', getVisitorCount);

router.get('/resume', (req, res) => {
  const resumeDir = path.join(__dirname, '../assets');
  const resumePath = path.join(resumeDir, 'resume.pdf');

  // Verify and create dummy resume if not exists
  if (!fs.existsSync(resumeDir)) {
    fs.mkdirSync(resumeDir, { recursive: true });
  }
  if (!fs.existsSync(resumePath)) {
    // Write dynamic binary bytes or pdf mockup
    fs.writeFileSync(resumePath, 'Preteka Resume - PDF Document Mockup. (Software Engineer & Full Stack Developer - React.js, Vite, Node, Express, MongoDB)');
  }

  res.download(resumePath, 'Preteka_Resume.pdf', (err) => {
    if (err) {
      console.error('Download error:', err);
      if (!res.headersSent) {
        res.status(500).json({ success: false, message: 'Could not download resume file.' });
      }
    }
  });
});

module.exports = router;
