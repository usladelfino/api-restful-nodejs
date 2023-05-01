const express = require('express');
const app = express();
const produtoRoutes = require('./routes/produtoRoutes');

app.use('/produtos', produtoRoutes);

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor iniciado na porta ${PORT}`);
    });
}

module.exports = app;