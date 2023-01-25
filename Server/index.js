const express = require("express");
const app = express();
const app2 = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "registro",
});

app.use(cors());
app.use(express.json());
app2.use(cors());
app2.use(express.json());

app.post("/registro", (req, res) => {
  const { nome_paciente, cpf_paciente, email_paciente, tel_paciente, senha_paciente } = req.body;

  let SQL = "INSERT INTO registro.registro_paciente (nome_paciente, cpf_paciente, email_paciente, tel_paciente, senha_paciente ) VALUES (?,?,?,?,?);";

  db.query(SQL, [nome_paciente, cpf_paciente, email_paciente, tel_paciente, senha_paciente], (err, result) => {
    console.log(err);
  });
});

app.get("/busca_registro", (req, res) => {
  let mysql = "SELECT * FROM registro.usuarios;";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Pacientes carregados");
});


// ============================================ Cadastro ficha médica ============================================

app2.post("/registro", (req, res) => {
  const { nome_paciente_, tel_paciente_, data_consulta_, horario_consulta, motivo_consulta_ } = req.body;

  let SQL = "INSERT INTO registro.ficha_paciente (nome_paciente_, tel_paciente_, data_consulta_, horario_consulta_, motivo_consulta_ ) VALUES (?,?,?,?,?);";

  db.query(SQL, [nome_paciente_, tel_paciente_, data_consulta_, horario_consulta, motivo_consulta_], (err, result) => {
    console.log(err);
  });
});

app2.get("/busca_registro", (req, res) => {
  let mysql = "SELECT * FROM registro.consultas;";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app2.listen(3002, () => {
  console.log("Consultas carregadas");
});