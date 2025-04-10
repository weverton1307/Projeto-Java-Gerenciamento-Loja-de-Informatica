// PÁGINA PARA CADASTRAR FUNCIONÁRIOS
//Função para cadastrar funcionário
$(document).ready(function () {
    $("#salvarFuncionario").click(function (event) {
        event.preventDefault();
        const formData = {
            nome: $("#nomeFuncionario").val().trim(),
            endereco: $("#endereco").val().trim(),
            cpf: $("#cpf").val().trim(),
            telefone: $("#telefone").val(),
            email: $("#email").val(),
            cargo: {
                nome: $("#cargoFuncionario").val(),
            },
            usuario: {
                login: $("#nomeUsuario").val(),
                senha: $("#senha-funcionario").val(),
                tipoUsuario: $("#cargoFuncionario").val()
            },
            id: $("#funcionarioId").val() ? parseInt($("#funcionarioId").val()) : null
        };


        console.log("Form Data:", formData);

        if (formData.nome === "") {
            alert("Por favor, preencha o campo nome.");
            return;
        }
        if (formData.endereco === "") {
            alert("Por favor, preencha o campo endereço.");
            return;
        }
        if (formData.cpf === "") {
            alert("Por favor, preencha o campo CPF.");
            return;
        }
        if (formData.telefone === "") {
            alert("Por favor, preencha o campo Telefone.");
            return;
        }
        if (formData.usuario.login === "") {
            alert("Por favor, preencha o campo nome de usuário.");
            return;
        }
        if (formData.usuario.senha === "") {
            alert("Por favor, preencha o campo senha.");
            return;
        }
        const telefoneRegex = /^\(\d{2}\)\d{4}-\d{4}$/;
        if (!telefoneRegex.test(formData.telefone)) {
            alert("Por favor, insira um telefone válido no formato (xx)xxxx-xxxx.");
            return;
        }

        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!cpfRegex.test(formData.cpf)) {
            alert("Por favor, insira um CPF válido no formato xxx.xxx.xxx-xx.");
            return;
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }
        if (formData.cargo.nome === "Selecione um item") {
            alert("Por favor, selecione um cargo.");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/processarFormulario",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert("Funcionário cadastrado com sucesso!");
                window.location.href = "/cadastrarFuncionario";
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro: " + xhr.responseText);
            }
        });
    });
});