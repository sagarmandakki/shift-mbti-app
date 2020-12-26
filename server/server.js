import Database from './db.js'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const port = 3001
 
app.use(cors())
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

const mysqlConfig = {
  host: 'localhost',
  user: 'user',
  password: 'user',
  database: 'shift'
}

const database = new Database(mysqlConfig)

app.get('/questions', (req, res) => {
  database.query('SELECT question FROM questions;')
    .then((rows) => res.send(rows))
    .catch((err) => res.send({err, success: false}))
})

app.post('/submit', (req, res) => {
  const {formValues, email: userEmail} = req.body
  let userId = ''

  const userQuery = 'INSERT INTO users (email) values ("'+ userEmail +'");'
  database.query(userQuery)
    .then(({insertId}) => {
      userId = insertId

     let sqlValuesString = formValues.reduce((accumulator, value) => {
        return accumulator + '(' + value[0] + ',' + value[1] + ','+ userId +'),'
      }, '')

      sqlValuesString = sqlValuesString.slice(0, -1) // remove trailing ','

      let query = 'INSERT INTO answers (question_id, answer, user_id) values '
      query += sqlValuesString

      return database.query(query)
    })
    .then(() => database.query('SELECT id, dimension, direction from questions;'))
    .then(questionScores => {
      const dimensionCount = {}
  
      const questionScoreMap = questionScores.reduce((accumulator, value) => {
        accumulator[value['id']] =  {dimension: value['dimension'], direction: value['direction']}

        if (!dimensionCount[value['dimension']]) {
          dimensionCount[value['dimension']] = 1
        } else {
          dimensionCount[value['dimension']] += 1
        }

        return accumulator
      }, {})

      let userScore = {}

      formValues.forEach(value => {
        const questionId = value[0]
        const answer = parseInt(value[1])

        const {dimension, direction} = questionScoreMap[questionId]
  
        if (!userScore[dimension]) {
          userScore[dimension] = 0
        }
  
        userScore[dimension] = direction === 1 ?  userScore[dimension] + answer : userScore[dimension] + (8 - answer)
      })

      userScore = Object.keys(userScore).reduce((accumulator, key) => {
        accumulator[key] = userScore[key]/dimensionCount[key]
        return accumulator
      }, {})

      return Promise.resolve(res.send({success: true, score: userScore}))
    })
    .catch(error => res.status(500).send(error))

})

app.get('*', (req, res) => {
  res.send('404')
})

app.listen(port, () => {
  console.log(`Shift app listening at http://localhost:${port}`)
})
