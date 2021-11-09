const { Router } = require('express');
const Profile = require('../models/Profile.js');
const WipService = require('../services/WipService.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const profile = await WipService.makeProfile(req.query.email, req.query.zipcode);
      // console.log(profile);

      res.send(profile);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const users = await Profile.getAll();

      res.send(users);
    } catch (err) {
      next(err);
    }
  });
