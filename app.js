const express = require('express');

const app = express(); //3mltlha call 3shan hya fn w bkda ana a2dar a-use el methods
const controller = require('./controller/usersController');
const morgan = require('morgan'); //3rd-party middleware
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//if elly gaya dy enviroment variables
//dy zy shwaeyt rules aw config b3mlha lw ana maslan f dev
if (process.env.NODE_ENV === 'development') {
  console.log('Ay 8aga');
  app.use(morgan('dev')); //dy middleware bt-console some info about the req
  //such as http method and the route and the status code.
}

app.use(express.json()); //7aga esmaha middleware 3shan req.body elly f POST

//static dy middleware btkhlent a-access el files elly 3ndy
//w hena ana edeto folder public kolo, w 3shan a-access
//hkteb el root w b3deh el file 3la tol
//zy > http://127.0.0.1:3000/overview.html
app.use(express.static(`${__dirname}/public`));

//Now ana h3ml middleware bnfsy, w hya 7aga ben el req wel res,, w fel aglab
//btkon related b-el-request
//3shan a3melha app.use(req,res,next) => {}
//w ana h3mlha now 3shan adef lel request (request-time), w dy prop gdeda ana h3mlha
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //h3mlha call f awel get method
  next(); //lazem akher el fn a3ml next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//h3ml export l app elly hwa express 3shan afsel el server lwa7do
//el server da elly hwa listen w DB lw feh.
module.exports = app;
