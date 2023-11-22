const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });
console.log(process.env);

const port = 3000; //3sahn a7oto f el listen

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
