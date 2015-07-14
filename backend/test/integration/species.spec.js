/*jshint expr: true*/
var chai = require('chai'),
  should = chai.should();
  request = require('supertest'),
  agent = request.agent("http://localhost:1337/");

describe('Species API integration tests', function() {
  var newSpecies,
    deleteSpecies,
    updateSpecies;

  before(function(done) {
    newSpecies = {
      scientificName: 'Latin name',
      taxon: 'Amphibian',
      leadOffice: 'Vero Beach'
    };

    anotherNewSpecies = {
      scientificName: 'Another Latin name',
      taxon: 'Amphibian',
      leadOffice: 'Vero Beach'
    };

    deleteSpecies = {
      "scientificName": "Chromolaena frustrata"
    };

    updateSpecies = {
      "scientificName": "Etheostoma tippecanoe",
      "commonName": "Tippecanoe darter",
      "taxon": "Dinosaur",
      "leadOffice": "Region 5",
      "range": ["Pennsylvania", "Ohio", "Indiana", "West Virginia", "Tennessee", "Kentucky"],
      "status": [{ "name": "Petitioned", "date": "Mon Apr 19 2010 20:00:00 GMT-0400 (EDT)" }]
    };

    done();
  });

  describe('for unauthenticated users', function() {

    it('should allow user to get list of species', function(done) {
      agent.get('species')
        .end(function(err, res) {
          res.body.should.be.instanceof(Array);
          res.statusCode.should.equal(200);
          done();
        });
    });

    it('should allow user to get species by id', function(done) {
      // Species comes from species test fixture
      agent.get('species/1')
        .end(function(err, res) {
          res.body.id.should.equal(1);
          res.body.scientificName.should.equal('Ammodramus maritimus macgillivraii');
          res.statusCode.should.equal(200);
          done();
        });
    });

    it('should not allow user create a species', function(done){
      agent.post('species')
        .send(newSpecies)
        .end(function(err, res) {
          res.body.message.should.equal('No access token.');
          res.statusCode.should.equal(401);
          done();
        });
    });

    it('should not allow user destroy a species', function(done){
      agent.delete('species')
        .send(deleteSpecies)
        .end(function(err, res) {
          res.body.message.should.equal('No access token.');
          res.statusCode.should.equal(401);
          done();
        });
    });

    it('should not allow user update a species', function(done){
      agent.post('species/')
        .send(updateSpecies)
        .end(function(err, res) {
          res.body.message.should.equal('No access token.');
          res.statusCode.should.equal(401);
          done();
        });
    });
  });

  describe('for authenticated users', function() {
    var jwt;

    describe('with viewer privileges', function() {

      before(function(done) {
        // Create an authenticated user w/viewer privileges
        User.create({
          email: 'viewer@gmail.com',
          job: 'tester',
          accountType: 'viewer'
        }).exec(function (err, user) {
          jwt = sailsTokenAuth.createToken(user);
          done();
        });
      });

      it('should allow user to get list of species', function(done) {
        agent.get('species')
          .set('Authorization', 'Bearer ' + jwt)
          .end(function(err, res) {
            res.body.should.be.instanceof(Array);
            res.body.should.not.be.empty;
            done();
          });
      });

      it('should allow user to get species by id', function(done) {
        agent.get('species/1')
          .set('Authorization', 'Bearer ' + jwt)
          .end(function(err, res) {
            res.body.id.should.equal(1);
            res.body.scientificName.should.equal('Ammodramus maritimus macgillivraii');
            done();
          });
      });

      it('should not allow user to create a species', function(done){

        agent.post('species')
          .set('Authorization', 'Bearer ' + jwt)
          .send(newSpecies)
          .end(function(err, res) {
            res.body.message.should.equal('You do not have editing privileges.');
            res.statusCode.should.equal(403);
            done();
          });
      });

      it('should not allow user to destroy a species', function(done){
        agent.delete('species')
          .set('Authorization', 'Bearer ' + jwt)
          .send(deleteSpecies)
          .end(function(err, res) {
            res.body.message.should.equal('You do not have editing privileges.');
            res.statusCode.should.equal(403);
            done();
          });
      });

      it('should not allow user to update a species', function(done){
        agent.post('species')
          .set('Authorization', 'Bearer ' + jwt)
          .send(updateSpecies)
          .end(function(err, res) {
            res.body.message.should.equal('You do not have editing privileges.');
            res.statusCode.should.equal(403);
            done();
          });
      });
    });

    describe('with editor privileges', function() {
      before(function(done) {
        // Create an authenticated user w/editor privileges
        User.create({
          email: 'editor@gmail.com',
          job: 'tester',
          accountType: 'editor'
        }).exec(function (err, user) {
          jwt = sailsTokenAuth.createToken(user);
          done();
        });
      });

      it('should allow user to get list of species', function(done) {
        agent.get('species')
          .set('Authorization', 'Bearer ' + jwt)
          .end(function(err, res) {
            res.body.should.be.instanceof(Array);
            res.statusCode.should.equal(200);
            done();
          });
      });

      it('should allow user to get species by id', function(done) {
        agent.get('species/1')
          .set('Authorization', 'Bearer ' + jwt)
          .end(function(err, res) {
            res.body.id.should.equal(1);
            res.body.scientificName.should.equal('Ammodramus maritimus macgillivraii');
            done();
          });
      });

      it('should allow user to create a species', function(done){
        agent.post('species')
          .set('Authorization', 'Bearer ' + jwt)
          .send(newSpecies)
          .end(function(err, res) {
            res.statusCode.should.equal(201);
            done();
          });
      });

      it('should not allow user to destroy a species', function(done){
        agent.delete('species')
          .set('Authorization', 'Bearer ' + jwt)
          .send(deleteSpecies)
          .end(function(err, res) {
            res.statusCode.should.equal(401);
            done();
          });
      });

      xit('should allow user to update a species', function(done){
        agent.post('species/update')
          .set('Authorization', 'Bearer ' + jwt)
          .send(updateSpecies)
          .end(function(err, res) {
            res.statusCode.should.equal(200);
            done();
          });
      });
    });

    describe('with admin privileges', function() {
      before(function(done) {
        // Create an authenticated user w/admin privileges
        User.create({
          email: 'admin@gmail.com',
          job: 'tester',
          accountType: 'admin'
        }).exec(function (err, user) {
          jwt = sailsTokenAuth.createToken(user);
          done();
        });
      });

      it('should allow user to get list of species', function(done) {
        agent.get('species')
          .set('Authorization', 'Bearer ' + jwt)
          .end(function(err, res) {
            res.statusCode.should.equal(200);
            res.body.should.be.instanceof(Array);
            done();
          });
      });

      it('should allow user to get species by id', function(done) {
        agent.get('species/1')
          .set('Authorization', 'Bearer ' + jwt)
          .end(function(err, res) {
            res.statusCode.should.equal(200);
            res.body.scientificName.should.equal('Ammodramus maritimus macgillivraii');
            done();
          });
      });

      it('should allow user to create a species', function(done){
        agent.post('species')
          .set('Authorization', 'Bearer ' + jwt)
          .send(anotherNewSpecies)
          .end(function(err, res) {
            res.statusCode.should.equal(201);
            done();
          });
      });

      it('should allow user to destroy a species', function(done){
        agent.delete('species')
          .set('Authorization', 'Bearer ' + jwt)
          .send(deleteSpecies)
          .end(function(err, res) {
            res.statusCode.should.equal(200);
            done();
          });
      });

      xit('should allow user to update a species', function(done){
        agent.post('species/update')
          .set('Authorization', 'Bearer ' + jwt)
          .send(updateSpecies)
          .end(function(err, res) {
            res.statusCode.should.equal(200);
            done();
          });
      });
    });
  });
});
