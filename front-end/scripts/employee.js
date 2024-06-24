document.addEventListener("DOMContentLoaded", function () {
  function employee() {
    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get("id");

    if (!employeeId) {
      console.error("ID do funcionário não encontrado");
      return;
    }

    axios
      .get(`http://localhost:3001/employees/${employeeId}`)
      .then((response) => {
        const employee = response.data;
        const employeeContainer = document.getElementById("employee");

        const info = document.createElement("div");
        info.classList.add("info");

        const infoHeader = document.createElement("div");
        infoHeader.classList.add("info-header");
        infoHeader.innerHTML = `
            <h3 class="info-title">${employee.name}</h3>
            <p class="info-subtitle">${employee.position}</p>
          `;

        const infoBody = document.createElement("div");
        infoBody.classList.add("info-body");
        infoBody.innerHTML = `
            <p><strong>Email:</strong> ${employee.email}</p>
            <p><strong>Salário:</strong> R$ ${employee.salary}</p>
            <p><strong>Data de Contratação:</strong> ${new Date(
              employee.hireDate
            ).toLocaleDateString()}</p>
            <p><strong>Departamento:</strong> ${employee.department_name}</p>
          `;

        info.appendChild(infoHeader);
        info.appendChild(infoBody);

        employeeContainer.appendChild(info);
      })
      .catch((error) => {
        console.error("Erro ao carregar funcionário:", error);
      });
  }

  employee();
});
