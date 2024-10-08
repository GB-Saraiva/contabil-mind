document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Previne o envio do formulário

    // Coletando os dados do formulário
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Obtendo os dados armazenados
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    // Verificando se os dados existem
    if (!usuario) {
      alert("Nenhum usuário cadastrado.");
      return;
    }

    // Verificando se o email e a senha estão corretos
    if (usuario.email === email && usuario.senha === senha) {
      alert("Login bem-sucedido!");
      window.location.href = "menu.html"; // Redirecionar para o menu
    } else {
      alert("Email ou senha incorretos.");
    }
  });
