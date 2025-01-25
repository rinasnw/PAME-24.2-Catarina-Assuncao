const readline = require ('readline-sync');
const { Sistema } = require ('./classes'); // Importa a classe Sistema

const sistema = new Sistema(); // Cria uma instância do Sistema

function exibirMenu() {

    console.log("\n MENU PRINCIPAL");
    console.log("1. Fazer Login");
    console.log("2. Fazer Cadastro");
    console.log("3. Sair do Programa");
}

function main() {
    
    while (true) {   // faz com que o menu seja exibido repetidamente até que o usuario escolha sair do programa
        exibirMenu();
        const opcao = readline.question("Escolha uma opcao: ");

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

                    const nomeUsuario = readline.question("Nome de Usuário: ");
                    const cpf = readline.question("CPF: ");
                    const email = readline.question("E-mail: ");
                    const senha = readline.question("Senha: ", { hideEchoBack: true });
                    sistema.cadastrarFuncionario(nomeUsuario, cpf, email, senha); // Cadastra o funcionario
                } 

                else {

                    console.log("Opção inválida.");
                }

                break;

            // Caso para sair do programa
            case "3":

                sistema.sairDoPrograma();

                return;

            default:

                console.log("Opção inválida. Tente novamente.");
        }
    }
}

main()