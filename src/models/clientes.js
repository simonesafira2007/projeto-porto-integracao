// Schema são as propriedades que irão compor a estrutura do documento no banco de dados, aqui podemos definir os tipos de valores, nomes dos campos, entre outras configurações.

// New mongoose.Schema é o comando utilizado para que possamos criar um novo Schema do mongo chamado AlunasSchema, através do mongoose.

const mongoose = require("mongoose");

// Estrutura do seu model (atributos da sua entidade)
const clientesSchema = new mongoose.Schema(
  {
    nome: { type: String },
    email: { type: String },
    cpf: { type: String },
    dataNascimento: { type: String },
    estadoCivil: { type: String },
    telefone: { type: Number },
    comprou: { type: Boolean },
  },
  {
    // gera por padrão uma versão para cada atualização do documento
    versionKey: false,
  }
);

// atribuindo o esquema a uma collection
// definindo o nome da collection que irei salvar no banco
const clientes = mongoose.model("clientes", clientesSchema);

// exportar o model para ser utilizado
module.exports = clientes;
