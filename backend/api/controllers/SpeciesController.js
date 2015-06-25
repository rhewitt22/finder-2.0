/**
 * SpeciesController
 *
 * @description :: Server-side logic for managing species
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require('underscore');

module.exports = {
	find: function(req, res) {
    Species.find({}, function(err, species) {
      res.send(species);
    });
  },

  create: function(req, res) {
    if(!req.body.scientificName) return err;

    Species.findOne({ scientificName: req.body.scientificName }).exec(function(err, species) {
      if(err) return err;
      if(species) return res.send(409, { message: 'Species already exists.'});

      var range = req.body.range.split(', ');

      var params = {
        scientificName: req.body.scientificName,
        commonName: req.body.commonName,
        taxon: req.body.taxon,
        leadOffice: req.body.leadOffice,
        range: range
      };

      Species.create(params).exec(function(er, newSpecies) {
        if(err) return res.negotiate(err);

        var modified = req.user[0];

        History.create({
          action: 'create',
          data: params,
          modifiedBy: modified.id
        }).exec(function(e, history) {
          if(err) return res.negotiate(err);
          res.send(201, { message: 'Created a new record for ' + newSpecies.scientificName + '.'});
        });
      });
    });
  },

  update: function(req, res) {
    if(!req.body.scientificName) return res.send(400, { message: 'No scientific name in request.'});

    var body = req.body;
    console.log(body);
    // Species.findOne({ scientificName: req.body.scientificName }).exec(function(err, species) {
    //   if(err) return res.negotiate(err);
    //   if(!species) return res.send(404, { message: 'Species not found.'});

    //   Species.update()

    // });
  }
};

