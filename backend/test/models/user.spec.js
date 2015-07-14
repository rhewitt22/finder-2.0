/*jshint expr: true*/
var expect = require('chai').expect;

describe('User model', function() {

  describe('creation', function() {

    it ('should throw validation error if email already exists', function(done) {
      User.create({
        "email": "roy_hewitt@fws.gov",
        "accountType": "admin"
      }).exec(function(err, user) {
        expect(err.Errors.email)
          .to.include({ "rule": "unique", "message": "user.email.unique"});
        expect(user).to.not.exist;
        done();
      });
    });

    it ('should throw validation error if no account type', function(done) {
      User.create({
        "email": "roy_hewitt@fws.gov"
      }).exec(function(err, user) {
        expect(err.Errors.accountType)
          .to.include({ "rule": "required", "message": "user.accountType.required"});
        expect(user).to.not.exist;
        done();
      });
    });

    it ('should throw validation error if bad account type', function(done) {
      User.create({
        "email": "roy_hewitt@fws.gov",
        "accountType": "batman"
      }).exec(function(err, user) {
        expect(err.Errors.accountType)
          .to.include({ "rule": 'in', message: 'user.accountType.in'});
        expect(user).to.not.exist;
        done();
      });
    });
  });

  it ('should not be empty', function(done) {
    User.find().exec(function(err, users) {
      expect(users.length).to.not.eql(0);
      done();
    });
  });
});
