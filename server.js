const mongoose = require('mongoose');
const dotenv = require('dotenv'); //enviroment
dotenv.config({ path: './config.env' }); //mkan el file bta3 el enviroment

const app = require('./app');
console.log(process.env);

//connect the DB
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    //dol mfhomsh fehm, homa bytrz3o kda
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successed');
  });

const port = process.env.PORT || 3000; //3sahn a7oto f el listen

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
