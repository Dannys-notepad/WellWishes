const express = require('express')
const app = express()
const port = 5000

const writeData = require('./utils/writeData.js')
let db = require('./data.json')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/data', (req, res) => {
  res.json({db})
})

app.route('/sendwish').get((req, res) => {
  res.render('sendwish')
}).post(async (req, res) => {
  let { name, wish} = await req.body
  let dataSchema = {
    name,
    wish
  }
  let prepaidData = {...dataSchema}
  db.push(prepaidData)
  await writeData('./data.json', db)
  res.redirect('/')
})

app.listen(port, () => console.log(`Server up and running on port ${port}`))
