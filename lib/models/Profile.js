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
  static async findById(id) {
    const { rows } = await pool.query(
      `
    SELECT
      *
    FROM
      profiles
    WHERE
      id=$1
      `,
      [id]
    );
    return new Profile(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM 
        profiles
      WHERE
        id=$1
      RETURNING 
        *
      
      `,
      [id]
    );
    return new Profile(rows[0]);
  }
  static async updateById(id, newAttributes) {
    console.log('id, newAttributes', id, newAttributes);

    const oldProfile = await Profile.findById(id);

    console.log('oldProfile', oldProfile);

    const newProfile = { ...oldProfile, ...newAttributes };
    const { name, bio } = newProfile;

    const { rows } = await pool.query(
      `
    UPDATE
      profiles
    SET
      name=$1,
      bio=$2
    WHERE
      id=$3
    RETURNING 
      *
    `,
      [name, bio, id]
    );
    return new Profile(rows[0]);
  }
};
