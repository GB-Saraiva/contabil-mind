document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("razao.html")) {
        renderizarTabela();
        atualizarSaldo();
    }

    // Adicionar novo lançamento ao clicar no botão "Adicionar"
    document.getElementById("addLancamentoBtn")?.addEventListener("click", () => {
        adicionarLancamento();
    });

    // Encerrar a sessão e voltar ao login
    document.getElementById("logoutBtn")?.addEventListener("click", () => {
        window.location.href = "../index.html";
    });
});

// Função para adicionar um novo lançamento
function adicionarLancamento() {
    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const tipo = document.getElementById("tipo").value;
    const data = document.getElementById("data").value;

    if (!descricao || isNaN(valor) || !data) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const lancamento = {
        id: Date.now(), 
        descricao,
        valor: tipo === "expense" ? -valor : valor,
        tipo,
        data: new Date(data).toLocaleDateString(),
    };

    let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];
    lancamentos.push(lancamento);
    localStorage.setItem("lancamentos", JSON.stringify(lancamentos));

    renderizarTabela();
    atualizarSaldo();

    // Limpar campos do formulário
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("tipo").value = "expense";
    document.getElementById("data").value = "";
}

// Função para renderizar a tabela de "Razão"
function renderizarTabela() {
    const tabelaCorpo = document.getElementById("tabela-corpo");
    tabelaCorpo.innerHTML = "";

    let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];

    lancamentos.forEach(lancamento => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${lancamento.data}</td>
            <td>${lancamento.descricao}</td>
            <td>${lancamento.tipo === "expense" ? "Débito" : "Crédito"}</td>
            <td>${lancamento.valor.toFixed(2)}</td>
            <td>
                <button onclick="removerLancamento(${lancamento.id})">Remover</button>
            </td>
        `;

        tabelaCorpo.appendChild(row);
    });
}

// Função para atualizar o saldo total
function atualizarSaldo() {
    let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];
    let saldoTotal = lancamentos.reduce((acc, lancamento) => acc + lancamento.valor, 0);
    document.getElementById("saldo-total").innerText = saldoTotal.toFixed(2);
}

// Função para remover um lançamento
function removerLancamento(id) {
    let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];
    lancamentos = lancamentos.filter(l => l.id !== id);
    localStorage.setItem("lancamentos", JSON.stringify(lancamentos));
    renderizarTabela();
    atualizarSaldo();
}
