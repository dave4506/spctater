'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import request from 'request'

import facebookWebhook from './webhook/facebookWebhook'

const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', (req, res)=>{
    res.send('Hello world, I am a chat bot')
})

// Facebook webhook router
app.use('/webhook',facebookWebhook)

// Spin up the server
app.listen(app.get('port'),()=>{
    console.log('running on port', app.get('port'))
})
