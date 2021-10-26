

function previnePadrao(event) {
    event.preventDefault();

}

function cadastraRegistro() {
  
    
    let contato = {
        nome: document.getElementById('form-nome').value,
        email: document.getElementById('form-email').value,
        telefone: document.getElementById('form-telefone').value,
        data_e_hora: document.getElementById('form-data-e-hora').value    
    }
    return contato;
}


function cadastraAgendamento(event, contatoButton) {
    event.preventDefault();
    if(contatoButton === false) {
        console.log('agendado');
        
    }else{
        console.log('contatado');
    }
    let contatoTemp = cadastraRegistro();
    let label = document.getElementsByClassName('form-check-label');
    let servicos = document.getElementsByClassName('form-check-input');
    let servicosDesejados = [];
    for(let i=0; i < servicos.length; i++) {
        if(servicos[i].checked) {
            servicosDesejados.push(label[i].innerText);
        }
    } 
    
    let contato = {...contatoTemp, 
        servicos: servicosDesejados        
    }
    
    let agendamentos = JSON.parse(localStorage.getItem("agendamentos") || "[]");
    agendamentos.push(contato);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    // window.location.reload()
}