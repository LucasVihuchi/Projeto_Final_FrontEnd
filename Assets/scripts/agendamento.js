"use strict";

atualizaValidacaoDataForm();
preencheAutomaticamente();

function determinaTipoOperacao(event) {
    event.preventDefault();
    if(isAgendamento) {
        if (!cadastraAgendamento()) {
            return;
        }
    }
    else{
        if (!cadastraContato()) {
            return;
        }
    }
    window.location.reload();
} 

function constroiRegistro() {
    let contato = {
        nome: document.getElementById('form-nome').value,
        email: document.getElementById('form-email').value,
        telefone: document.getElementById('form-telefone').value,
        data_e_hora: document.getElementById('form-data-e-hora').value    
    }
    return contato;
}

function cadastraAgendamento() {
    let contatoTemp = constroiRegistro();
    let label = document.getElementsByClassName('form-check-label');
    let servicos = document.getElementsByClassName('form-check-input');
    let servicosDesejados = [];

    for(let indice = 0; indice < servicos.length; indice++) {
        if(servicos[indice].checked) {
            servicosDesejados.push((label[indice].innerText).replace('\n', ' '));
        }
    }

    if(servicosDesejados.length === 0) {
        alert("Selecione pelo menos um serviço!");
        return false;
    }
    
    let contato = {...contatoTemp, 
        servicos: servicosDesejados        
    }
    let agendamentos = JSON.parse(localStorage.getItem("agendamentos") || "[]");

    if(isDuplicado(contato.email, agendamentos)) {
        alert("Já consta uma solicitação de agendamento no sistema associada a esse email!");
        return false;
    }
    
    agendamentos.push(contato);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    return true;
}

function cadastraContato() {
    let contato = constroiRegistro();
    let contatos = JSON.parse(localStorage.getItem("contatos") || "[]");

    if(isDuplicado(contato.email, contatos)) {
        alert("Já consta uma solicitação de contato no sistema associada a esse email!");
        return false;
    }

    contatos.push(contato);
    localStorage.setItem('contatos', JSON.stringify(contatos));
    return true;
}

function atualizaValidacaoDataForm() {
    let dataAtual = new Date();
    let mesAtual = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
    let diaAtual = ("0" + (dataAtual.getDate())).slice(-2);
    let horaAtual = ("0" + (dataAtual.getHours())).slice(-2);
    let minutoAtual = ("0" + (dataAtual.getMinutes())).slice(-2);

    let dataAtualFormatada = `${dataAtual.getFullYear()}-${mesAtual}-${diaAtual}T${horaAtual}:${minutoAtual}`;
    const dataHoraInput = document.getElementById('form-data-e-hora');
    dataHoraInput.setAttribute('min', dataAtualFormatada);

    let dataLimite = dataAtual;
    dataLimite.setMonth(dataLimite.getMonth() + 3);
    let mesLimite = ("0" + (dataLimite.getMonth() + 1)).slice(-2);
    let diaLimite = ("0" + (dataLimite.getDate() + 1)).slice(-2);

    let dataLimiteFormatada = `${dataLimite.getFullYear()}-${mesLimite}-${diaLimite}T23:59`;
    dataHoraInput.setAttribute('max', dataLimiteFormatada);
}

function isDuplicado(email, vetorRegistros) {
    if(vetorRegistros.length === 0) {
        return false;
    }
    for(let indice = 0; indice < vetorRegistros.length; indice++) {
        if(vetorRegistros[indice].email === email) {
            return true;
        }
    }
    return false;
}

function preencheAutomaticamente() {
    let usuarioLogado = JSON.parse(localStorage.getItem("loginAtual"));
    if(usuarioLogado == null || usuarioLogado == undefined) {
        return;
    }
    document.getElementById('form-nome').value = usuarioLogado.nome;
    document.getElementById('form-email').value = usuarioLogado.email;
    document.getElementById('form-telefone').value = usuarioLogado.telefone;
}