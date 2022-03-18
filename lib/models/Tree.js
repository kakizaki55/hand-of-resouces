const pool = require('../utils/pool');

module.exports = class Tree {
  id;
  name;
  region;
  constructor({ id, name, region }) {
    this.id = id;
    this.name = name;
    this.region = region;
  }
  static async insert({ name, region }) {
    const { rows } = await pool.query(
      `
    INSERT INTO 
        trees(name, region)
    VALUES 
        ($1, $2)
    RETURNING 
        *
      `,
      [name, region]
    );
    return new Tree(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT 
            *
        FROM
            trees
        `
    );
    return rows.map((row) => new Tree(row));
  }
  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT 
            *
        FROM
            trees
        WHERE
            id=$1
        `,
      [id]
    );
    return new Tree(rows[0]);
  }
  static async updateById(id, newAttributes) {
    const oldTree = Tree.findById(id);
    const newTree = { ...oldTree, ...newAttributes };
    const { name, region } = newTree;
    const { rows } = await pool.query(
      `
        UPDATE
            trees
        SET
            name=$1,
            region=$2
        WHERE
            id=$3
        RETURNING
            *
        `,
      [name, region, id]
    );

    return new Tree(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM
      trees
    WHERE
      id=$1
    RETURNING
      *
    `,
      [id]
    );
    return new Tree(rows[0]);
  }
};
