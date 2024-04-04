const express = require('express');
const tourContoller = require('./../controllers/tourController');

const router = express.Router();
// router.param('id', tourContoller.checkID);

router
  .route('/top-5-cheap')
  .get(tourContoller.aliasTopTours, tourContoller.getAllTours);

router.route('/tour-stats').get(tourContoller.getTourStats);
router.route('/').get(tourContoller.getAllTours).post(tourContoller.createTour);

router
  .route('/:id')
  .get(tourContoller.getTour)
  .patch(tourContoller.updateTour)
  .delete(tourContoller.deleteTour);

module.exports = router;
