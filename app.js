const express =require("express")
var bodyParser = require('body-parser')
const bcrypt=require("bcrypt")
const {Client}=require("pg")
const registerUser=require("./controller/auth")

const app=express()

app.use(bodyParser.json())
let client=new Client({
    user:'postgres',
    host:'localhost',
    database:'taskmanger',
    password:12345,
    port:5432
})

app.post('/register',registerUser)
app.post('/login',loginUser)



Port=3000

app.listen(Port,()=>{
    console.log(`server is running on port ${Port }`)
})