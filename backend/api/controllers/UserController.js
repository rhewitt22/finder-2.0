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
    console.log(req.body);
    if (!req.body) res.send(400, { message: 'No data submitted' });
    if (req.body === req.user[0]) res.send(200, { message: 'User profile hasn\'t changed.'})

    User.findOne({ email: req.user[0].email }).exec(function(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.send(400, { message: 'User not found.'});

      if (req.body.email) user.email = req.body.email;
      if (req.body.phone) user.phone = req.body.phone;
      if (req.body.job) user.job = req.body.job;
      if (req.body.email) user.email = req.body.email;
      if (req.user[0].accountType != 'admin') {
        user.accountType = req.user[0].accountType;
      } else {
        user.accountType = req.body.accountType;
      }

      console.log(user);

      User.update({ id: user.id }, user).exec(function(err, updated) {
        if (err) return res.negotiate(err);
        History.create({
          action: 'update',
          content: 'user profile',
          data: req.body,
          modifiedBy: req.user[0].id
        }).exec(function(e, history) {
          if(err) return res.negotiate(err);
          res.send(200, { message: 'User profile updated.', user: updated });
        });
      });
    });
  },

  destroy: function(req, res) {
    if (req.user[0].accountType !== 'admin') {
      return res.send(401, { 
        message: 'You need admin priviledges to delete users.'
      });
    }
    if (!req.body.id) return res.send(400, { message: 'No user id provided'});

    User.findOne({ id: req.body.id }, function(err, foundUser) {
      if (err) return res.negotiate(err);
      if (!foundUser) return res.send(400, { message: 'User not found.'});
      User.destroy({ id: foundUser.id }, function(err) {
        if (err) return res.negotiate(err);
        History.create({
          action: 'delete',
          content: 'user account',
          data: foundUser,
          modifiedBy: req.user[0].id
        }).exec(function(err, history) {
          if(err) return res.negotiate(err);
          res.send(200, { message: 'User deleted', user: foundUser });
        });
      });
    });
  }
};

