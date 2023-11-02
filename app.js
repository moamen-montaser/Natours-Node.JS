const fs = require('fs');
const express = require('express');

const app = express(); //3mltlha call 3shan hya fn w bkda ana a2dar a-use el methods
const controller = require('./controller/usersController');
const morgan = require('morgan'); //3rd-party middleware

app.use(morgan('dev')); //dy middleware bt-console some info about the req
//such as http method and the route and the status code.

app.use(express.json()); //7aga esmaha middleware 3shan req.body elly f POST

//Now ana h3ml middleware bnfsy, w hya 7aga ben el req wel res,, w fel aglab
//btkon related b-el-request
//3shan a3melha app.use(req,res,next) => {}
//w ana h3mlha now 3shan adef lel request (request-time), w dy prop gdeda ana h3mlha
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //h3mlha call f awel get method
  next(); //lazem akher el fn a3ml next();
});

//Ana h-read el file el awel
const tours = JSON.parse(
  //JSON.parse y3ne 7wel el json l JS object 3ady
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//awel get method way-2
app.get('/api/v1/tours', (req, res) => {
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
});

// 3ayz a2olo hat el object elly el id bta3o maslan b 5
// f ana hb3t el id da m3 el url b7es a2olo maslan hat el id 5>
app.get('/api/v1/tours/:id/:x?', (req, res) => {
  //ma3na (:id) da en da variable,, momken yb2a ay 7aga
  //w ma3na (:x?) en da optional momken yb2a mawgod w momken l2
  console.log(req.params); //params dy m3naha kol el parameters el variable f-el url

  //now ana 3ayz a2olo hat el data bta3t el id elly gebto da, h3mk kda b find
  //el awel h7wel el id da int 3shan hwa string>
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  //h2olo lw el id ghalat (tour not found) tl3 error
  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      mess: 'invalid id',
    });
  }
  // now tour dy gwaha elly 3ayzo

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

//Post y3ne create new 7aga.
//w khaly balak nfs el url bta3 get, far2 da get w da post
app.post('/api/v1/tours', (req, res) => {
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
});

//now h3ml patch, w dy hya enny b edit prorerty f el json
//el far2 benha w ben put en put bt-update the whole json, patch bt-edit 7aga wa7da
//hwa msh hy3ml edit bgd la2eno by2ol wa2t 3al fady bs y3ne hwa
//lazem y read el file w edit 3leh w y-write el file tany
app.patch('/api/v1/tours/:id', (req, res) => {
  res.status(200).json({
    status: 'Updated',
    data: {
      tour: '<updated here>',
    },
  });
});

//h3ml delete now, w dy bardo msh h3del f el file nafso, ana hgrab bs
//bs hya fe el 7a2e2a msh ht-delete 3shan lazem a-read w a-write file
app.delete('/api/v1/tours/:id', (req, res) => {
  res.status(204).json({
    //status 204 m3nah no content(deleted)
    status: 'Updated',
    data: {
      //khaly balak b3ml null hena
      tour: null,
    },
  });
});

//1* way to make route handeler fn>
app
  .route('/api/v1/users')
  .get(controller.getAllUsers)
  .post(controller.createUser);
//Now h3mel 7agat f user wa7ed bs(hdelo id w y3mel el method)
app
  .route('/api/v1/users/:id')
  .get(controller.getUser)
  .patch(controller.updateUser)
  .delete(controller.deleteUser);

//h3ml export l app elly hwa express 3shan afsel el server lwa7do
//el server da elly hwa listen w DB lw feh
module.exports = app;
