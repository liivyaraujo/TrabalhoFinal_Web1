function handleSubmit(event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    position: document.getElementById("position").value,
    salary: parseFloat(document.getElementById("salary").value),
    transportAllowance: document.getElementById("transportAllowance").checked,
    department_id: parseInt(document.getElementById("department").value),
  };
  console.log(formData);

  axios
    .post("http://localhost:3001/employees", formData)
    .then((response) => {
      console.log("Dados enviados com sucesso:", response.data);
      document.getElementById("employeeForm").reset();

      const messageElement = document.getElementById("message");
      messageElement.style.display = 'block';
      messageElement.textContent = 'Formulário enviado com sucesso!';
    })
    .catch((error) => {
      console.error("Erro ao enviar dados:", error);
    });
}

document
  .getElementById("employeeForm")
  .addEventListener("submit", handleSubmit);

function populateDepartmentsSelect() {
  const departmentSelect = document.getElementById("department");

  axios
    .get("http://localhost:3001/departments")
    .then((response) => {
      const departments = response.data;
      departmentSelect.innerHTML = "";

      departments.forEach((department) => {
        const option = document.createElement("option");
        option.value = department.id;
        option.textContent = department.name;
        departmentSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar departamentos:", error);
    });
}
document.addEventListener("DOMContentLoaded", populateDepartmentsSelect);