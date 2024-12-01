const express=require("express")
const dotenv=require("dotenv")
const path=require("path")
const {v4:uuidv4}=require("uuid")
const methodOverride=require("method-override")

const app=express()
dotenv.config()


app.use(express.urlencoded({extended:true})) //for parsing the data
app.use(methodOverride("_method"))

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))//

let posts=[
  {id:uuidv4(),
    username:"Sangram",
    content:"Hello there"
  },
  {
    id:uuidv4(),
    username:"Raju",
    content:"Small step to understand REST"
  },
  {
    id:uuidv4(),
    username:"Shyan",
    content:"REST means representational state change"
  },
  {
    id:uuidv4(),
    username:"Krishna",
    content:"Get,post,put,patch,delete"
  },
  {
    id:uuidv4(),
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
  let id=uuidv4()
  let{username,content}=req.body
  posts.push({id,username,content})
  res.redirect("/posts")
})

app.get("/posts/:id",(req,res)=>{
  let{id}=req.params;
  let post=posts.find((p)=>id===p.id)
  console.log(post)
  res.render("show.ejs",{post})
})

app.patch("/posts/:id",(req,res)=>{
  let {id}=req.params;
  let newContent=req.body.content
  let post=posts.find((p)=>id===p.id)
  post.content=newContent
  console.log(id)
  res.redirect("/posts")
})
app.get("/posts/:id/edit",(req,res)=>{
  let {id}=req.params;
  let post=posts.find((p)=>id==p.id)
  res.render("edit.ejs",{post})
})

app.delete("/posts/:id",(req,res)=>{
  let{id}=req.params;
  posts=posts.filter((p)=>id!==p.id)
  res.redirect("/posts")
})

app.listen(port,()=>{
  console.log(`http://localhost:${port}`)
})
