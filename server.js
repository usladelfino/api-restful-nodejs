/**

@fileOverview Este módulo é responsável por gerenciar a API de produtos.
@module produtos
@requires express
@requires body-parser
*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João" },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans" },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé" },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps" },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé" },
    ]
};

/**

Retorna todos os produtos disponíveis.
@name getProdutos
@function
@memberof module:produtos
@inner
@param {Object} req - Objeto de requisição do Express.
@param {Object} res - Objeto de resposta do Express.
@returns {Array} - Um array de objetos de produtos.
*/
app.get('/produtos', (req, res) => {
    res.json(lista_produtos.produtos);
});
/**

Retorna um produto pelo seu ID.
@name getProdutoById
@function
@memberof module:produtos
@inner
@param {Object} req - Objeto de requisição do Express.
@param {Object} res - Objeto de resposta do Express.
@returns {Object} - Um objeto de produto.
@throws {string} - Retorna uma mensagem de erro caso o produto não seja encontrado.
*/
app.get('/produtos/:id', (req, res) => {
    const produto = lista_produtos.produtos.find(p => p.id === parseInt(req.params.id));
    if (!produto) {
        return res.status(404).send('Produto não encontrado');
    }
    res.json(produto);
});
/**

Cria um novo produto.
@name createProduto
@function
@memberof module:produtos
@inner
@param {Object} req - Objeto de requisição do Express.
@param {Object} res - Objeto de resposta do Express.
@returns {Object} - Um objeto de produto.
*/
app.post('/produtos', (req, res) => {
    const produto = {
        id: lista_produtos.produtos.length + 1,
        descricao: req.body.descricao,
        valor: req.body.valor,
        marca: req.body.marca
    };
    lista_produtos.produtos.push(produto);
    res.json(produto);
});
/**

Atualiza um produto pelo seu ID.
@name updateProdutoById
@function
@memberof module:produtos
@inner
@param {Object} req - Objeto de requisição do Express.
@param {Object} res - Objeto de resposta do Express.
@returns {Object} - Um objeto de produto atualizado.
@throws {string} - Retorna uma mensagem de erro caso o produto não seja encontrado.
*/
app.put('/produtos/:id', (req, res) => {
    const produto = lista_produtos.produtos.find(p => p.id === parseInt(req.params.id));
    if (!produto) {
        return res.status(404).send('Produto não encontrado');
    }
    produto.descricao = req.body.descricao;
    produto.valor = req.body.valor;
    produto.marca = req.body.marca;
    res.json(produto);
});

/**

Deleta um produto com o ID especificado.
@function
@memberof module:produtos
@name deleteProduto
@param {object} req - Objeto de requisição HTTP.
@param {object} res - Objeto de resposta HTTP.
@returns {string} - Mensagem de sucesso se o produto for removido com sucesso.
@throws {Error} - Retorna um erro se o ID do produto não for encontrado.
*/
app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = lista_produtos.produtos.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).send('Produto não encontrado');
    }
    lista_produtos.produtos.splice(index, 1);
    res.send(`Produto ${ id } removido com sucesso.`);
});

/**
 
Inicia o servidor da aplicação na porta definida na variável de ambiente "PORT" ou na porta 3000.
@function
@memberof module:produtos
@name startServer
@returns {void}
*/
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor iniciado na porta ${ PORT }`);
    });
}

module.exports = app;