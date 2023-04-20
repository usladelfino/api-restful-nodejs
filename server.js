const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
    ]
};

// GET /produtos
app.get('/produtos', (req, res) => {
    res.json(lista_produtos.produtos);
});

// GET /produtos/:id
app.get('/produtos/:id', (req, res) => {
    const produto = lista_produtos.produtos.find(p => p.id === parseInt(req.params.id));
    if (!produto) {
        return res.status(404).send('Produto não encontrado');
    }
    res.json(produto);
});

// POST /produtos
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

// PUT /produtos/:id
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

// DELETE /produtos/:id
app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = lista_produtos.produtos.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).send('Produto não encontrado');
    }
    lista_produtos.produtos.splice(index, 1);
    res.send(`Produto ${id} removido com sucesso.`);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});