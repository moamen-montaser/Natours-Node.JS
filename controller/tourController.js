//This file has all controllers zy middlwares
const Tour = require('../models/tourModel');

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
    //hat kol elly f el DB
    const tours = await Tour.find();

    res.status(200).json({
      //status 200 y3ne success
      //lazem .json 3shan kol 7aga benhom b json
      //response y3ne rod 3lya b el klam da

      //da (jsend) format byt3ml kda
      status: 'success',
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
