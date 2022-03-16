const pool = require('../utils/pool');

module.exports = class Profile {
  id;
  name;
  bio;

  constructor({ id, name, bio }) {
    this.id = id;
    this.name = name;
    this.bio = bio;
  }

  static async insert({ name, bio }) {
    const { rows } = await pool.query(
      `
      INSERT INTO 
        profiles (name, bio)
    VALUES 
        ($1, $2)
    RETURNING
        *
      `,
      [name, bio]
    );

    return new Profile(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        profiles      
      `
    );
    return rows.map((row) => new Profile(row));
  }
};
