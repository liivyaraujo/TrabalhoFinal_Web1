function handleSubmit(event) {
  event.preventDefault();

  // Captura dos dados do formulário
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    position: document.getElementById("position").value,
    salary: parseFloat(document.getElementById("salary").value),
    transportAllowance: document.getElementById("transportAllowance").checked,
    department_id: parseInt(document.getElementById("department").value),
  };

  console.log(formData);

  // Requisição POST usando Axios
  axios
    .post("http://localhost:3001/employees", formData)
    .then((response) => {
      console.log("Dados enviados com sucesso:", response.data);
    })
    .catch((error) => {
      console.error("Erro ao enviar dados:", error);
    });
}
document
  .getElementById("employeeForm")
  .addEventListener("submit", handleSubmit);

// Função para preencher o select com os departamentos
function populateDepartmentsSelect() {
  // Seleciona o elemento select
  const departmentSelect = document.getElementById("department");

  // Faz a requisição para obter os departamentos
  axios
    .get("http://localhost:3001/departments")
    .then((response) => {
      const departments = response.data;

      // Limpa as opções existentes no select
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

// Função para validar o email em tempo real
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const email = emailInput.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    emailError.textContent = "Email inválido";
    emailInput.classList.add("invalid");
  } else {
    emailError.textContent = "";
    emailInput.classList.remove("invalid");
  }
}

document.getElementById("email").addEventListener("input", validateEmail);
