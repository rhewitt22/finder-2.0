/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  profile: function (req, res) {
    if (!req.user[0]) return res.send(401, 'You must be logged into see your history.');
    console.log(req.user[0]);

    User.findOne({
      email: req.user[0].email
    }).populate('history').exec(function (err, history) {
      console.log(history);
      if (err) return res.negotiate(err);
      res.json(history);
    });
  },

  update: function (req, res) {
    var updatedBy = req.user[0].id;

    User.findOne({
      email: req.user[0].email
    }).exec(function (err, user) {
      if (err) return res.negotiate(err);
      var currentUser = _.pick(user, 'email', 'accountType', 'phone', 'job');

      if (_.isEqual(currentUser, req.body)) return res.send(200, {
        message: 'The user hasn\'t changed.',
        user: user
      });
    
      if (!user) return res.send(400, {
        message: 'User not found.'
      });

      if (req.body.email) user.email = req.body.email;
      if (req.body.phone) user.phone = req.body.phone;
      if (req.body.job) user.job = req.body.job;
      if (req.body.email) user.email = req.body.email;
      if (user.accountType === 'admin') {
        user.accountType = req.body.accountType;
      } else {
        return res.send(401, { message: 'You must be an admin user to change the account type.'});
      }

      User.update({
        id: user.id
      }, user).exec(function (err, updated) {
        if (err) return res.negotiate(err);
        console.log(updatedBy);
        History.create({
          action: 'update',
          content: 'user profile',
          data: user,
          modifiedBy: updatedBy
        }).exec(function (e, history) {
          if (err) return res.negotiate(err);
          res.send(200, {
            message: 'User profile updated.',
            user: updated
          });
        });
      });
    });
  },

  destroy: function (req, res) {
    if (req.user[0].accountType !== 'admin') {
      return res.send(401, {
        message: 'You need admin priviledges to delete a userar.'
      });
    }
    if (!req.body.id) return res.send(400, {
      message: 'No user id provided'
    });

    User.findOne({
      id: req.body.id
    }, function (err, foundUser) {
      if (err) return res.negotiate(err);
      if (!foundUser) return res.send(400, {
        message: 'User not found.'
      });
      User.destroy({
        id: foundUser.id
      }, function (err) {
        if (err) return res.negotiate(err);
        History.create({
          action: 'delete',
          content: 'user account',
          data: foundUser,
          modifiedBy: req.user[0].id
        }).exec(function (err, history) {
          if (err) return res.negotiate(err);
          res.send(200, {
            message: 'User deleted',
            user: foundUser
          });
        });
      });
    });
  }
};
