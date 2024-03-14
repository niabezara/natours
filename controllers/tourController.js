const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`));

exports.checkID = (req, res, next, val) => {
  console.log(`tour id is ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'not valid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'missing name or price',
    });
  }
  next();
};
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    createAt: req.requestTime,
    data: {
      tours,
    },
  });
};
exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
exports.createTour = (req, res) => {
  const newId = tours.length + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/data/tours.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      body: {
        tour: newTour,
      },
    });
  });
};
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'update here',
  });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
