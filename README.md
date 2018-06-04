# Validate data schema on express.js

 
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Main idea
Validate the data that your REST API receive before processing it.

It will validate the `body`, `query` and `params` on the request.

## How to use it
### Install package
```
$ npm i -s shma-express
```
### Require and Start
```js
const Shma = require('shma-express')
const shma = new Shma()
```
### Create schma
The shma type can receive multiple types, those are:
+ `string`
+ `number`
+ `array`
+ `object`
+ `boolean`

```js
const shmaExample = {
  email: shma.string,
  age: shma.number
  visitedCities: shma.array,
  information: shma.object,
  isAdmin: shma.boolean
}
```
### Optional schma
If the schma includes `?` it will be optional

### Set the shma as middleware
Set the shma middleware on the route you want to validate before procesing the data.
```js
app.post('/example', validator.schema(shmaExample), (req, res) => {
  const { email, age, visitedCities, information, isAdmin } = req.body
  console.log(email)
  console.log(age)
  console.log(visitedCities)
  console.log(information)
  console.log(isAdmin)
  res.status(200).send('success')
})
```
### Responses
In case that is missing an argument that is defined on the Schma but it is not on the request
it will return:
```js
res.status(400).send('<MISSING_ARG> is missing')
```
In case that a parameter is with a different type, it will return:
```js
res.status(400).send('<WRONG_ARG> must by type of <TYPE_OF>')
```
### Example

```js
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Shma = require('shma-express')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({limit: '2mb', type: 'application/json'}))

const shma = new Shma()

const shmaExample = {
  email: shma.string,
  age: shma.number,
  visitedCities: shma.array,
  information: shma.object,
  isAdmin: shma.boolean
}

app.post('/example', shma.schema(shmaExample), (req, res) => {
  const { email, age, visitedCities, information } = req.body
  console.log(email)
  console.log(age)
  console.log(visitedCities)
  console.log(information)
  res.status(200).send('success')
})

app.listen(3000, () => {
  console.log(`running on port ${3000}`)
})
```
### Request
#### Success
```curl
curl -X POST \
  http://localhost:3000/example \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"email": "estrada9166@gmail.com",
	"age": 26,
	"visitedCities": ["MDE"],
	"information": {
		"github": "estrada9166"
	},
	"isAdmin": true
}'
```
Response
```
$ success
```
#### Missing argument
```curl
curl -X POST \
  http://localhost:3000/example \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"age": 26,
	"visitedCities": ["MDE"],
	"information": {
		"github": "estrada9166"
	},
	"isAdmin": true
}'
```
Response
```
$ email is missing
```
#### Invalid format
```curl
curl -X POST \
  http://localhost:3000/example \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"email": "estrada9166@gmail.com",
	"age": 26,
	"visitedCities": ["MDE"],
	"information": [{ "github": "estrada9166" }],
	"isAdmin": true
}'
```
Response
```
$ information must by type of object
```

## License
### The MIT License

Copyright (c) 2018 Alejandro Estrada

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.