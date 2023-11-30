//This file has all controllers zy middlwares
const Tour = require('../models/tourModel');
const APIFeatures = require('./utils/apiFeatures');
//da alias lw 3ayz akhly url mo3yan bytl3 the best 5 tours
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};
// const tours = JSON.parse(
//   //JSON.parse y3ne 7wel el json l JS object 3ady
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

//dy middleware bt-check el body bta3 el post method, if it has
//a name and price or not
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'missing name or price',
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  //ana dlwa2ty b-2olo get this API w feh e3mel kda>
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;
    res.status(200).json({
      //status 200 y3ne success
      //lazem .json 3shan kol 7aga benhom b json
      //response y3ne rod 3lya b el klam da

      //da (jsend) format byt3ml kda
      status: 'success',
      results: tours.length,
      requested: req.requestTime, //el middleware elly 3mltaha fo2
      data: {
        tours,
        //now tours elly t7t dy hya el data elle gwa el file elly fo2 khales
        //w khaly balak ana mkhleha JS object 3ady(parse elly 3mltaha fo2)
        //tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    //b-get query from DB,,
    //findById dy btgeb mn el db el ID da
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
  //ma3na (:id) da en da variable,, momken yb2a ay 7aga
  //w ma3na (:x?) en da optional momken yb2a mawgod w momken l2
  //console.log(req.params); //params dy m3naha kol el parameters el variable f-el url

  //now ana 3ayz a2olo hat el data bta3t el id elly gebto da, h3mk kda b find
  //el awel h7wel el id da int 3shan hwa string>
  //const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);

  // // now tour dy gwaha elly 3ayzo

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};
//el fn elly gaya hkhleha async 3shan create elly gwaha bt-return promise

exports.createTour = async (req, res) => {
  try {
    //el line elly gay da b3ml document f el DB, w 7aga brdo en
    //Tour.create bt-return promise 3shan kda 3mlt async w await
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      //status 201 y3ne created
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: ' fail',
      message: 'Invalid data sent',
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // el line da m3nah: return the new updated document
      runValidators: true,
    });
    res.status(200).json({
      status: 'Updated',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: ' fail',
      message: 'Invalid data sent',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      //status 204 m3nah no content(deleted)
      status: 'Updated',
      data: tour,
    });
  } catch (err) {
    res.status(400).json({
      status: ' fail',
      message: 'Invalid data sent',
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    //Aggregation pipeline dy 7aga gwa MongoDB bt3ml shwayt 7agat (calculations)
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          //group by difficulty and write it in uppercase
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 }, //1 for ascending
      },
      //el sort w group w match dol esmohom stages
    ]);
    res.status(200).json({
      status: 'Updated',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: ' fail',
      message: 'Invalid data sent',
    });
  }
};
exports.getMonthlyPlan = async (req, res) => {
  //how many tours for each month in a given year
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        //unwind stage dy bt3ml lw fy maslan name l tour w gwa el tour
        // dy feh kaza start date maslan, hya bt3ml
        //document l kol start date
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          //$month w gte w lt w gt dol esmohom aggregation pipeline opertors
          numToursStarts: { $sum: 1 }, //count them
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' }, //add new field leh nfs el value of
        // _id and name it month
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numToursStarts: -1 }, //decending order
      },
      {
        $limit: 12,
      },
    ]);

    res.status(200).json({
      status: 'Updated',
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: ' fail',
      message: 'Invalid data sent',
    });
  }
};
