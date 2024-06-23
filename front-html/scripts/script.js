document.addEventListener('DOMContentLoaded', function () {
    function employeeTable() {
      axios
        .get("http://localhost:3001/employees")
        .then((response) => {

          const employees = response.data;
          const tbody = document.getElementById('employeeTable');
          tbody.innerHTML = '';
  
          employees.forEach((employee) => {
            const tr = document.createElement('tr');
  
            const tdNome = document.createElement('td');
            const link = document.createElement('a');
            link.textContent = employee.name;
            link.href = `detalhes.html?id=${employee.id}`;
            tdNome.appendChild(link);
  
            const tdDepartamento = document.createElement('td');
            tdDepartamento.textContent = employee.department_name;

            const tdEditar = document.createElement('td');
            const editLink = document.createElement('a');
            editLink.textContent = 'Editar';
            editLink.href = `editar.html?id=${employee.id}`;
            editLink.classList.add('edit-link');
            tdEditar.appendChild(editLink);

            const tdRemover = document.createElement('td');
            const removeLink = document.createElement('a');
            removeLink.textContent = 'Remover';
            removeLink.href = `remover.html?id=${employee.id}`;
            removeLink.classList.add('remove-link');
            tdRemover.appendChild(removeLink);
  
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
    employeeTable();
  });
