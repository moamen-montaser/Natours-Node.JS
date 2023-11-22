//This file has all controllers zy middlwares
const fs = require('fs');

const tours = JSON.parse(
  //JSON.parse y3ne 7wel el json l JS object 3ady
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//dy middleware bt-check el id elly f el url w takmelt el klam
//da fy tourRoutes.js file
exports.checkID = (req, res, next, val) => {
  console.log(`tour id is ${val}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

//dy middleware bt-check el body bta3 el post method, if it has
//a name and price or not
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
  //ana dlwa2ty b-2olo get this API w feh e3mel kda>

  res.status(200).json({
    //status 200 y3ne success
    //lazem .json 3shan kol 7aga benhom b json
    //response y3ne rod 3lya b el klam da

    //da (jsend) format byt3ml kda
    status: 'success',
    requested: req.requestTime, //el middleware elly 3mltaha fo2
    data: {
      //now tours elly t7t dy hya el data elle gwa el file elly fo2 khales
      //w khaly balak ana mkhleha JS object 3ady(parse elly 3mltaha fo2)
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  //ma3na (:id) da en da variable,, momken yb2a ay 7aga
  //w ma3na (:x?) en da optional momken yb2a mawgod w momken l2
  console.log(req.params); //params dy m3naha kol el parameters el variable f-el url

  //now ana 3ayz a2olo hat el data bta3t el id elly gebto da, h3mk kda b find
  //el awel h7wel el id da int 3shan hwa string>
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // now tour dy gwaha elly 3ayzo

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
exports.createTour = (req, res) => {
  //el data gwa el req la2eny bb3t mn client to server f da req
  console.log(req.body); //el body elly hb3to mn postman

  // ana dlwa2ty 3ayz elly ab3to mn postman yro7 3la el file, akeny 3mlt add l 7aga
  //awel 7aga hdeha id
  const newID = tours[tours.length - 1].id + 1; //hat akher element w 2oly el id
  //w add 3leh wa7ed,, tours dy el gaya mn el file elly feh object

  //ana dlwa2ty 3ayz adef el id da l el object elly hb3to mn postman
  //elly by3ml kda w by-merge kaza object hwa Object.assign
  const newTour = Object.assign({ id: newID }, req.body);
  console.log(newTour); //3shan tshofha

  tours.push(newTour); // push this new tour(elly b3to mn postman) to tours object

  //dlwa2ty 3ayz aktebhom f file gded>
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // ana 3mlt writeFile el Asynch msh synch 3shan dy gwa callback fn f-msh
      //3ayzha t blcok el code

      //w 3mlt JSON.stringfy 3shan tours was JS object 3ady msh json
      res.status(201).json({
        //status 201 y3ne created
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'Updated',
    data: {
      tour: '<updated here>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    //status 204 m3nah no content(deleted)
    status: 'Updated',
    data: {
      //khaly balak b3ml null hena
      tour: null,
    },
  });
};
