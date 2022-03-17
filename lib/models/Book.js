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
  static async findById(id) {
    const { rows } = await pool.query(
      `
    SELECT
      *
    FROM
      books
    WHERE
      id=$1
      `,
      [id]
    );
    return new Book(rows[0]);
  }
  static async updateById(id, newAttributes) {
    const oldBook = await Book.findById(id);
    const newBook = { ...oldBook, ...newAttributes };
    const { author, title } = newBook;

    const { rows } = await pool.query(
      `
    UPDATE
      books
    SET
      author=$1,
      title=$2
    WHERE
      id=$3
    RETURNING 
      *
    `,
      [author, title, id]
    );
    return new Book(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM 
        books
      WHERE
        id=$1
      RETURNING 
        *
      
      `,
      [id]
    );
    return new Book(rows[0]);
  }
};
