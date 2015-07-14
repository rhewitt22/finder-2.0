/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  adapter: 'mongo',

  attributes: {

    googleId: {
      type: 'string'
    },

    email: {
      type: 'string',
      unique: true
    },

    job: {
      type: 'string'
    },

    phone: {
      type: 'string'
    },

    accountType: {
      type: 'string',
      required: true,
      enum: ['viewer', 'editor', 'admin']
    },

    history: {
      collection: 'history',
      via: 'modifiedBy'
    },

    validationMessages: {
      email: {
        unique: 'The email address provided already exists'
      },
      accountType: {
        required: 'An account type is required',
        enum: 'The provided account type is invalid'
      }
    }

  }
};

