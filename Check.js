const express = require('express');

const app = express(); //3mltlha call 3shan hya fn w bkda ana a2dar a-use el methods

//bdeha el route w callback fn
app.get('/', (req, res) => {
  res.status(200).send('Hello from server'); //momken bdl send ato7 json w adeh object
});

//momken a3ml bardo post
app.post('/', (req, res) => {
  res.send('You can post to this endpoint');
});
const port = 3000; //3sahn a7oto f el listen

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
