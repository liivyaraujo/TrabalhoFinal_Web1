document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const employeeId = urlParams.get("id");

  if (!employeeId) {
    console.error("ID do funcionário não fornecido na URL");
    return;
  }

  axios
    .get(`http://localhost:3001/employees/${employeeId}`)
    .then((response) => {
      const employee = response.data;

      document.getElementById("name").value = employee.name;
      document.getElementById("position").value = employee.position;
      document.getElementById("email").value = employee.email;
      document.getElementById("salary").value = employee.salary;
      document.getElementById("hireDate").value = new Date(employee.hireDate)
        .toISOString()
        .split("T")[0];
      document.getElementById("transportAllowance").checked =
        employee.transportAllowance;

      axios
        .get("http://localhost:3001/departments")
        .then((departmentsResponse) => {
          const departments = departmentsResponse.data;
          const departmentSelect = document.getElementById("department_name");

          departments.forEach((department) => {
            const option = document.createElement("option");
            option.value = department.id;
            option.textContent = department.name;
            if (department.id === employee.department_id) {
              option.selected = true;
            }
            departmentSelect.appendChild(option);
          });

          console.log("Departamentos carregados:", departments);
        })
        .catch((error) => {
          console.error("Erro ao carregar departamentos:", error);
        });
    })
    .catch((error) => {
      console.error("Erro ao carregar funcionário:", error);
    });

  document
    .getElementById("editForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const updatedEmployee = {
        name: document.getElementById("name").value,
        position: document.getElementById("position").value,
        email: document.getElementById("email").value,
        salary: document.getElementById("salary").value,
        hireDate: document.getElementById("hireDate").value,
        transportAllowance:
          document.getElementById("transportAllowance").checked,
        department_id: document.getElementById("department_name").value,
      };

      console.log("Dados do funcionário atualizados:", updatedEmployee);

      axios
        .put(`http://localhost:3001/employees/${employeeId}`, updatedEmployee)
        .then((response) => {
          console.log("Funcionário atualizado com sucesso", response.data);
          const messageElement = document.getElementById("message");
          messageElement.style.display = 'block';
          messageElement.textContent = 'Funcionário atualizado com sucesso!';
        })
        .catch((error) => {
          console.error("Erro ao atualizar funcionário:", error);
        });
    });
});
