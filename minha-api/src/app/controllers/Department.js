const DepartmentRepository = require("../repositories/Department");

class DepartmentController {
  async index(request, response) {
    const department = await DepartmentRepository.findAll();

    response.json(department);
  }

  async store(request, response) {
    const { name, description } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Nome é obrigatório" });
    }

    const department = await DepartmentRepository.create({ name, description });

    response.status(201).json(department);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, description } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    const updateDepartment = await DepartmentRepository.update(id, {
      name,
      description,
    });

    response.status(200).json(updateDepartment);
  }
  //coloquei o controller do DELETE  de departamento aqui :
  async delete(request, response) {
    const { id } = request.params;

    const departmentExists = await DepartmentRepository.findById(id);
    if (!departmentExists) {
      return response
        .status(404)
        .json({ error: "Departamento não encontrado" });
    }

    const success = await DepartmentRepository.delete(id);
    if (success) {
      response
        .status(200)
        .json({ message: "Departamento removido com sucesso" });
    } else {
      response.status(500).json({ error: "Erro ao remover departamento" });
    }
  }
}

module.exports = new DepartmentController();
