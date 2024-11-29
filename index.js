const express=require("express")
const dotenv=require("dotenv")
const path=require("path")

const app=express()
dotenv.config()


app.use(express.urlencoded({extended:true})) //for parsing the data

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))//

let posts=[
  {id:"1a",
    username:"Sangram",
    content:"Hello there"
  },
  {
    id:"2b",
    username:"Raju",
    content:"Small step to understand REST"
  },
  {
    id:"3c",
    username:"Shyan",
    content:"REST means representational state change"
  },
  {
    id:"4d",
    username:"Krishna",
    content:"Get,post,put,patch,delete"
  },
  {
    id:"5e",
    username:"Hari",
    content:"We will see all"
  },
];



const port=process.env.PORT

app.get("/posts",(req,res)=>{
  res.render("index.ejs",{posts})
})
app.get("/posts/new",(req,res)=>{
  res.render("new.ejs")
})

app.post("/posts",(req,res)=>{
  let{username,content}=req.body
  posts.push({username,content})
  res.redirect("/posts")
})

app.get("/posts/:id",(req,res)=>{
  let{id}=req.params;
  let post=posts.find((p)=>id===p.id)
  console.log(post)
  res.render("show.ejs",{post})
})

app.listen(port,()=>{
  console.log(`http://localhost:${port}`)
})
