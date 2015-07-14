/**
 * QueryController
 *
 * @description :: Server-side logic for managing queries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  endemic: function(req, res) {
    var state,
      query;

    if (req.param('state')) {
      state = req.param('state');
      query = {
        $and: [
          { range: { $size: 1 } },
          { range: state }
        ]
      };
    } else {
      query = {
        range: { $size: 1 }
      };
    }

    Species.native(function(err, collection) {
      if (err) return res.negotiate(err);
      collection.find(query).toArray(function(err, results) {
        if (err) return res.negotiate(err);
        res.ok(results);
      });
    });
  },

  nonEndemic: function(req, res) {
    var state,
      query;

    if (req.param('state')) {
      state = req.param('state');
      query = {
        $and: [
          // Check if more than one item in array with index (as of MongoDB 2.2)
          { 'range.1': { $exists: true } },
          { range: state }
        ]
      };
    } else {
      query = {
        'range.1': { $exists: true }
      };
    }

    Species.native(function(err, collection) {
      if (err) return res.negotiate(err);
      collection.find(query).toArray(function(err, results) {
        if (err) return res.negotiate(err);
        res.ok(results);
      });
    });
  },

  otherRegion: function(req, res) {
    var query = {
      leadOffice: [
        'Region 1',
        'Region 2',
        'Region 3',
        'Region 5',
        'Region 6',
        'Region 7',
        'Region 8',
        'Region 9'
      ]
    };

    Species.find(query).exec(function(err, species) {
      if (err) return res.negotiate(err);
      res.ok(species);
    });
  }
};

