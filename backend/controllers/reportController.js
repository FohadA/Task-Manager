const reportService = require('../services/reportService');

const getReports = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [summary, tasksByStatus, topPendingProjects, productivity] = await Promise.all([
      reportService.getSummary(userId),
      reportService.getTasksByStatus(userId),
      reportService.getTopProjectsWithPendingTasks(userId),
      reportService.getProductivityByDate(userId),
    ]);

    res.status(200).json({ summary, tasksByStatus, topPendingProjects, productivity });
  } catch (error) {
    res.status(error.statusCode || 500);
    next(error);
  }
};

module.exports = { getReports };