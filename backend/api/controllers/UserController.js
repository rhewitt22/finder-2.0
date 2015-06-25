/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  profile: function(req, res) {
    if(!req.user[0]) res.send(401, 'You must be logged into see your history.');

    User.findOne({ email: req.user[0].email }).populate('history').exec(function(err, history) {
      if (err) return res.negotiate(err);
      res.json(history);
    });
  },

  update: function(req, res) {
    if (!req.body) res.send(400, { message: 'No data submitted' });
    User.findOne({ email: req.user[0].email }).exec(function(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.send(400, { message: 'User not found.'});
      console.log(user);

    });
  }
};

