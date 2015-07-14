/*jshint expr: true*/
var expect = require('chai').expect;

describe('Species model', function() {

  it ('should not be empty', function(done) {
    Species.find().exec(function(err, species) {
      expect(species.length).to.be.gt(0);
      done();
    });
  });

  describe('creation', function() {

    it('saves a new record', function(done) {
      Species.create({
        "scientificName": "Ambystoma barbouri",
        "taxon": "Amphibian",
        "leadOffice": "Frankfort",
      }, function(err, created) {
        expect(err).to.not.exist;
        expect(created).to.exist;
        done();
      });
    });

    it('throws validation error when the scientific name already exists', function(done) {
      Species.create({
        "scientificName": "Ambystoma barbouri",
        "taxon": "Amphibian",
        "leadOffice": "Frankfort",
      }, function(err, created) {
        expect(err.Errors.scientificName[0].rule).to.equal('unique');
        expect(created).to.not.exist;
        done();
      });
    });

    it('throws validation error when scientific name is empty', function(done) {
      Species.create({
        "commonName": "Streamside salamander",
        "taxon": "Amphibian",
        "leadOffice": "Frankfort",
      }, function(err, created) {
        expect(err.Errors.scientificName[0].rule).to.equal('string');
        expect(err.Errors.scientificName[1].rule).to.equal('required');
        expect(created).to.not.exist;
        done();
      });
    });

    it('throws validation error when taxon is empty', function(done) {
      Species.create({
        "scientificName": "Fake name",
        "commonName": "Streamside salamander",
        "leadOffice": "Frankfort",
      }, function(err, created) {
        expect(err.Errors.taxon[0].rule).to.equal('string');
        expect(err.Errors.taxon[1].rule).to.equal('required');
        expect(created).to.not.exist;
        done();
      });
    });

    it('throws validation error when no lead office is identified', function(done) {
      Species.create({
        "scientificName": "Another Fake name",
        "taxon": "Amphibian",
        "commonName": "Streamside salamander",
      }, function(err, created) {
        expect(err.Errors.leadOffice[0].rule).to.equal('string');
        expect(err.Errors.leadOffice[1].rule).to.equal('required');
        expect(created).to.not.exist;
        done();
      });
    });

  });
});
