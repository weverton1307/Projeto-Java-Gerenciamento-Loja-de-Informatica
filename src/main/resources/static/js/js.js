function mostrarMensagem() {
    var tipoUsuario = document.getElementById("tipoUsuario").value;
    var usuarioLogin = document.getElementById("usuario").value;
    alert("Olá " + usuarioLogin + ", sua permissão é de " + tipoUsuario + ". Seja bem-vindo!");
}