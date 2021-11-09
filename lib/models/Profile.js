const pool = require('../utils/pool');

module.exports = class Profile {
  id;
  email;
  zipcode;
  quote;
  park;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.zipcode = row.zipcode;
    this.quote = row.quote;
    this.park = row.park;
  }

  static async insertUser(park, quote, email, zipcode) {
    const { rows } = await pool.query(
      'INSERT INTO users (park, quote, email, zipcode) VALUES ($1, $2, $3, $4) RETURNING *',
      [park, quote, email, zipcode]
    );

    return new Profile(rows[0]);
  }


  static async updateProfile(park, quote, zipcode, email) {
    const { rows } = await pool.query(
      'UPDATE users SET park = $1, quote = $2, zipcode = $3 WHERE email = $4 RETURNING *', [park, quote, zipcode, email]
    );

    return rows[0];
  }

  static async getByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * from users WHERE email = $1', [email]
    );

    return rows[0];
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * from users'
    );

    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * from users WHERE id = $1', [id]
    );

    return rows[0];
  }

  //   static async update(id, email) {
  //     const { rows } = await pool.query(
  //       'UPDATE users SET username = $1 WHERE id = $2 RETURNING *', [email, id]
  //     );

  //     return rows[0];
  //   }

  //   static async delete(id) {
  //     const { rows } = await pool.query(
  //       'DELETE from users WHERE id = $1 RETURNING *', [id]
  //     );

  //     return rows[0];
  //   }

};
