const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', async (req, res) => {
    const response = await Color.insert(req.body);
    res.send(response);
  })
  .get('/', async (req, res) => {
    const response = await Color.getAll();
    res.send(response);
  })
  .get('/:id', async (req, res, next) => {
    try {
      const response = await Color.findById(req.params.id);
      res.send(response);
    } catch (e) {
      e.status = 404;
      next(e);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const response = await Color.updateById(req.param.id, req.body);
      res.send(response);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })
  .delete('/id', async (req, res, next) => {
    try {
      const response = await Color.deleteById(req.params.id);
      res.send(response);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
