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

// Exportar a função para uso em outros arquivos
export { renderizarCards };