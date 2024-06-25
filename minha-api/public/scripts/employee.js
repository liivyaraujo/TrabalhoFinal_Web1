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
            <div class="nomeC">
              <h2 class="nome">${employee.name}</h2>
              <p class="cargo">${employee.position}</p>
            </div>
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
              
        const divBotoes = document.getElementById("botoes");
        divBotoes.innerHTML = `<a href="../index.html">
        <button class="bt-preto" style="margin-bottom: 20px; font-size: 18px;">Voltar</button>
      </a>`;
        const editLink = document.createElement("a");
        editLink.href = `./editEmployee.html?id=${employee.id}`;
          const editBotao = document.createElement("button");
          editBotao.textContent = "Editar";
          editBotao.setAttribute( "class", "bt-verde" );
          editLink.appendChild(editBotao);
        divBotoes.appendChild(editLink);

          
      })
      .catch((error) => {
        console.error("Erro ao carregar funcionário:", error);
      });
  }

  employee();
});
