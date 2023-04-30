/**

@typedef Produto
@property {number} id - O id do produto.
@property {string} descricao - A descrição do produto.
@property {number} valor - O valor do produto.
@property {string} marca - A marca do produto.
*/
const lista_produtos = require('./server').lista_produtos;



/**

Retorna todos os produtos da lista.
@function getProdutos
@param {Object} req - Objeto com a requisição HTTP.
@param {Object} res - Objeto com a resposta HTTP.
@returns {Object} - Lista com todos os produtos.
*/
exports.getProdutos = (req, res) => {
    res.json(lista_produtos.produtos);
};


/**

Retorna um produto específico com base no seu ID.
@function getProdutoById
@param {Object} req - Objeto com a requisição HTTP.
@param {Object} res - Objeto com a resposta HTTP.
@returns {Produto} - Produto encontrado.
*/
exports.getProdutoById = (req, res) => {
    const produto = lista_produtos.produtos.find(p => p.id === parseInt(req.params.id));
    if (!produto) {
        return res.status(404).send('Produto não encontrado');
    }
    res.json(produto);
};


/**

Cria um novo produto na lista de produtos.
@function createProduto
@param {Object} req - Objeto com a requisição HTTP.
@param {Object} res - Objeto com a resposta HTTP.
@returns {Produto} - Produto criado.
*/
exports.createProduto = (req, res) => {
    const produto = {
        id: lista_produtos.produtos.length + 1,
        descricao: req.body.descricao,
        valor: req.body.valor,
        marca: req.body.marca
    };
    lista_produtos.produtos.push(produto);
    res.json(produto);
};


/**

Atualiza as informações de um produto específico com base no seu ID.
@function updateProduto
@param {Object} req - Objeto com a requisição HTTP.
@param {Object} res - Objeto com a resposta HTTP.
@returns {Produto} - Produto atualizado.
*/
exports.updateProduto = (req, res) => {
    const produto = lista_produtos.produtos.find(p => p.id === parseInt(req.params.id));
    if (!produto) {
        return res.status(404).send('Produto não encontrado');
    }
    produto.descricao = req.body.descricao;
    produto.valor = req.body.valor;
    produto.marca = req.body.marca;
    res.json(produto);
};


/**

Deleta um produto específico com base no seu ID.
@function deleteProduto
@param {Object} req - Objeto com a requisição HTTP.
@param {Object} res - Objeto com a resposta HTTP.
@returns {Object} - Lista atualizada de produtos após a exclusão.
*/
exports.deleteProduto = (req, res) => {
    const index = lista_produtos.produtos.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('Produto não encontrado');
    }
    lista_produtos.produtos.splice(index, 1);
    res.json(lista_produtos.produtos);
};