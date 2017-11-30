const express = require('express');
const router = express.Router();
const {issueStore} = require('../models');

function percentage(count, total) {
  if (total > 0) {
    return count / total;
  }
  return 0;
}

router.get('/', function(req, res) {
  const openIssues = issueStore.getAllOpen();
  const openIssuesCount = issueStore.getAllOpen().length;
  const highSeverityCount =
    openIssues.filter(issue => issue.severity === 'High').length;
  
  res.render('dashboard', {
      openIssuesCount, 
      highSeverityPercentage: percentage(highSeverityCount, openIssuesCount)
  });
});

module.exports = router;
