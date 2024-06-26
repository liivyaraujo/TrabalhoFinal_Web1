document.addEventListener("DOMContentLoaded", function () {
  function departmentTable() {
    axios
      .get("http://localhost:3001/departments")
      .then((response) => {
        const departments = response.data;
        const tbody = document.getElementById("departmentTable");
        tbody.innerHTML = "";

        departments.forEach((department) => {
          const tr = document.createElement("tr");

          const tdDepartment = document.createElement("td");
          tdDepartment.textContent = department.name;

          const tdDescription = document.createElement("td");
          tdDescription.textContent = department.description;

          const tdRemover = document.createElement("td");
          const removeButton = document.createElement("button");
          removeButton.textContent = "Remover";
          removeButton.classList.add("bt-vermelho");
          removeButton.addEventListener("click", () => openConfirmationModal(department.id));
          tdRemover.appendChild(removeButton);

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

  function closeAddModal() {
    const modal = document.getElementById("addModal");
    modal.style.display = "none";
  }

  function openAddModal() {
    const modal = document.getElementById("addModal");
    modal.style.display = "flex";

    const cancelBtn = document.getElementById("cancelAddBtn");
    const addBtn = document.getElementById("addBtn");

    cancelBtn.onclick = function () {
      modal.style.display = "none";
    };

    addBtn.onclick = function () {
      modal.style.display = "none";
    };
  }

  function openConfirmationModal(departmentId) {
    const modal = document.getElementById("confirmModal");
    modal.style.display = "block";

    const cancelBtn = document.getElementById("cancelBtn");
    const confirmBtn = document.getElementById("confirmBtn");

    cancelBtn.onclick = function () {
      modal.style.display = "none";
    };
    confirmBtn.onclick = function () {
      deleteDepartment(departmentId);
      modal.style.display = "none";
    };
  }

  function deleteDepartment(id) {
    axios
      .delete(`http://localhost:3001/departments/${id}`)
      .then((response) => {
        console.log("Departamento removido com sucesso:", response.data);
        departmentTable();
      })
      .catch((error) => {
        console.error("Erro ao remover departamento:", error);
      });
  }

  function handleDepartmentSubmit(event) {
    event.preventDefault();

    const formData = {
      name: document.getElementById("departmentName").value,
      description: document.getElementById("departmentDescription").value,
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

  const addModalBtn = document.getElementById("addModalBtn");
  addModalBtn.addEventListener("click", () => openAddModal());
  

  const addBtn = document.getElementById("addBtn");
  addBtn.addEventListener("click", () => (closeAddModal()));

  const cancelAddBtn = document.getElementById("cancelAddBtn");
  cancelAddBtn.addEventListener("click", () => (closeAddModal()));

  document
    .getElementById("departmentForm")
    .addEventListener("submit", handleDepartmentSubmit);


  departmentTable();
});


