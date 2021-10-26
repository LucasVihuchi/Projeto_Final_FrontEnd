"use strict";
// 3 tipos de variáveis em JS:
// var - Variável global (Acessada de qualquer lugar, mesmo fora da propria função)
// let - Variável local (Acessada só no escopo onde foi declarada)
// const - Constante e escopo local

// == -> Verifica se os valores são iguais
// != -> Verficia se os valores são diferentes
// === -> Verfica se o valor e o tipo do valor são iguais
// !== -> Verifica se o valor e o tipo do valor são diferentes

function cadastraUsuario(event) {
    event.preventDefault();
    let senha = document.getElementById("Crie-sua-senha").value;
    let confirmacaoSenha = document.getElementById("Confirme-sua-senha").value;

    if (senha !== confirmacaoSenha) {
        alert("As senhas não coincidem!");
        return;
    }
    if (!(document.getElementById("Termos-de-uso").checked)) {
        alert("Os termos de uso devem ser aceitos para continuar o cadastro!");
        return;
    }

    let email = document.getElementById("E-mail").value;
    if (isCadastrado(email)) {
        alert("Email já cadastrado no sistema!");
        return;
    }

    let usuario = {
        nome: document.getElementById("Nome-completo").value,
        data_nascimento: document.getElementById("Data-de-nascimento").value,
        telefone: document.getElementById("Tel-ou-Celular").value,
        email: email,
        senha: senha,
        quer_receber_emails: document.getElementById("autorizo").checked
    }

    let cadastros = JSON.parse(localStorage.getItem("usuariosCadastrados") || "[]");
    
    cadastros.push(usuario);
    localStorage.setItem("usuariosCadastrados", JSON.stringify(cadastros));
     
    alert("Cadastro de usuário realizado com sucesso!");
    window.location.reload();
}

function isCadastrado(email) {
    let cadastros = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    if (cadastros === null || cadastros === undefined) {
        return false;
    }
    if (cadastros.length === 0) {
        return false;
    }
    for (let indice = 0; indice < cadastros.length; indice++) {
        if (email === cadastros[indice].email) {
            return true;
        }
    }
    return false;
}
