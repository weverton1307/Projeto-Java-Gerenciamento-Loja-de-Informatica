function validarUsuario(){
    const senha = document.getElementById('senha').value;
    if(document.getElementById("usuario").value == ""){
        alert("Por favor, digite o nome de usuário")
    }else if(document.getElementById("senha").value == ""){
        alert("Por favor, digite a senha de usuário")
    }   else if (senha.length < 3 || senha.length > 8) {
        alert("A senha deve ter entre 3 e 8 caracteres.");
        return;
}else{
    alert("Loguin realizado com sucesso!");
    window.location.href = "./menu.html";
}  

}
function sair(){
    window.location.href = "./logout.html";
}
