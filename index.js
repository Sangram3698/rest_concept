const express=require("express")
const dotenv=require("dotenv")
const path=require("path")

const app=express()
dotenv.config()


app.use(express.urlencoded({extended:true})) //for parsing the data

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.set(express.static(path.join(__dirname,"public")))



const port=process.env.PORT

app.get("/",(req,res)=>{
  res.status(200).send("Hello from rest!!")
})

app.listen(port,()=>{
  console.log(`http://localhost:${port}`)
})