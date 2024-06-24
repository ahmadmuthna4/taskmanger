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

module.exports={
    registerUser,
}