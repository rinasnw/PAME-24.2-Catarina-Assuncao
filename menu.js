const readline = require('readline-sync');
const { Sistema } = require('./classes'); // Importa a classe Sistema

const sistema = new Sistema(); // Cria uma instância do Sistema

function exibirMenu() {
    console.log("\n MENU PRINCIPAL");
    console.log("1. Fazer Login");
    console.log("2. Fazer Cadastro");
    console.log("3. Sair do Programa");
}

// Exibe o menu
exibirMenu();