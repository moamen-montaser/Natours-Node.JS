const express = require('express');

const tourController = require('./../controller/tourController');

const router = express.Router();

//h3ml middleware lel parameters elly fy el url
//w hya mlhash lazma awy now bs hnshof odam,, w hya btshtaghal f ay
//route feh param esmo id

//router.param('id', tourController.checkID);

//h2olo el route da lw get e3ml kaza, wlw post e3ml kaza
//momken a3melha step by step zy=> {app.post('/api/v1/tours', createTour);}
//w wa7da lel get
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

//wa7da tanya lel route el tany
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
