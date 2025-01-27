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
    constructor(camas, precoPorNoite, nome, descricao){

        this.camas=camas;
        this.precoPorNoite=precoPorNoite;
        this.nome=nome;
        this.descricao=descricao
    }

    // criar uma instância de quartos no arquivo json
    static fromJSON(json) {
        return new Quartos(json.camas, json.precoPorNoite, json.nome, json.descricao);
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
        this.quantidadeDisponivelQuartos = 0; // quantidade disponível de quartos
    }

    // Função para cadastrar cliente
    cadastrarCliente(nome, dataNascimento, cpf, email, senha) {
        const id = this.clientes.length + 1; // Gera um id unico para o cliente
        const novoCliente = new Cliente(id, nome, dataNascimento, cpf, email, senha); // Cria uma instancia de cliente
        this.clientes.push(novoCliente);  // Adiciona o cliente na lista de clientes
        console.log(`Cliente ${nome} cadastrado com sucesso.`);
    }

    // Função para cadastrar funcionario
    cadastrarFuncionario(nomeUsuario, cpf, email, senha) {
        const id = this.funcionarios.length + 1; // Gera um id unico para o funcionario
        const novoFuncionario = new Funcionario(id, nomeUsuario, cpf, email, senha); // Cria uma instancia de funcionario
        this.funcionarios.push(novoFuncionario); // Adiciona o funcionario na lista de funcionarios
        console.log(`Funcionario ${nomeUsuario} cadastrado com sucesso.`);
    }

    // Função para fazer login
    fazerLogin(email, senha) {

        // Procura um cliente com o e-mail e senha fornecidos
        const cliente = this.clientes.find(c => c.email === email && c.senha === senha);

        if (cliente) {
            this.usuarioLogado = cliente; // Define o cliente como usuario logado
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

    // Função para ver dados do usuario
    verMeusDados() {
        if (this.usuarioLogado) {
            console.log("\n MEUS DADOS ");
            console.log(this.usuarioLogado);
            return;
        }
    }

    // Função para ver lista de reservas
    verListaReservas() {
        console.log("\n LISTA DE RESERVAS ");
        this.reservas.forEach(reserva => {
            console.log(reserva);
        });
    }

    // Função para ver lista de quartos
    verListaQuartos() {
        console.log("\n LISTA DE QUARTOS ");
        this.quartos.forEach(quarto => {
            console.log(quarto);
            console.log(`Quantidade disponivel de quartos: ${this.quantidadeDisponivelQuartos}`);
        });
    }

    // Função para ver lista de clientes
    verListaClientes() {
        console.log("\n LISTA DE CLIENTES ");
        this.clientes.forEach(cliente => {
            console.log(cliente);
        });
    }

    // Função para ver status da reserva
    mudarStatusReserva(idReserva, novoStatus) {
        const reserva = this.reservas.find(r => r.id === idReserva);
        if (reserva) {
            reserva.status = novoStatus;
            console.log(`Status da reserva ${idReserva} alterado para ${novoStatus}.`);
        } else {
            console.log("Reserva nao encontrada.");
        }
    }

    // Função para adicionar quarto
    adicionarQuarto(camas, precoPorNoite, nome, descricao) {
        const novoQuarto = new Quartos(
            Number(camas),
            Number(precoPorNoite),
            nome,
            descricao
        );
    
        this.quartos.push(novoQuarto);
        this.quantidadeDisponivelQuartos++;
    
        console.log(`Quarto "${nome}" adicionado com sucesso!`);
        console.log(`Quantidade disponível de quartos: ${this.quantidadeDisponivelQuartos}`);
    }

    // Função para fazer reserva
    fazerReserva(nome, dataEntrada, dataSaida) {
  
        const quarto = this.quartos.find(q => q.nome === nome); // busca o quarto pelo nome
        if (!quarto) {
            console.log("Quarto nao encontrado.");
            return;
        }
    
        if (this.quantidadeDisponivelQuartos <= 0) {  // verifica se o quarto esta disponivel
            console.log("Quarto indisponivel.");
            return;
        }
    
        const novaReserva = new Reserva(  // cria a reserva
            this.reservas.length + 1, // id unico
            this.usuarioLogado.id, // id do cliente logado
            "pendente", // status inicial
            dataEntrada,
            dataSaida
        );
    
        this.reservas.push(novaReserva); // adiciona a lista de reservas
        this.quantidadeDisponivelQuartos--; // reduz a quantidade disponivel do quarto
    
        console.log(`Reserva realizada com sucesso. ID da reserva: ${novaReserva.id}`);
    }

    // Função para cliente cancelar reserva
    cancelarReserva(idReserva) {
        const reserva = this.reservas.find(r => r.id === idReserva);
        if (reserva && reserva.idcliente === this.usuarioLogado.id) {
            reserva.status = "cancelada";
            const quarto = this.quartos.find(q => q.nome === reserva.nome);
            if (quarto) {
                this.quantidadeDisponivelQuartos++; // aumenta a quantidade disponivel do quarto
            }
            console.log(`Reserva ${idReserva} cancelada com sucesso.`);
        } else {
            console.log("Reserva nao encontrada ou voce nao tem permissao para cancela-la.");
        }
    }

    // Função cliente ver reservas
    verMinhasReservas() {
    
        console.log("\n MINHAS RESERVAS ");
        const minhasReservas = this.reservas.filter(r => r.idcliente === this.usuarioLogado.id);
        minhasReservas.forEach(reserva => {
            console.log(reserva);
        });
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
            sistema.quantidadeDisponivelQuartos = dados.quantidadeDisponivelQuartos || 0;
            return;
    }
}

    // Função para salvar as listas em um arquivo JSON.
    function salvarDados(sistema) {
            const dados = {
                clientes: sistema.clientes,
                funcionarios: sistema.funcionarios,
                quartos: sistema.quartos,
                reservas: sistema.reservas,
                quantidadeDisponivelQuartos: sistema.quantidadeDisponivelQuartos
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