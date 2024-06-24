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

                    const tdDescription = document.createElement('td');
                    tdDescription.textContent = department.description;

                    const tdRemover = document.createElement('td');
                    const removeLink = document.createElement('a');
                    removeLink.textContent = 'Remover';
                    removeLink.href = `remover.html?id=${department.id}`;
                    removeLink.classList.add('remove-link');
                    tdRemover.appendChild(removeLink);

                    tr.appendChild(tdDepartment);
                    tr.appendChild(tdDescription);
                    tr.appendChild(tdRemover);
                    tbody.appendChild(tr);
                });
            })
            .catch((error) => {
                console.error("Erro ao carregar departamentos:", error);
            });
    }
    departmentTable();

    function handleDepartmentSubmit(event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById("departmentName").value,
            description: document.getElementById("departmentDescription").value
        };

        axios
            .post("http://localhost:3001/departments", formData)
            .then((response) => {
                console.log("Departamento adicionado com sucesso:", response.data);
                departmentTable();
            })
            .catch((error) => {
                console.error("Erro ao adicionar departamento:", error);
            });
    }
    document
        .getElementById("departmentForm")
        .addEventListener("submit", handleDepartmentSubmit);
});
