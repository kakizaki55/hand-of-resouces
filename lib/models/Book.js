const pool = require('../utils/pool');

module.exports = class Book {
  id;
  author;
  title;
  constructor({ id, author, title }) {
    this.id = id;
    this.author = author;
    this.title = title;
  }
  static async insert({ author, title }) {
    const { rows } = await pool.query(
      `
      INSERT INTO 
        books (author, title)
    VALUES 
        ($1, $2)
    RETURNING
        *
      `,
      [author, title]
    );

    return new Book(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        books    
      `
    );
    return rows.map((row) => new Book(row));
  }
};
