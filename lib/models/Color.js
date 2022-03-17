const pool = require('../utils/pool');

module.exports = class Color {
  id;
  name;
  vibe;

  constructor({ id, name, vibe }) {
    this.id = id;
    this.name = name;
    this.vibe = vibe;
  }
};
