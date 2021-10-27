"use strict";

atualizaValidacaoDataForm();
preencheAutomaticamente();

// Função acionada pelo submit do formulário.
// Determina se o botão clicado foi 'contato' ou 'agendar'
function determinaTipoOperacao(event) {
    event.preventDefault();
    if(isAgendamento) {
        if (!cadastraAgendamento()) {
            return;
        }
        alert("Solicitação de agendamento realizada com sucesso!");
    }
    else{
        if (!cadastraContato()) {
            return;
        }
        alert("Solicitação de contato realizada com sucesso!");
    }
    window.location.reload();
} 

// Função base para as funções de cadastro. Cria objeto com dados pessoais do form
function constroiRegistro() {
    let contato = {
        nome: document.getElementById('form-nome').value,
        email: document.getElementById('form-email').value,
        telefone: document.getElementById('form-telefone').value,
        data_e_hora: document.getElementById('form-data-e-hora').value    
    }
    return contato;
}

// Função para cadastro de solicitações de agendamento no localStorage
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

// Função para cadastro de solicitações de contato no localStorage
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

// Função para ataulizar as datas válidas do campo data e hora do form
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

// Função que verifica se um email já consta em um vetor de obejtos
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

// Função que preenche automaticamente o form se o usuário já estiver logado
function preencheAutomaticamente() {
    let usuarioLogado = JSON.parse(localStorage.getItem("loginAtual"));
    if(usuarioLogado == null || usuarioLogado == undefined) {
        return;
    }
    document.getElementById('form-nome').value = usuarioLogado.nome;
    document.getElementById('form-email').value = usuarioLogado.email;
    document.getElementById('form-telefone').value = usuarioLogado.telefone;
}