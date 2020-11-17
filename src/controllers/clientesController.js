const clientes = require("../models/clientes");

// Método GET
// Requisição no Postman (localhost:8080/clientes)
const getAll = (req, res) => {
  console.log(req.url);
  clientes.find(function (err, clientes) {
    res.status(200).send(clientes);
  });
};

// GET/clientes/compradores
// Requisição no Postman (localhost:8080/clientes/compradores)

/* uma opção de código mais enxuto para buscar por compradores
const getCompradores = (req, res) => {
  clientes.find({ comprou: true }, {nome: 1, email: 1 , _id: 0}, function (err, clientes) {
    res.status(200).send(clientes)
  });
}
*/

const getCompradores = (req, res) => {
  clientes.find({ comprou: true }, function (err, clientes) {
    // Busca pelos clientes comprou = true
    const clientesFiltrados = clientes.map(function (cliente) {
      // Criamos a constante clientesFiltrados para receber o  método map com nova lista a partir dos atributos definidos
      return {
        // retorna os atributos solicitados
        nome: cliente.nome, // atribui a variável nome  o valor do cliente.nome ( nome do cliente do array)
        email: cliente.email, // atribui a variável email  o valor do cliente.email ( email do cliente do array)
      };
    });
    res.status(200).send(clientesFiltrado); // Exibe o status 200 e os clientes filtrados
  });
};

// Método GET by CPF
// Requisição no Postman (localhost:8080/clientes/cpf)
const getByCpf = (req, res) => {
  const cpf = req.params.cpf;
  // Find sempre retorna uma lista
  // FindOne retorna um único documento
  clientes.find({ cpf }, function (err, clientes) {
    res.status(200).send(clientes);
  });
};

// Método POST
// Requisição no Postman (localhost:8080/clientes/)
const postCliente = (req, res) => {
  console.log(req.body);

  let cliente = new clientes(req.body);

  cliente.save(function (err) {
    if (err) {
      res.status(500).send({ message: err.message });
    }
    res.status(201).send({
      status: true,
      mensagem: "Cliente incluido com sucesso",
    });
  });
};


// localhost:8080/clientes
const deleteClienteComprou = (req, res) => {

  // Deleta quando comprou = true
  clientes.deleteMany({ comprou: true }, function (err ){
    if(err) { 
      res.status(500).send({ 
        message: err.message, 
        status: "FAIL" 
       })
    }
   
    res.status(200).send({ 
      message: "Cliente removido com sucesso", 
      status: "SUCCESS" 
    })
  })
  
};


//localhost:8080/clientes/cpf
const putCliente = (req, res) => {
  const cpf = req.params.cpf;

  //faz o update apenas para quem respeitar o id passado no parametro
  // set são os valores que serão atualizados
  //UpdateMany atualiza vários registros de uma unica vez
  //UpdateOne atualiza um único registro por vez
  
  clientes.updateMany({ cpf }, { $set : req.body }, function (err) {
    if (err) {
      res.status(500).send({ message: err.message })
    }
    res.status(200).send({ message: "Registro alterado com sucesso"})
  })
  
}




module.exports = {
  getAll,
  getCompradores,
  getByCpf,
  postCliente,
  deleteClienteComprou,
  putCliente,
}
