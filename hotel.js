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
    constructor(camas, preconoite, quantdisp, nome, descri){

        this.camas=camas;
        this.preconoite=preconoite;
        this.quantdisp=quantdisp;
        this.nome=nome;
        this.descri=descri
    }

}

// Classe Sistema
class Sistema {

}