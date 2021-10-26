"use strict";

determinaEstadoDaPagina();

function logarUsuario(event) {
    event.preventDefault();

    let email = document.getElementById("E-mail").value;
    let senha = document.getElementById("Senha").value;

    let usuarioEncontrado = getUsuarioPorEmail(email);
    if (usuarioEncontrado === null) {
        alert("Cadastro não encontrado no sistema!");
        return;
    }

    if (senha !== usuarioEncontrado.senha) {
        alert("Senha incorreta!");
        return;
    }
    
    localStorage.setItem("loginAtual", JSON.stringify(usuarioEncontrado));

    window.location.reload();
}

function deslogarUsuario(event){
    event.preventDefault();

    localStorage.removeItem("loginAtual");
    window.location.reload();
}

function getUsuarioPorEmail(email) {
    let cadastros = JSON.parse(localStorage.getItem("usuariosCadastrados") || "[]");

    if(cadastros.length === 0) {
        return null;
    }

    for (let indice = 0; indice < cadastros.length; indice++) {
        if (email === cadastros[indice].email) {
            return cadastros[indice];
        }
    }
    return null;
}

function geraLogOut() {
    let loginAtual = JSON.parse(localStorage.getItem("loginAtual"));

    let titulo = document.getElementsByTagName("h1")[0];
    let emailInput = document.getElementById("E-mail");
    let senhaInput = document.getElementById("Senha");
    let botaoSubmit = document.getElementsByClassName("botao")[0];
    let paragrafoCadastro = document.getElementsByClassName("cadastrar-paragrafo")[0];

    titulo.innerText = "LOGOUT";
    emailInput.value = loginAtual.email;
    senhaInput.value = "********";
    botaoSubmit.value = "SAIR";

    emailInput.setAttribute("readonly", "readonly");
    senhaInput.setAttribute("readonly", "readonly");
    emailInput.setAttribute("style", "background-color: #7d918a; color: #d9d5cd;");
    senhaInput.setAttribute("style", "background-color: #7d918a; color: #d9d5cd;");
    paragrafoCadastro.setAttribute("style", "display:none;");
}

function determinaEstadoDaPagina() {
    let loginAtual = JSON.parse(localStorage.getItem("loginAtual"));

    if(!(loginAtual == null || loginAtual == undefined)) {
        geraLogOut();
        let form = document.getElementsByClassName("formulario-login")[0];
        form.setAttribute("onsubmit", "deslogarUsuario(event)")
    }
}