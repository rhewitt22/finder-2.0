module.exports = function(req, res, next) {
  var accountType = req.user[0].accountType;
  if (accountType === 'viewer' || 'editor') {
    return res.send(403, { message: 'You must have admin priviledges to complete this task.' });
  }
  next();
};
