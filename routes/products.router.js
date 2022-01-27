const { response } = require('express');
const express = require ('express');
const faker = require ('faker');

const  ProductServices=  require('./../services/product.service');

const router  =  express.Router();
const service = new ProductServices();

router.get( '/', async (req,res) => {
  const products = await service.find();
  res.json(products)
});

router.get( '/:id', async (req,res) => {
  const { id } = req.params;
  const product = await service.findOne(id)
  res.json(product);
})

router.post('/' , async (req,res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);

});
router.patch('/:id' , async (req,res) => {

  try{
    const {id} = req.params;
    const body = req.body;
    const updateProduct = await service.update(id,body);
    res.json(updateProduct)

  }catch (error) {
    res.status(404).json({
      message : error.message
    });
  }


});

router.delete('/:id' , async (req,res) => {
  const {id} = req.params;
  const deleteProduct = await service.update(id);
  res.json(deleteProduct);
});

module.exports = router ;
