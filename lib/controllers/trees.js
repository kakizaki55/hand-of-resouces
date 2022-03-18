const { Router } = require('express');

const Tree = require('../models/Tree');

module.exports = Router()
  .post('/', async (req, res) => {
    const response = await Tree.insert(req.body);
    res.send(response);
  })
  .get('/', async (req, res) => {
    const response = await Tree.getAll();
    res.send(response);
  })
  .get('/:id', async (req, res, next) => {
    try {
      const response = await Tree.findById(req.params.id);
      res.send(response);
    } catch (e) {
      e.status = 404;
      next(e);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const response = await Tree.updateById(req.params.id, req.body);
      res.send(response);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const response = await Tree.deleteById(req.params.id);
      res.send(response);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
