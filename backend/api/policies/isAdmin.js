module.exports = function(req, res, next) {
  if (!req.user[0].accountType === 'admin') {
    return res.send(403, { message: 'You must have admin priviledges to complete this task.' });
  }
  next();
};
