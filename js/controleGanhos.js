document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("diario.html")) {
        carregarLancamentos();
        renderizarTabela();
        atualizarSaldo();
    }

    if (window.location.pathname.includes("razao.html")) {
        carregarLancamentos();
        renderizarCards();
    }

    // Adicionar novo lançamento ao clicar no botão "Adicionar"
    document.getElementById("addLancamentoBtn")?.addEventListener("click", () => {
        adicionarLancamento();
    });

    // Filtrar lançamentos ao clicar no botão "Filtrar"
    document.getElementById("filtrarBtn")?.addEventListener("click", () => {
        filtrarLancamentos();
    });

    // Encerrar a sessão e voltar ao login
    document.getElementById("logoutBtn")?.addEventListener("click", () => {
        // Implementar lógica de logout
    });
});

// Função para adicionar um novo lançamento
function adicionarLancamento() {
    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const tipo = document.getElementById("tipo").value;
    const data = document.getElementById("data").value;
    const conta = document.getElementById("conta").value;
    const razao = document.getElementById("razao").value;

    if (!descricao || isNaN(valor) || !data || !conta || !razao) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    // Ajustar a data para evitar problemas de fuso horário
    const dataAjustada = new Date(data + 'T12:00:00');

    const lancamento = {
        id: Date.now(),
        descricao,
        valor: tipo === "expense" ? -valor : valor,
        tipo,
        data: dataAjustada.toLocaleDateString('pt-BR'),
        conta,
        razao
    };

    let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];
    lancamentos.push(lancamento);
    localStorage.setItem("lancamentos", JSON.stringify(lancamentos));

    renderizarTabela();
    atualizarSaldo();
    renderizarCards(); // Atualizar os cards
}

// Função para renderizar a tabela de "Razão"
function renderizarTabela(lancamentos = null) {
    const tabelaCorpo = document.getElementById("tabela-corpo");
    tabelaCorpo.innerHTML = "";

    if (!lancamentos) {
        lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];
    }

    lancamentos.forEach(lancamento => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${lancamento.data}</td>
            <td>${lancamento.descricao}</td>
            <td>${lancamento.razao}</td>
            <td>${lancamento.valor.toFixed(2)}</td>
            <td>${lancamento.conta}</td>
            <td>
                <button onclick="removerLancamento(${lancamento.id})">Remover</button>
            </td>
        `;

        tabelaCorpo.appendChild(row);
    });
}

// Função para filtrar lançamentos
function filtrarLancamentos() {
    let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];

    const dataInicio = document.getElementById("data-inicio")?.value || "1900-01-01";
    const dataFim = document.getElementById("data-fim")?.value || "2100-12-31";

    const dataInicioObj = new Date(dataInicio + 'T00:00:00');
    const dataFimObj = new Date(dataFim + 'T23:59:59');

    lancamentos = lancamentos.filter(lancamento => {
        const dataLancamento = new Date(lancamento.data.split('/').reverse().join('-') + 'T12:00:00');
        return dataLancamento >= dataInicioObj && dataLancamento <= dataFimObj;
    });

    renderizarTabela(lancamentos);
    atualizarSaldo(lancamentos); // Atualizar saldo com lançamentos filtrados
}

// Função para atualizar o saldo total
function atualizarSaldo(lancamentos = null) {
    if (!lancamentos) {
        lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];
    }
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
    renderizarCards(); // Atualizar os cards
}

// Função para carregar lançamentos do localStorage
function carregarLancamentos() {
    const lancamentosSalvos = localStorage.getItem("lancamentos");
    if (lancamentosSalvos) {
        lancamentos.push(...JSON.parse(lancamentosSalvos));
    }
}

// Função para renderizar os cards
function renderizarCards() {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";

    let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];

    const todasRazoes = [
        "Imovel", "Caixa", "Capital Social", "Financiamento", "Instalação",
        "Equipamentos", "Emprestimo a Pagar", "Peças", "Banco", "Mercadoria", "Fornecedores"
    ];

    const groupedByRazao = todasRazoes.reduce((acc, razao) => {
        acc[razao] = lancamentos.filter(l => l.razao === razao);
        return acc;
    }, {});

    for (const razao in groupedByRazao) {
        const card = document.createElement("div");
        card.className = "card";

        const positiveValues = groupedByRazao[razao].filter(l => l.valor >= 0);
        const negativeValues = groupedByRazao[razao].filter(l => l.valor < 0);

        const positiveDiv = document.createElement("div");
        positiveDiv.className = "positive";
        positiveDiv.innerHTML = `<h4>${razao} - Positivos</h4>`;
        positiveValues.forEach(l => {
            positiveDiv.innerHTML += `<p>${l.data}: R$ ${l.valor.toFixed(2)} - ${l.descricao}</p>`;
        });

        const negativeDiv = document.createElement("div");
        negativeDiv.className = "negative";
        negativeDiv.innerHTML = `<h4>${razao} - Negativos</h4>`;
        negativeValues.forEach(l => {
            negativeDiv.innerHTML += `<p>${l.data}: R$ ${l.valor.toFixed(2)} - ${l.descricao}</p>`;
        });

        const divider = document.createElement("div");
        divider.className = "divider";

        card.appendChild(positiveDiv);
        card.appendChild(divider);
        card.appendChild(negativeDiv);

        cardsContainer.appendChild(card);
    }
}

// Lista de lançamentos
const lancamentos = [];