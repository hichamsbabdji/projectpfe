import exprsse from "express"
import mysql from "mysql"
  const app = exprsse()


   const db = mysql.createConnection({
     host:"localhost",
     user:"root",
     password:"123456789",
      database:"test"
   })

   app.get("/" , (req,res)=>{
       res.json("hi")
   })

  app.listen(8800, ()=>{

     console.log("conect")
  })