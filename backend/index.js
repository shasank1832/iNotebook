const mongoConnection=require('./db');
const express = require('express')
const app = express()
const port = 5005

mongoConnection();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//inorder to use req.body we have to usemiddleware

app.use(express.json());


//availaible routes
app.use('/api/auth',require('./routes/auth.js'));
app.use('/api/notes',require('./routes/notes.js'));


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})