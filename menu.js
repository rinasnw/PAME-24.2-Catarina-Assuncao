const readline = require ('readline-sync');
const { Sistema } = require ('./classes'); // Importa a classe Sistema
const { Funcionario } = require ('./classes'); 
const { Reserva } = require ('./classes');
const { Cliente } = require ('./classes');
const { Quartos } = require ('./classes');
const { exibirMenuFuncionario } = require ('./funcoes');
const { exibirMenuCliente } = require ('./funcoes');
const { exibirMenu } = require ('./funcoes');
const fs = require('fs');

const sistema = new Sistema(); // Cria uma instancia do sistema
sistema.carregarDados(sistema); // Carrega os dados ao iniciar o programa

function main() {

        while (true) { // Faz com que o menu seja exibido repetidamente até que o usuario escolha sair do programa

            if (sistema.usuarioLogado && sistema.usuarioLogado instanceof Cliente) { // Se tiver um usuario logado e o usuario for uma instancia de Cliente sera exibido o menu do cliente
                exibirMenuCliente();
                const opcao = readline.question("Escolha uma opcao: ");
    
                switch (opcao) {
                    case "1":
                        sistema.verMeusDados(); // aparece seus dados
                        break;
    
                    case "2":
                        sistema.verListaQuartos(); // ver lista quartos
                        break;
    
                    case "3":
                        sistema.verListaQuartos()
                        const nome = readline.question("Nome do Quarto: ");
                        const dataEntrada = readline.question("Data de Entrada (DD-MM-AAAA): ");
                        const dataSaida = readline.question("Data de Saida (DD-MM-AAAA): ");
                        sistema.fazerReserva(nome, dataEntrada, dataSaida); // fazer reserva
                        break;
    
                    case "4":
                        const idReserva = readline.question("ID da Reserva: ");
                        sistema.cancelarReserva(Number(idReserva)); // cancelar reserva
                        break;
    
                    case "5":
                        sistema.verMinhasReservas(); // ver reservas
                        break;
    
                    case "6":
                        sistema.sairDoPrograma();
                        sistema.salvarDados(sistema);
                        return;
    
                    default: // nao faz nada
                }

                continue; // volta para o menu do cliente
            }

        // Verifica se tem um usuario logado e se esse usuario é uma instancia da classe funcionario
        else if (sistema.usuarioLogado && sistema.usuarioLogado instanceof Funcionario) {

            exibirMenuFuncionario(); // Se o funcionario estiver logado aparecera o menu funcionario
            const opcao = readline.question("Escolha uma opcao: (digite o numero da opcao) ");

            switch (opcao) {
                case "1":
                    sistema.verMeusDados(); // aparece seus dados
                    break;

                case "2":
                    sistema.verListaReservas(); // aparece as reservas
                    break;

                case "3":
                    sistema.verListaQuartos(); // aparece lista de quartos
                    break;

                case "4":
                    sistema.verListaClientes(); // aparece lista de clientes
                    break;

                case "5": // mudar status da reserva (precisa do id da reserva)
                    const idReserva = readline.question("ID da Reserva: ");
                    const novoStatus = readline.question("Novo Status (pendente, adiada, realizada, cancelada): ");
                    sistema.mudarStatusReserva(Number(idReserva), novoStatus);
                    break;

                case "6": // adicionar quarto
                    const camas = readline.question("Quantidade de Camas: ");
                    const precoPorNoite = readline.question("Preco por Noite: ");
                    const nome = readline.question("Nome do Quarto: ");
                    const descricao = readline.question("Descricao: ");
                    sistema.adicionarQuarto(Number(camas), Number(precoPorNoite), nome, descricao);
                    break;
 
                case "7": // sai do programa
                    sistema.sairDoPrograma();
                    sistema.salvarDados(sistema);
                    return;

                default: // nao faz nada
                }

                continue; // volta para o menu do funcionario
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

            sistema.salvarDados(sistema); // Salva os dados antes de sair
            sistema.sairDoPrograma();

                return;

            default:

                console.log("Opção invalida. Tente novamente.");
        }
    }
}

main()