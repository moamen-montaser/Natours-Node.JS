const express = require('express');

const routeController = require('./../controller/tourController');

const router = express.Router();

//h2olo el route da lw get e3ml kaza, wlw post e3ml kaza
//momken a3melha step by step zy=> {app.post('/api/v1/tours', createTour);}
//w wa7da lel get
router
  .route('/')
  .get(routeController.getAllTours)
  .post(routeController.createTour);

//wa7da tanya lel route el tany
router
  .route('/:id')
  .get(routeController.getTour)
  .patch(routeController.updateTour)
  .delete(routeController.deleteTour);

module.exports = router;
