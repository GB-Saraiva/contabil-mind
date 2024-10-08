// Função para preencher os dados da empresa
function preencherDadosEmpresa() {
  // Recuperar o objeto armazenado na chave 'usuario'
  const usuarioData = JSON.parse(localStorage.getItem("usuario")) || {};

  // Pegar as propriedades de 'usuarioData' ou usar um valor padrão se não existir
  const nomeEmpresa = usuarioData.nomeEmpresa || "Empresa Desconhecida";
  const cnpj = usuarioData.cnpj || "Não cadastrado";
  const email = usuarioData.email || "Não cadastrado";
  const endereco = `${usuarioData.endereco || "Endereço não cadastrado"}, ${
    usuarioData.bairro || ""
  }, ${usuarioData.cidade || ""}, ${usuarioData.estado || ""}`;
  const telefone = usuarioData.telefone || "Não cadastrado";

  // Preencher os elementos HTML com os dados recuperados
  document.getElementById("nomeEmpresa").textContent = nomeEmpresa;
  document.getElementById("cnpj").textContent = `CNPJ: ${cnpj}`;
  document.getElementById("email").textContent = `Email: ${email}`;
  document.getElementById("endereco").textContent = `Endereço: ${endereco}`;
  document.getElementById("telefone").textContent = `Telefone: ${telefone}`;
}

// Chama a função ao carregar a página
window.onload = preencherDadosEmpresa;
