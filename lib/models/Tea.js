const pool = require('../utils/pool');

module.export = class Tea {
  id;
  name;
  origin;

  constructor({ id, name, origin }) {
    this.id = id;
    this.name = name;
    this.origin = origin;
  }
};
