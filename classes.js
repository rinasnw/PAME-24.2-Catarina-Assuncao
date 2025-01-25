const fs = require('fs');
const readline = require('readline-sync');

// Classe Reserva
class Reserva {
    constructor(id, idcliente, status, checkin, checkout){
        
        this.id=id;
        this.idcliente=idcliente;
        this.status=status;
        this.checkin=checkin;
        this.checkout=checkout
    }
    // criar uma instância de reserva no arquivo json
    static fromJSON(json) {
        return new Reserva(json.id, json.idcliente, json.status, json.checkin, json.checkout);
}
}

// Classe Funcionário
class Funcionario {
    constructor(id, user, cpf, email, senha){
        
        this.id=id;
        this.user=user;
        this.cpf=cpf;
        this.email=email;
        this.senha=senha
    }

    // criar uma instância de funcionario no arquivo json
    static fromJSON(json) {
        return new Funcionario(json.id, json.user, json.cpf, json.email, json.senha);
    }
}

// Classe Cliente
class Cliente{
    constructor(id, nome, nascimento, cpf, email, senha){
        
        this.id=id;
        this.nome=nome;
        this.nascimento=nascimento;
        this.cpf=cpf;
        this.email=email;
        this.senha=senha;
    }

    // criar uma instância de cliente no arquivo json
    static fromJSON(json) {
        return new Cliente(json.id, json.nome, json.nascimento, json.cpf, json.email, json.senha);
    }
}

// Classe Quartos
class Quartos {
    constructor(camas, precoPorNoite, quantidadeDisponivel, nome, descricao){

        this.camas=camas;
        this.precoPorNoite=precoPorNoite;
        this.quantidadeDisponivel=quantidadeDisponivel;
        this.nome=nome;
        this.descricao=descricao
    }

    // criar uma instância de quartos no arquivo json
    static fromJSON(json) {
        return new Quartos(json.camas, json.precoPorNoite, json.quantidadeDisponivel, json.nome, json.descricao);
    }

}

// Classe Sistema
class Sistema {
    constructor() {
        this.clientes = []; // Lista de clientes cadastrados
        this.funcionarios = []; // Lista de funcionarios cadastrados
        this.quartos = []; // Lista de quartos disponiveis
        this.reservas = []; // Lista das reservas
        this.usuarioLogado = null; // Usuario logado no momento
    }

    // Função para cadastrar cliente
    cadastrarCliente(nome, dataNascimento, cpf, email, senha) {
        const id = this.clientes.length + 1; // Gera um id unico para o cliente
        const novoCliente = new Cliente(id, nome, dataNascimento, cpf, email, senha); // Cria uma instância de Cliente
        this.clientes.push(novoCliente);  // Adiciona o cliente à lista de clientes
        console.log(`Cliente ${nome} cadastrado com sucesso.`);
    }

    // Função para cadastrar funcionario
    cadastrarFuncionario(nomeUsuario, cpf, email, senha) {
        const id = this.funcionarios.length + 1; // Gera um id unico para o funcionario
        const novoFuncionario = new Funcionario(id, nomeUsuario, cpf, email, senha); // Cria uma instância de Funcionario
        this.funcionarios.push(novoFuncionario); // Adiciona o funcionario à lista de funcionarios
        console.log(`Funcionario ${nomeUsuario} cadastrado com sucesso.`);
    }

    // Função para fazer login
    fazerLogin(email, senha) {

        // Procura um cliente com o e-mail e senha fornecidos
        const cliente = this.clientes.find(c => c.email === email && c.senha === senha);
        if (cliente) {
            this.usuarioLogado = cliente; // Define o cliente como usuqrio logado
            console.log(`Cliente ${cliente.nome} logado com sucesso.`);
            return;
        }

        // Procura um funcionario com o e-mail e senha fornecidos
        const funcionario = this.funcionarios.find(f => f.email === email && f.senha === senha);
        if (funcionario) {
            this.usuarioLogado = funcionario; // Define o cfuncionario como usuario logado
            console.log(`Funcionario ${funcionario.nomeUsuario} logado com sucesso.`);
            return;
        }

        // Se não encontrar nenhum usuario exibe uma mensagem de erro
        console.log("E-mail ou senha incorretos.");
    }

    // Função para sair do programa
    sairDoPrograma() {
        this.usuarioLogado = null; // Remove o usuario logado
        console.log("Voce saiu do programa.");
    }
}

    // Função para carregar os dados do arquivo json
    function carregarDados(sistema) {
        if (fs.existsSync('dados.json')) {
            const dados = JSON.parse(fs.readFileSync('dados.json', 'utf-8'));
            sistema.clientes = dados.clientes.map(Cliente.fromJSON);
            sistema.funcionarios = dados.funcionarios.map(Funcionario.fromJSON);
            sistema.quartos = dados.quartos.map(Quartos.fromJSON);
            sistema.reservas = dados.reservas.map(Reserva.fromJSON);
        } else {
            console.log("Nenhum dado salvo encontrado.");
        }
    }

    // Função para salvar as listas em um arquivo JSON.
    function salvarDados(sistema) {
            const dados = {
                clientes: sistema.clientes,
                funcionarios: sistema.funcionarios,
                quartos: sistema.quartos,
                reservas: sistema.reservas
            };
            fs.writeFileSync('dados.json', JSON.stringify(dados, null, 2)); // Salva os dados em um arquivo JSON
        }

// Exportando as classes
module.exports = {
    Reserva,
    Funcionario,
    Cliente,
    Quartos,
    Sistema,
    salvarDados: salvarDados,
    carregarDados: carregarDados
};