const fs = require('fs');
const readline = require('readline-sync');

function exibirMenuFuncionario() {
    console.log("\n  MENU FUNCIONARIO ");
    console.log("1. Ver Meus Dados");
    console.log("2. Ver Lista de Reservas");
    console.log("3. Ver Lista de Quartos");
    console.log("4. Ver Lista de Clientes");
    console.log("5. Mudar Status da Reserva");
    console.log("6. Adicionar Quarto");
    console.log("7. Sair");
}

function exibirMenuCliente() {
    console.log("\n MENU CLIENTE ")
    console.log("1. Ver Meus Dados ")
    console.log("2. Ver Lista de Quartos")
    console.log("3. Fazer Reserva ")
    console.log("4. Cancelar Reserva")
    console.log("5. Ver Minhas Reservas")

}

module.exports = {
    exibirMenuFuncionario: exibirMenuFuncionario,
};