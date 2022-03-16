const { Router } = require('express');

module.exports = Router().post('/', async (req, res) => {
  res.send({ name: 'tom', bio: 'does stuff' });
});
