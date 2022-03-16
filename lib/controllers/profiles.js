const { Router } = require('express');
const Profile = require('../models/Profile');

module.exports = Router().post('/', async (req, res) => {
  const profile = await Profile.insert(req.body);
  console.log('profile', profile);
  res.send(profile);
});
