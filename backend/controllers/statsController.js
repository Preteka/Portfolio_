const { Stats, StatsMock } = require('../models/statsModel');

const getVisitorCount = async (req, res) => {
  const isDbConnected = req.app.get('dbConnected');

  try {
    if (isDbConnected) {
      let stats = await Stats.findOne({ key: 'visitor_count' });
      if (!stats) {
        stats = await Stats.create({ key: 'visitor_count', views: 1 });
      } else {
        stats.views += 1;
        await stats.save();
      }
      return res.status(200).json({ success: true, count: stats.views });
    } else {
      let stats = await StatsMock.findOne({ key: 'visitor_count' });
      stats.views += 1;
      return res.status(200).json({ success: true, count: stats.views });
    }
  } catch (error) {
    console.error('Error fetching visitor counter:', error);
    return res.status(500).json({ success: false, message: 'Could not fetch views statistics' });
  }
};

module.exports = { getVisitorCount };
