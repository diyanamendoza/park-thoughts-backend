// const pool = require('../utils/pool');

// module.exports = class QuotePark {
//   id;
//   quote;
//   park;
//   ownerId;

//   constructor(row) {
//     this.id = row.id;
//     this.quote = row.quote;
//     this.park = row.park;
//     this.ownerId = row.owner_id;
//   }

//   static async insertQP(quote, park, ownerId) {
//     const { rows } = await pool.query(
//       'INSERT INTO quotepark (quote, park, ownerId) VALUES ($1, $2) RETURNING *',
//       [quote, park]
//     );

//     return new QuotePark(rows[0]);
//   }

//   static async getAll() {
//     const { rows } = await pool.query(
//       'SELECT * from quotepark'
//     );

//     return rows;
//   }

//   static async getById(id) {
//     const { rows } = await pool.query(
//       'SELECT * from quotepark WHERE id = $1', [id]
//     );

//     return rows[0];
//   }

//   static async update(id, email) {
//     const { rows } = await pool.query(
//       'UPDATE quotepark SET username = $1 WHERE id = $2 RETURNING *', [email, id]
//     );

//     return rows[0];
//   }

//   static async delete(id) {
//     const { rows } = await pool.query(
//       'DELETE from users WHERE id = $1 RETURNING *', [id]
//     );

//     return rows[0];
//   }

// };
