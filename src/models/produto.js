/**
 * Classe que representa um produto.
 * @class
 * @classdesc Um produto com ID, descrição, valor e marca.
 * @param {number} id - O ID do produto.
 * @param {string} descricao - A descrição do produto.
 * @param {number} valor - O valor do produto.
 * @param {string} marca - A marca do produto.
 */
class Produto {
    constructor(id, descricao, valor, marca) {
        this.id = id;
        this.descricao = descricao;
        this.valor = valor;
        this.marca = marca;
    }
}

/**
 * Objeto contendo a lista de produtos.
 * @typedef {Object} ListaProdutos
 * @property {Array<Produto>} produtos - Array de produtos.
 */

/**
 * Objeto que representa uma lista de produtos.
 * @type {ListaProdutos}
 */
const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João" },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans" },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé" },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps" },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé" },
    ]
};

module.exports = {
    Produto,
    lista_produtos,
};