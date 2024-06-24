var registerUser =async (req,res)=>{
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

var loginUser =async (req,res)=>{
    try {
        var {name ,password }=req.body;
       
        
        let sqlInsert="ISELECT id, name, password FROM users ;"
        
        let result =await client.query(sqlInsert)

        if (result.rowCont >0) {
            var user=result.row[0];
            var token=jwt.sign({id:user.id},"secretekey")
            res.json({message:"login succefuly ",token:token})
        } else {
            res.send("user not found ")
        }
        
        res.send("register succefully ( : ")

    } catch (error) {
        console.log(error)
        res.send(error)
    }

}

var createTask =async (req,res)=>{
    try {
        var {id ,title ,description,status }=req.body;
        var idUser=req.parser
       
        let hashPassword=await bcrypt.hash(password,10);
        
        let sqlInsert="INSERT INTO public.tasks2(id, status, description, title,idUser) VALUES ( $1 , $2 , $3,$4,$5);"
        let sqlData=[id ,status ,description,title,idUser ]
        
        let result =await client.query(sqlInsert,sqlData)
        
        res.send("create task  succefully ( : ")

    } catch (error) {
        console.log(error)
        res.send(error)
    }

}

var getallTask =async (req,res)=>{
    try {
        var {id ,title ,description,status }=req.body;
        var idUser=req.parser
       
        let hashPassword=await bcrypt.hash(password,10);
        
        let sqlInsert="SELECT * FROM tasks2;"
      
        
        let result =await client.query(sqlInsert)
        
        
        res.json({message:result})

    } catch (error) {
        console.log(error)
        res.send(error)
    }

}



module.exports={
    registerUser,
}