const pool = require('../utils/pool');

module.exports = class Tea {
  id;
  name;
  origin;

  constructor([{ id, name, origin }]) {
    this.id = id;
    this.name = name;
    this.origin = origin;
  }
  static async insert({ name, origin }) {
    const { rows } = await pool.query(
      `
INSERT INTO
    teas(name, origin)
VALUES
    ($1, $2) RETURNING *`,
      [name, origin]
    );

    return new Tea(rows);
  }
};
