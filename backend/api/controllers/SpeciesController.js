/**
 * SpeciesController
 *
 * @description :: Server-side logic for managing species
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require('underscore'),
  moment = require('moment');

module.exports = {
	// find: function(req, res) {
 //    console.log(req.body);
 //    var params = (req.body.id) ? { id: req.body.id } : {};

 //    Species.find(params, function(err, species) {
 //      if (err) return res.negotiate(err);
 //      res.send(species);
 //    });
 //  },

  create: function(req, res) {
    if(!req.body.scientificName) return res.badRequest('No scientific name sent.');

    Species.findOne({ scientificName: req.body.scientificName }).exec(function(err, species) {
      if(err) return res.negotiate(err);
      if(species) return res.send(409, { message: 'Species already exists.'});

      var params = _.extend({}, req.body);

      if (params.status) {
        _.each(params.status, function(el, i) {
          el.date = moment.utc(el.date).format();
        });
      }

      Species.create(params).exec(function(err, newSpecies) {
        if(err) return res.negotiate(err);

        var modified = req.user[0];

        History.create({
          action: 'create',
          content: 'species record',
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
    if(!req.body.scientificName) return res.badRequest('No scientific name in request.');

    var body = req.body;

    Species.findOne({ id: body.id }).exec(function(err, species) {
      if(err) return res.negotiate(err);
      if(!species) return res.send(404, { message: 'Species not found.'});

      _.extend(species, body);
      _.each(species.status, function(el, i) {
        el.date = moment.utc(el.date).format();
      });

      Species.update({
        id: species.id
      }, species, function(err, updatedSpecies) {
        if (err) return res.negotiate(err);
        if (!updatedSpecies) return res.send(500, 'No updated species.');

        History.create({
          action: 'update',
          content: 'species record',
          data: species,
          modifiedBy: req.user[0].id
        }).exec(function(e, history) {
          if(err) return res.negotiate(err);
          res.send(200, { message: 'Species record updated.', species: updatedSpecies });
        });
      });
    });
  },

  destroy: function(req, res) {
    if (req.user[0].accountType !== 'admin') {
      return res.send(401, {
        message: 'You need admin priviledges to delete species.'
      });
    }

    Species.findOne({
      scientificName: req.body.scientificName
    }, function(err, foundSpecies) {

      if (err) return res.negotiate(err);
      if (!foundSpecies) return res.send(400, { message: 'Species not found.'});
      Species.destroy({ id: foundSpecies.id }, function(err) {
        if (err) return res.negotiate(err);
        History.create({
          action: 'delete',
          content: 'species record',
          data: foundSpecies,
          modifiedBy: req.user[0].id
        }).exec(function(err, history) {
          if(err) return res.negotiate(err);
          res.send(200, { message: 'Species deleted', species: foundSpecies });
        });
      });
    });
  }
};

