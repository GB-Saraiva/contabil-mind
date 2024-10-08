document.addEventListener("DOMContentLoaded", () => {
  calcularBalanco();
});

function calcularBalanco() {
  let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];

  // Inicializando variáveis de ativos, passivos e patrimônio líquido
  let banco = 0,
    imovel = 0,
    instalacao = 0,
    equipamento = 0,
    pecas = 0,
    mercadorias = 0;
  let financiamento = 0,
    emprestimo = 0,
    fornecedor = 0;
  let capitalSocial = 0;

  // Filtrar os lançamentos com base no campo 'razao', similar ao que é feito no razonete
  lancamentos.forEach((lancamento) => {
    switch (lancamento.razao.toLowerCase()) {
      case "banco":
        banco += lancamento.valor;
        break;
      case "imovel":
        imovel += lancamento.valor;
        break;
      case "instalação":
        instalacao += lancamento.valor;
        break;
      case "equipamentos":
        equipamento += lancamento.valor;
        break;
      case "peças":
        pecas += lancamento.valor;
        break;
      case "mercadoria":
        mercadorias += lancamento.valor;
        break;
      case "financiamento":
        financiamento += lancamento.valor;
        break;
      case "emprestimo a pagar":
        emprestimo += lancamento.valor;
        break;
      case "fornecedores":
        fornecedor += lancamento.valor;
        break;
      case "capital social":
        capitalSocial += lancamento.valor;
        break;
      default:
        break;
    }
  });

  // Atualizar os valores no HTML
  document.getElementById("valor-banco").innerText = banco.toFixed(2);
  document.getElementById("valor-imovel").innerText = imovel.toFixed(2);
  document.getElementById("valor-instalacao").innerText = instalacao.toFixed(2);
  document.getElementById("valor-equipamento").innerText =
    equipamento.toFixed(2);
  document.getElementById("valor-pecas").innerText = pecas.toFixed(2);
  document.getElementById("valor-mercadorias").innerText =
    mercadorias.toFixed(2);

  document.getElementById("valor-financiamento").innerText =
    financiamento.toFixed(2);
  document.getElementById("valor-emprestimo").innerText = emprestimo.toFixed(2);
  document.getElementById("valor-fornecedor").innerText = fornecedor.toFixed(2);

  document.getElementById("patrimonio-liquido").innerText =
    capitalSocial.toFixed(2);

  // Calcular total de ativos e passivos
  const totalAtivos =
    banco + imovel + instalacao + equipamento + pecas + mercadorias;
  const totalPassivos = financiamento + emprestimo + fornecedor;

  document.getElementById("total-ativos").innerText = totalAtivos.toFixed(2);
  document.getElementById("total-passivos").innerText =
    totalPassivos.toFixed(2);
}
