// Função responsável por buscar os pedidos na API e exibir na tela
function listarPedidos() {

    // Busca no HTML o elemento onde a lista será exibida
    const lista = document.getElementById("lista");

    // Limpa a lista antes de exibir os pedidos
    lista.innerHTML = "Carregando pedidos...";

    // Faz uma requisição GET para a API com a url dela publicada (ou local)
    fetch(xxxxxxxx)

    // Converte a resposta da API para JSON
    .then(res => res.json())

    // Vamos trabalhar com o resultado da API
    .then(resultado => {

        // Limpando a lista para preencher com os pedidos
        lista.innerHTML = "";

        // Percorrendo a array de pedidos recebido da API
        resultado.dados.forEach(pedido => {

            // Cria um item de lista para cada pedido
            const item = document.createElement("li");
            
            // Define como o texto será exibido na tela
            item.textContent = `${pedido.id} - ${pedido.cliente} | ${pedido.produto} | ${pedido.status}`;
        
            // Adiciona o item criado dentro da lista no HTML
            lista.appendChild(item);
        });
    })
    .catch(() => {
        lista.innerHTML = "Erro ao carregar pedidos"
    });
};

// Criar pedido (POST)
// Função responsável por cadastrar um novo pedido
function cadastrarPedido() {

    // Pega os valores digitados nos inputs do HTML e depois limpa
    const cliente = document.getElementById("cliente").value;
    const produto = document.getElementById("produto").value;

    // Envia uma requisição POST para a API
    fetch(xxxxxxxx, {
        method: "POST",
        // Informa que os dados enviados estão no formato JSON
        headers: {
            'Content-Type': "application/JSON"
        },

        // Converte o objeto JS em JSON para enviar no body
        body: JSON.stringify({
            id: Date.now(), // Incluir
            cliente: cliente,
            produto: produto,
            status: "Pendente"
        })
    })
    // Converte a resposta da API para JSON
    .then(res => res.json())

    // Depois que o pedido for cadastrado, atualiza a lista na tela
    .then(() => {
        document.getElementById("cliente").value = "";
        document.getElementById("produto").value = "";

        // Atualizando a lista na tela
        listarPedidos();
    })
    // Alerta o usuário caso não seja possível realizar o cadastro do pedido
    .catch(() => {
        alert("Erro ao cadastrar pedido");
    });
}

//Atualizar pedido (PUT)
// Função responsável por atualizar o status de um projeto
function atualizarPedido() {
    // Pega o id informado e força a ser um número
    const id = Number(document.getElementById("idAtualizar").value);

    // Pega o novo status do pedido digitado no input
    const status = document.getElementById("statusAtualizar").value

    // Envia uma requisição PUT para a API
    fetch(xxxxxxxx, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/JSON'
        },

        // Envia o ID e novo status do pedido
        body: JSON.stringify({
            id: id,
            status: status
        })
    })
    .then(res => res.json())

    // Depois que atualizar, buscará a lista novamente
    .then(() => {
        // Limpando os campos após o envio
        document.getElementById("idAtualizar").value = "";
        document.getElementById("statusAtualizar").value = "";

        // Reexibe a lista atualizada
        listarPedidos();

    })
    // Alerta caso não seja possível atualizar o pedido
    .catch(() => {
        alert("Erro ao editar pedido");
    });
}

// Removendo pedido
// Função respobsável por cancelar um pedido
function removerPedido() {
    // Pega o ID digitado
    const id = Number(document.getElementById("idRemover").value);

    fetch(xxxxxxxx, {
        method: "DELETE",
        headers: {
            'Content-Type': 'applicatin/JSON'
        },
        // Envia apenas o id do pedido que será removido
        body: JSON.stringify({
            id: id
        })
    })

    .then(res => res.json())
    .then(() => {
        document.getElementById("idRemover").value = "";
        listarPedidos();
    })
    .catch(() => {
        alert("Erro ao cancelar o pedido");
    });
}

// Chama afunção assim que a página carregar. Assim os pedidos já aparecem automaticamente na tela
listarPedidos();