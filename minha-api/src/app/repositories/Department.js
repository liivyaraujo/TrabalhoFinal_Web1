const db = require("../models/ConnectDatabase");

class DepartmentRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT * FROM department ORDER BY name
      ;
    `);
    return rows;
  }

  // adicicionei esse findyBy aqui tbm para que o controller funcione direito :

  async findById(id) {
    const rows = await db.query(
      `SELECT id, name, description FROM department WHERE id = ?`,
      [id]
    );
    return rows[0]; // Retorna o primeiro (e único) item do array
  }
  //----------------------------------------------------------

  async create({ name, description }) {
    const result = await db.query(
      `INSERT INTO department(name, description) VALUES(?, ?)`,
      [name, description]
    );

    const insertedDepartmentId = result.insertId;
    const insertedDepartment = await db.query(
      `SELECT id, name, description FROM department WHERE id = ?`,
      [insertedDepartmentId]
    );

    return insertedDepartment[0];
  }

  async update(id, { name, description }) {
    await db.query(
      `UPDATE department SET name = ?, description = ? WHERE id = ?`,
      [name, description, id]
    );

    const updatedDepartment = await db.query(
      `SELECT id, name, description FROM department WHERE id = ?`,
      [id]
    );

    return updatedDepartment[0];
  }

  // coloquei o DELETE  de departamento aqui

  async delete(id) {
    const result = await db.query(`
      DELETE FROM department 
      WHERE id = ? AND NOT EXISTS (
          SELECT 1 
          FROM employee 
          WHERE department_id = ?
      )
    `, [id, id]);
    return result.affectedRows > 0;
  }
}

module.exports = new DepartmentRepository();
