/**
 * Módulo que contém as funções de controle para o recurso de fornecedores.
 * @module fornecedorController
 */

const fornecedorModel = require('../models/fornecedor');

const fornecedorController = {
  getfornecedores: async (req, res) => {
    try {
      const fornecedores = await fornecedorModel.getfornecedores();
      res.json(fornecedores);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
  getfornecedorById: async (req, res) => {
    const { id } = req.params;
    try {
      const fornecedor = await fornecedorModel.getfornecedorById(id);
      if (!fornecedor) {
        return res.status(404).send('fornecedor não encontrado');
      }
      res.json(fornecedor);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
  createfornecedor: async (req, res) => {
    const fornecedorData = req.body;
    try {
      const fornecedor = await fornecedorModel.createfornecedor(fornecedorData);
      res.status(201).json(fornecedor);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
  updatefornecedor: async (req, res) => {
    const { id } = req.params;
    const fornecedorData = req.body;
    try {
      const fornecedor = await fornecedorModel.getfornecedorById(id);
      if (!fornecedor) {
        return res.status(404).send('fornecedor não encontrado');
      }
      const updatedfornecedor = await fornecedorModel.updatefornecedor(id, fornecedorData);
      res.json(updatedfornecedor);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
  deletefornecedor: async (req, res) => {
    const { id } = req.params;
    try {
      const fornecedor = await fornecedorModel.getfornecedorById(id);
      if (!fornecedor) {
        return res.status(404).send('fornecedor não encontrado');
      }
      const deletedfornecedor = await fornecedorModel.deletefornecedor(id);
      res.status(204).json(deletedfornecedor);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = fornecedorController;
