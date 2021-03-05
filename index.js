const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/testDB", { useNewUrlParser: true, useUnifiedTopology: true })

const testSchema = {
    chemicals: Array,
    symbols: Array
}

const resultSchema = {
    result: Array
}

const Test = mongoose.model("Test", testSchema)
const Result = mongoose.model("Result", resultSchema)

app.route("/find_symbols_in_names")

.post(function(req, res) {

    // const newData = new Test({
    //     chemicals: req.body.chemicals,
    //     symbols: req.body.symbols
    // })

    const newData = new Test({
        chemicals: ['Amazon', 'Microsoft', 'Google'],
        symbols: ['I', 'Am', 'cro', 'Na', 'le', 'abc']
    })

    newData.save(function(err) {
        if(!err) {
            res.send("Successfully added new document")
        } else {
            res.send(err)
        }
    })
})
.get(function(req, res) {

    Test.find({}, function(err, foundTests) {
        if(foundTests){

          let arrayWithBrackets = []

		        for(let test in foundTests) {

              const addBrackets = (chemicals, symbols) => { 
                let res = []
                for(let i in chemicals) {
                  for(let j in symbols) {
                    if(chemicals[i].includes(symbols[j])) {
                      let temp = chemicals[i].replace(symbols[j], "[" + symbols[j] + "]")
                      res.push(temp)
                    }
                  }
                }
                return res
              }

              const eachArrayWithBrackets = addBrackets(foundTests[test].chemicals, foundTests[test].symbols)
              arrayWithBrackets.push(eachArrayWithBrackets)
            }

            const resultData = new Result({
              result: arrayWithBrackets
            })

            res.send(resultData)

        } else {
            res.send(err)
        }
    })
})

app.listen(3000, function() {
    console.log("Server started at port 3000.");
})
