const express = require('express')
const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const cardSchema = new Schema({
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
      }
})

const comic = mongoose.model('comic', cardSchema)

module.exports = comic