const express =require("express")
var bodyParser = require('body-parser')
const bcrypt=require("bcrypt")
const {Client}=require("pg")

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
async function registerUser(req,res){
    try {
        var {id ,name ,password }=req.body;
       
        let hashPassword=await bcrypt.hash(password,10);
        
        let sqlInsert="INSERT INTO users (id ,name ,password) VALUES ( $1 , $2 , $3) ;"
        let sqlData=[id ,name ,hashPassword]
        
        let result =await client.query(sqlInsert,sqlData)
        
        res.send("register succefully ( : ")

    } catch (error) {
        console.log(error)
        res.send(error)
    }

}


Port=3000

app.listen(Port,()=>{
    console.log(`server is running on port ${Port }`)
})