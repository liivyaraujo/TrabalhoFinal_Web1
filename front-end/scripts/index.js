document.addEventListener("DOMContentLoaded", function () {
  let currentEmployeeId = null;

  function employeeTable() {
    axios
      .get("http://localhost:3001/employees")
      .then((response) => {
        const employees = response.data;
        const tbody = document.getElementById("employeeTable");
        tbody.innerHTML = "";

        employees.forEach((employee) => {
          const tr = document.createElement("tr");

          const tdNome = document.createElement("td");
          const link = document.createElement("a");
          link.textContent = employee.name;
          link.href = `./pages/employee.html?id=${employee.id}`;
          tdNome.appendChild(link);

          const tdDepartamento = document.createElement("td");
          tdDepartamento.textContent = employee.department_name;

          const tdEditar = document.createElement("td");
          const editLink = document.createElement("a");
          editLink.textContent = "Editar";
          editLink.href = `./pages/editEmployee.html?id=${employee.id}`;
          editLink.classList.add("edit-link");
          tdEditar.appendChild(editLink);

          const tdRemover = document.createElement("td");
          const removeButton = document.createElement("button");
          removeButton.textContent = "Remover";
          removeButton.classList.add("remove-link");
          removeButton.addEventListener("click", () => showModal(employee.id));
          tdRemover.appendChild(removeButton);

          tr.appendChild(tdNome);
          tr.appendChild(tdDepartamento);
          tr.appendChild(tdEditar);
          tr.appendChild(tdRemover);
          tbody.appendChild(tr);
        });
      })
      .catch((error) => {
        console.error("Erro ao carregar funcionários:", error);
      });
  }

  function showModal(employeeId) {
    currentEmployeeId = employeeId;
    const modal = document.getElementById("confirmationModal");
    modal.style.display = "block";
  }

  function hideModal() {
    const modal = document.getElementById("confirmationModal");
    modal.style.display = "none";
    currentEmployeeId = null;
  }

  function removeEmployee() {
    axios
      .delete(`http://localhost:3001/employees/${currentEmployeeId}`)
      .then(() => {
        employeeTable(); // Recarrega a tabela de funcionários
        hideModal();
      })
      .catch((error) => {
        console.error("Erro ao remover funcionário:", error);
      });
  }

  // Configurar o modal
  document
    .getElementById("confirmDelete")
    .addEventListener("click", removeEmployee);
  document.getElementById("cancelDelete").addEventListener("click", hideModal);
  document.getElementById("closeModal").addEventListener("click", hideModal);

  window.onclick = function (event) {
    const modal = document.getElementById("confirmationModal");
    if (event.target === modal) {
      hideModal();
    }
  };

  employeeTable();
});
