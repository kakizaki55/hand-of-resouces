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

  static async insert({ name, vibe }) {
    const { rows } = await pool.query(
      `
    INSERT INTO 
        colors(name, vibe)
    VALUES 
        ($1, $2)
    RETURNING 
        *
      `,
      [name, vibe]
    );
    return new Color(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT 
            *
        FROM
            colors
        `
    );
    return rows.map((row) => new Color(row));
  }
  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT 
            *
        FROM
            colors
        WHERE
            id=$1
        `,
      [id]
    );
    return new Color(rows[0]);
  }
  static async updateById(id, newAttributes) {
    const oldColor = Color.findById(id);
    const newColor = { ...oldColor, ...newAttributes };
    const { name, vibe } = newColor;
    const { rows } = await pool.query(
      `
        UPDATE
            colors
        SET
            name=$1,
            vibe=$2
        WHERE
            id=$3
        RETURNING
            *
        `,
      [name, vibe, id]
    );

    return new Color(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM
      colors
    WHERE
      id=$1
    RETURNING
      *
    `,
      [id]
    );
    return new Color(rows[0]);
  }
};
