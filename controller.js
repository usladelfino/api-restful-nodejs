const lista_produtos = require('./server').lista_produtos;

exports.getProdutos = (req, res) => {
    res.json(lista_produtos.produtos);
};

exports.getProdutoById = (req, res) => {
    const produto = lista_produtos.produtos.find(p => p.id === parseInt(req.params.id));
    if (!produto) {
        return res.status(404).send('Produto não encontrado');
    }
    res.json(produto);
};

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

exports.deleteProduto = (req, res) => {
    const index = lista_produtos.produtos.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('Produto não encontrado');
    }
    lista_produtos.produtos.splice(index, 1);
    res.json(lista_produtos.produtos);
};