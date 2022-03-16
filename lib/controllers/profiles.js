const { Router } = require('express');

const Profile = require('../models/Profile');

module.exports = Router()
  .post('/', async (req, res) => {
    const profile = await Profile.insert(req.body);
    res.send(profile);
  })
  .get('/', async (req, res) => {
    const profiles = await Profile.getAll();
    res.send(profiles);
  })
  .get('/:id', async (req, res) => {
    const profile = await Profile.findById(req.params.id);
    res.send(profile);
  })
  .delete('/:id', async (req, res) => {
    const profile = await Profile.deleteById(req.params.id);
    res.send(profile);
  });
