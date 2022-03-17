const pool = require('../utils/pool');

module.exports = class Tea {
  id;
  name;
  origin;

  constructor({ id, name, origin }) {
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

    return new Tea(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query(
      `
    SELECT 
        *
    FROM
        teas    
    `
    );
    return rows.map((row) => new Tea(row));
  }
  static async findById(id) {
    const { rows } = await pool.query(
      `
          SELECT 
            *
          FROM 
            teas
          WHERE
            id=$1 
    
          `,
      [id]
    );
    return new Tea(rows[0]);
  }
  static async updateById(id, newAttributes) {
    const oldTea = await Tea.findById(id);
    const newTea = { ...oldTea, ...newAttributes };
    const { name, origin } = newTea;
    const { rows } = await pool.query(
      `
        UPDATE
            teas
        SET
            name=$1,
            origin=$2
        WHERE
            id=$3
        RETURNING
            *
        `,
      [name, origin, id]
    );
    return new Tea(rows[0]);
  }
};
