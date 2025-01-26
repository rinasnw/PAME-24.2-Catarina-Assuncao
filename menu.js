const readline = require ('readline-sync');
const { Sistema } = require ('./classes'); // Importa a classe Sistema
const { Funcionario } = require ('./classes'); 
const { Reserva } = require ('./classes');
const { Cliente } = require ('./classes');
const { Quartos } = require ('./classes');
const { salvarDados } = require ('./classes'); // Importa a função salvar dados
const { carregarDados } = require ('./classes'); // Importa a função carregar dados
const { exibirMenuFuncionario } = require ('./funcoes');
const fs = require('fs');

const sistema = new Sistema(); // Cria uma instancia do Sistema
carregarDados(sistema); // Carrega os dados ao iniciar o programa

function exibirMenu() {

    console.log("\n MENU PRINCIPAL");
    console.log("1. Fazer Login");
    console.log("2. Fazer Cadastro");
    console.log("3. Sair do Programa");
}

function main() {
    
    while (true) {   // Faz com que o menu seja exibido repetidamente até que o usuario escolha sair do programa

        // Verifica se tem um usuario logado e se esse usuario é uma instancia da classe funcionario
        if (sistema.usuarioLogado && sistema.usuarioLogado instanceof Funcionario) {
            exibirMenuFuncionario(); // Se o funcionario estiver logado aparecera o menu funcionario
            const opcao = readline.question("Escolha uma opcao: (digite o numero da opcao) ");

            switch (opcao) {
                case "4":
                    sistema.verMeusDados(); // aparece seus dados
                    break;

                case "5":
                    sistema.verListaReservas(); // aparece as reservas
                    break;

                case "6":
                    sistema.verListaQuartos(); // aparece lista de quartos
                    break;

                case "7":
                    sistema.verListaClientes(); // aparece lista de clientes
                    break;

                case "8": // mudar status da reserva (precisa do id da reserva)
                    const idReserva = readline.question("ID da Reserva: ");
                    const novoStatus = readline.question("Novo Status (pendente, adiada, realizada, cancelada): ");
                    sistema.mudarStatusReserva(Number(idReserva), novoStatus);
                    break;

                case "9": // adicionar quarto
                    const camas = readline.question("Quantidade de Camas: ");
                    const precoPorNoite = readline.question("Preço por Noite: ");
                    const quantidadeDisponivel = readline.question("Quantidade Disponível: ");
                    const nome = readline.question("Nome do Quarto: ");
                    const descricao = readline.question("Descrição: ");
                    sistema.adicionarQuarto(Number(camas), Number(precoPorNoite), Number(quantidadeDisponivel), nome, descricao);
                    break;
 
                case "10": // sai do programa
                    sistema.sairDoPrograma();
                    return;

                default:
                    console.log("Opção invalida.");  }
            }

        exibirMenu();
        const opcao = readline.question("\n Escolha uma opcao: ");

        switch (opcao) {

            // Caso de fazer login
            case "1":

                const emailLogin = readline.question("E-mail: ");
                const senhaLogin = readline.question("Senha: ", { hideEchoBack: true });
                sistema.fazerLogin(emailLogin, senhaLogin);
                break;


            // Caso de fazer cadastro
            case "2":

                const tipoCadastro = readline.question("Cliente ou funcionario? (Digite 'c' para cliente ou 'f' para funcionario): ").toLowerCase();

                // Cadastro para cliente
                if (tipoCadastro === "c") {

                    const nome = readline.question("Nome: "); // Adicionar nome
                    const dataNascimento = readline.question("Data de Nascimento (DD-MM-AAAA): "); // Adicionar data de nascimento
                    const cpf = readline.question("CPF: "); // Adicionar cpf
                    const email = readline.question("E-mail: "); // Adicionar email
                    const senha = readline.question("Senha: ", { hideEchoBack: true }); // Adicionar senha
                    sistema.cadastrarCliente(nome, dataNascimento, cpf, email, senha); // Cadastra o cliente
                } 

                // Cadastro para funcionario
                else if (tipoCadastro === "f") {

                    const nomeUsuario = readline.question("Nome de Usuario: ");
                    const cpf = readline.question("CPF: ");
                    const email = readline.question("E-mail: ");
                    const senha = readline.question("Senha: ", { hideEchoBack: true });
                    sistema.cadastrarFuncionario(nomeUsuario, cpf, email, senha); // Cadastra o funcionario
                } 

                else {

                    console.log("Opção invalida.");
                }

                break;

            // Caso para sair do programa
            case "3":

            salvarDados(sistema); // Salva os dados antes de sair
            sistema.sairDoPrograma();

                return;

            default:

                console.log("Opção invalida. Tente novamente.");
        }
    }
}

main()