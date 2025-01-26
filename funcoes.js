const fs = require('fs');
const readline = require('readline-sync');

function exibirMenuFuncionario() {
    console.log("\n  MENU FUNCIONARIO ");
    console.log("4. Ver Meus Dados");
    console.log("5. Ver Lista de Reservas");
    console.log("6. Ver Lista de Quartos");
    console.log("7. Ver Lista de Clientes");
    console.log("8. Mudar Status da Reserva");
    console.log("9. Adicionar Quarto");
    console.log("10. Sair");
}

module.exports = {
    exibirMenuFuncionario: exibirMenuFuncionario,
};