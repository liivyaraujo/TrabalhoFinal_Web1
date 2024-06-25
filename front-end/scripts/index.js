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
            tr.appendChild(tdNome);

            const tdDepartamento = document.createElement("td");
            tdDepartamento.textContent = employee.department_name;
            tr.appendChild(tdDepartamento);

            const tdBotoes = document.createElement("td");
              const divBotoes = document.createElement("div");
              divBotoes.setAttribute( "class", "botoesTd" );
                const editLink = document.createElement("a");
                editLink.href = `./pages/editEmployee.html?id=${employee.id}`;
                  const editBotao = document.createElement("button");
                  editBotao.textContent = "Editar";
                  editBotao.setAttribute( "class", "bt-verde" );
                  editLink.appendChild(editBotao);
                divBotoes.appendChild(editLink);
                const removeButton = document.createElement("button");
                removeButton.textContent = "Remover";
                removeButton.setAttribute( "class", "bt-vermelho" );
                removeButton.addEventListener("click", () => showModal(employee.id));
                divBotoes.appendChild(removeButton);
              tdBotoes.appendChild(divBotoes);
            tr.appendChild(tdBotoes);
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
