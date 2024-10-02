// Script para a página de login
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (!usuario || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (usuario === "admin" && senha === "1234") {
      alert("Login bem-sucedido!");
      window.location.href = "/html/razao.html"; // Redirecionar para a página de razão após login
    } else {
      alert("Usuário ou senha incorretos.");
    }
  });
}

// Script para as páginas de Razão e Diário
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("razao.html")) {
    renderizarTabela();
  }

  // Redirecionar para "Diário" ao clicar no botão "+"
  document.getElementById("addLancamentoBtn")?.addEventListener("click", () => {
    window.location.href = "/html/diario.html";
  });

  // Encerrar a sessão e voltar ao login
  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
});

// Adicionar novos lançamentos no "Diário"
document.getElementById("diarioForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const lancamento = {
    data: document.getElementById("data").value,
    descricao: document.getElementById("descricao").value,
    categoria: document.getElementById("categoria").value,
    valor: document.getElementById("valor").value,
    observacoes: document.getElementById("observacoes").value,
  };

  // Salvar no localStorage (simulação de banco de dados)
  let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];
  lancamentos.push(lancamento);
  localStorage.setItem("lancamentos", JSON.stringify(lancamentos));

  // Voltar para a página "Razão"
  window.location.href = "/html/razao.html";
});

// Função para renderizar a tabela de "Razão"
function renderizarTabela() {
  let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];
  const tabelaCorpo = document.getElementById("tabela-corpo");

  lancamentos.forEach((lancamento) => {
    let linha = document.createElement("tr");

    linha.innerHTML = `
            <td>${lancamento.data}</td>
            <td>${lancamento.descricao}</td>
            <td>${lancamento.categoria}</td>
            <td>${lancamento.valor}</td>
            <td>${lancamento.observacoes}</td>
        `;

    tabelaCorpo.appendChild(linha);
  });
}
