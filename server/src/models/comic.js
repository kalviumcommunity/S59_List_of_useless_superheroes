const express = require('express')
const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const marvelSchema = new Schema({

    "ID" : {
        type : Number
    },
    
    'Image' : {
      type: String,
  },


    'Hero Name': {
        type: String,
        required: true,
      },
      'Real Name': {
        type: String,
      },
      'Superpower': {
        type: String,
      },
      'First Appearance': {
        type: String,
      },
      'Costume Quirk': {
        type: String,
      },
      'Catchphrase': {
        type: String,
      },
      'Backstory': {
        type: String,
      },
      'Most Useless Moment': {
        type: String,
      },
      'created_by': {
        type: String,
        default: 'Admin'
      }
})

const comic = mongoose.model('comics', marvelSchema)

module.exports = comic