class Produto {
    constructor(id, descricao, valor, marca) {
        this.id = id;
        this.descricao = descricao;
        this.valor = valor;
        this.marca = marca;
    }
}

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