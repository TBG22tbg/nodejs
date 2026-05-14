// 1° PASSO: Criando do servidor
// 2° passo>: Exibir rota e métado requirido
// 3° passo: Atribuit o método GET
// 4° passo: Atribuit o método POST
// 5° passo: Atribuit o método PUT
// 6° passo: Atribuit o método DELETE
// 7° passo: Ajustes para o consumo de API

 
//Importando o módulo http nativo do NODE.JS
const http = require('http');
const { encode } = require('querystring');
// Importando o módulo url nativo do Node.js
const url = require('url');
 
 
// Simulando um banco
let pedidos =[
    {
 
        id: 1,
        cliente: "Tharcisio",
        produto: "Tenis",
        status: "pendente"
    }
]
 
// Criação do servidor "server"
const server = http.createServer((req, res) => {
    // Definindo a resposta do servidor como um a aplicação JSON
    res.setHeader('Content-Type', 'application/JSON');
 
    // Leitura da URL
    const urlCompleta = url.parse(req.url, true);
 
    // Recebendo os dados de rota e método através da URL
    const rota =  urlCompleta.pathname;
    const metodo = req.method;
     

    // Liberação de CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE", "OPITIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if(metodo === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
    };
 
    // Criação do método GET
    //Com a condição ´para que a URL tenha /pedidos e o
    // método seja o GET para que uma resposta específica
    if(rota === "/pedidos" && metodo === "GET"){
        // Resposta que será exibida para o usuário
        res.end(JSON.stringify({
            mensagem: 'Lista de Pedidos',
            dados: pedidos
        }));
        return; // Finaliza a requisição
    };

    // Criação do método POST
    if(rota === "/pedidos" && metodo === "POST") {
        // Variável body que irá armazenar todas as partes de conteúdo enviados oela requisição
        let body = '';

        // .on = ação
        // Ao disparo da requisição, a ação referente ao armazenamento das partes
        // dentro do body irá acontecer.
        req.on('data', parte => {
            body += parte; // Acumulo das partes na variável body
        });

        // .on = ação
        // No disparo da função, após o armazenamento das partes no body, damos inicio
        // a ação final para processamento da requisição
        req.on('end', () => {
            // novoPedido irá armazenar o conteúdo do body traduzido para um objeto JavaScript
            const novoPedido = JSON.parse(body);

            // Incluindo o novoPedido no nosso array de pedidos
            pedidos.push(novoPedido);

            res.statusCode = 201; // Criado com sucesso

            // Resposta final para o usuario, a confirmação de cadastro do
            // novo pedido acompanhado dos dados do novoProduto
            res.end(JSON.stringify({
                mensagem: "Pedido cadastrado com sucesso",
                pedido: novoPedido
            }));
        });
        return; // Encerra a requisição
    };

    // Criação do método PUT
    if(rota === "/pedidos" && metodo === "PUT") {
        let body = ''; // Variável que armazena os pedaços da requisição

        // Ação que será disparada com a requisição para armazenar as partes
        // da requisição dentro da variável body
        req.on('data', parte => {
            body += parte;
        });


        req.on('end', () => {
            // A variável dados receberá a tradução do body em JavaScript
            const dados =JSON.parse(body);
            let encontrado = false; // facilitará o servidor a encontrar o id correspondente
        
            // pedidos está recebendo o mapeamento do array pedidos
            // pedido (no singular) = cada objeto do array
            pedidos = pedidos.map(pedido => {
                // Comparação de ID para sr possivel substituir
                if(pedido.id === dados.id) {
                    encontrado = true;

                    return {
                        ...pedido,
                        status: dados.status
                    };
                };
                return pedido;
            });

            // Caso o pedido não seja encontrado (exemplo: buscar o id 5, que não existe),
            // será retornado o statuscode 402 e uma mensagem de pedido não encontrado
            if(!encontrado) {
            res.statusCode = 404;
            res.end(JSON.stringify({mensagem: "Pedido não encontrado"}));
            return;
        };

        // Resposta final para o usuario, com o pedido localicado e atualizado via requisição PUT
        res.end(JSON.stringify({
            mensagem: "Pedido atualizado com sucesso",
            dados: pedidos
        }));
    });
    return;

    };

    // Criaçãoi do metodo DELETE
    if(rota === "/pedidos" && metodo === "DELETE") {
        let body = '';

        req.on('data', parte => {
            body +=parte;
        });

        req.on('end', () => {
            // Dados receberá o body traduzido para objeto js
            const dados = JSON.parse(body);

            // Mediará todo o tamanho do array de op deletar-mos
            const tamanhoAntes = pedidos.length;

            // Manterá todos os pedidos que não tem o id informado e removerá os que tem o id igula ao enviado pela requisição
            pedidos = pedidos.filter(pedido => pedido.id !== dados.id);

            // Fará a comparação de tamanho do array, se os tamanhos estiverem identidos, o pedido não foi localizado para que seja apagado.
            if(pedidos.length === tamanhoAntes) {
                res.statusCode = 404;
                res.end(JSON.stringify({ mensagem: "Pedido não encontrado"}));
                return;
            };
 
            // Reposta final que exibe o pedido removido com sucesso e exibe o array atualizado
            res.end(JSON.stringify({
                mensagem: "Pedido removido",
                dados: pedidos
            }));
        });
        return;
    };

    res.statusCode = 404; // Not Found = Não encontrada
    // Resposta para o usuário caso ele busque uma rota inexistente
    res.end(JSON.stringify({
        mensagem:  'Página não encontrada'
    }));
});

// Definição da porta onde o servidor rodará

const PORT = process.env.PORT || 3000;

server.listen(PORT, () =>{
    console.log('Servidor rodando na porta ${PORT}');
});