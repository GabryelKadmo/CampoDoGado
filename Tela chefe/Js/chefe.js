function Voltarlogin() {
    window.location.href = "./home.html";
}
// define a url do servidor
var url = 'http://127.0.0.1:3001';
var url2 = 'http://127.0.0.1:3002';

// recebe o container de retorno
// metodo POST com envio de dados
async function _enviar() {

    // recebe os dados do formulário HTML
    var nome = document.getElementById("firstname").value;
    var cpf = document.getElementById("cpf").value;
    var email = document.getElementById("email").value;
    var numero = document.getElementById("number").value;
    var senha = document.getElementById("password").value;


    // monta a rota
    var rota = url + '/registro';

    //monta o objeto para enviar
    var dados = {
        nome_paciente: nome,
        cpf_paciente: cpf,
        email_paciente: email,
        tel_paciente: numero,
        senha_paciente: senha,
    }

    // faz requisição via método POST passando os dados como um objeto
    await axios.post(rota, dados)
        .then(function (resposta) {
            console.log(JSON.stringify(resposta.data));
        })
        .catch(function (erro) {
            console.log(erro.data)
        })
}

//==========================ficha==============================
async function _enviar2() {

    var nome2 = document.getElementById("nameid").value;
    var numero2 = document.getElementById("number2").value;
    var data = document.getElementById("dataconsulta").value;
    var horario = document.getElementById("horaid").value;
    var motivo = document.getElementById("motivoid").value;

    // monta a rota
    var rota = url2 + '/registro';

    var dados2 = {
        nome_paciente_: nome2,
        tel_paciente_: numero2,
        data_consulta_: data,
        horario_consulta: horario,
        motivo_consulta_: motivo,
    }

    await axios.post(rota, dados2)
        .then(function (resposta) {
            console.log(JSON.stringify(resposta.data));
        })
        .catch(function (erro) {
            console.log(erro.data)
        })
    return Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Agendamento realizado!',
        showConfirmButton: false,
        timer: 1000
    })
}


function apresentar(dados) {
    var res = document.querySelector("div#res")

    var str = `
    <h1>Proximas Consultas Registradas</h1><br>
    <table class="table">
    <thead class="thead-dark">
    <tr>
      <th scope="col">ID Consulta</th>
      <th scope="col">Paciente</th>
      <th scope="col">Telefone do Paciente</th>
      <th scope="col">Data da Consulta</th>
      <th scope="col">Hora Da Consulta</th>
      <th scope="col">Motivo da consulta</th>
    </tr>
  </thead>

    `
    dados.forEach(function (item, idx) {
        str += `
        <tr>
            <th>${item.ID}</td> 
            <th>${item.NOME}</td>
            <th>${item.TELEFONE}</td>
            <th>${item.DATA_CONSULTA}</td>
            <th>${item.HORARIO_CONSULTA}</td>
            <th>${item.MOTIVO_CONSULTA}</td>
        </tr>`
    })
    str += `
    </table>`

    res.innerHTML = str

}
async function _listar() {

    // monta a rota
    var rota = url2 + '/busca_registro'

    // faz requisição via método GET
    await axios.get(rota)
        .then(function (resposta) {
            dados = resposta.data

            //const retorno = resposta.data
            apresentar(dados)
        })
        .catch(function (error) {
            console.log(error.data);
        })
}

function validarinputs1() {

    var validarnome = document.getElementById("nameid").value

    if (validarnome != "") {

        this._enviar2()

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Consulta Marcada Com Sucesso',
            showConfirmButton: false,
            timer: 1500
        })

    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Preencha Todos Os Campos',
        })

    }
}