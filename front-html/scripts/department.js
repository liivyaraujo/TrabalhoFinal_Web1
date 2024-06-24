document.addEventListener('DOMContentLoaded', function () {
    function departmentTable() {
      axios
        .get("http://localhost:3001/departments")
        .then((response) => {
  
          const departments = response.data;
          const tbody = document.getElementById('departmentTable');
          tbody.innerHTML = '';
  
          departments.forEach((department) => {
            const tr = document.createElement('tr');
  
            const tdDepartment = document.createElement('td');
            tdDepartment.textContent = department.name;
  
            const tdRemover = document.createElement('td');
            const removeLink = document.createElement('a');
            removeLink.textContent = 'Remover';
            removeLink.href = `remover.html?id=${department.id}`;
            removeLink.classList.add('remove-link');
            tdRemover.appendChild(removeLink);
            
            tr.appendChild(tdDepartment);
            tr.appendChild(tdRemover);
            tbody.appendChild(tr);
          });
        })
        .catch((error) => {
          console.error("Erro ao carregar departamentos:", error);
        });
    }

    departmentTable();
  });