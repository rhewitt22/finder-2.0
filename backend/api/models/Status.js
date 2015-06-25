/**
* Status.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    // This should be an enum once we have the categories ironed out
    status: {
      type: 'string',
      required: true
    },

    date: {
      type: 'date',
      required: true,
      defaultTo: new Date()
    }

  }
};

