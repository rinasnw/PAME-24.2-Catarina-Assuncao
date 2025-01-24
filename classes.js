// Classe Reserva
class Reserva {
    constructor(id, idcliente, status, checkin, checkout){
        
        this.id=id;
        this.idcliente=idcliente;
        this.status=status;
        this.checkin=checkin;
        this.checkout=checkout
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

}

// Classe Sistema
class Sistema {
    constructor() {
        this.clientes = []; // Lista de clientes cadastrados
        this.funcionarios = []; // Lista de funcionarios cadastrados
        this.reservas = []; // Lista de reservas
        this.quartos = []; // Lista de quartos disponíveis
    }
}

// exportando as classes
module.exports = {
    Reserva,
    Funcionario,
    Cliente,
    Quartos,
    Sistema
};
