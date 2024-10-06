document
  .getElementById("cadastroForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Previne o envio do formulário

    // Coletando os dados do formulário
    const nomeEmpresa = document.getElementById("nomeEmpresa").value;
    const cnpj = document.getElementById("cnpj").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const estado = document.getElementById("estado").value;
    const cidade = document.getElementById("cidade").value;
    const cep = document.getElementById("cep").value;
    const bairro = document.getElementById("bairro").value;
    const complemento = document.getElementById("complemento").value;
    const nomeResponsavel = document.getElementById("nomeResponsavel").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    // Verificando se todos os campos estão preenchidos
    if (
      !nomeEmpresa ||
      !cnpj ||
      !email ||
      !telefone ||
      !estado ||
      !cidade ||
      !cep ||
      !bairro ||
      !nomeResponsavel ||
      !senha ||
      !confirmarSenha
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Verificando se as senhas coincidem
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    // Criando um objeto com os dados do usuário
    const usuario = {
      nomeEmpresa,
      cnpj,
      email,
      telefone,
      estado,
      cidade,
      cep,
      bairro,
      complemento,
      nomeResponsavel,
      senha,
    };

    // Armazenando o usuário no localStorage
    localStorage.setItem("usuario", JSON.stringify(usuario));

    // Redirecionar ou mostrar mensagem de sucesso
    alert("Cadastro realizado com sucesso!");
    window.location.href = "../index.html"; // Redirecionar para a tela de login
    
  });
