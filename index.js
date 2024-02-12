const { log } = require("console");
const express = require("express");
const path = require("path"); // Uncomment this line
const app = express();
const port = 8081;
const { v4: uuidv4 } = require("uuid"); // uuid packge for generating new  unique number
const methodOverride = require('method-override');
// 02 encoding data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Use method-override for editng .. oatch,delete ...etc
app.use(methodOverride('_method'));

// 03 set engine and its path
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Use __dirname instead of _public

// 04 control your path or import your path
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  // {
  //   username: "Akshay",
  //   content: "i Love coding",
  //   id: uuidv4(),
  //   createdAt: new Date("Wed, 27 July 2016 13:30:00"),
  // },
  // {
  //   username: "gan",
  //   content: "i love Gun",
  //   id: uuidv4(),
  //   createdAt: new Date("Wed, 27 July 2016 13:30:00"),
  // },
];

// 05 check on the browser
app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

// app.get("/posts", (req, res) => {
  
// });

//  adding new posts
app.get("/posts/new", (req, res) => {
  res.render("newpost.ejs");
  // console.log(req.body);
});
// rendring new psot data
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  let date = new Date();
  createdAt=date;
  posts.push({ id, username, content,createdAt });
  res.redirect("/posts");
});

// see More ...
app.get("/posts/:id", (req, res) => {
  // res.render('seemore.ejs')
  let { id } = req.params;

  //  console.log(id);
  // res.send(`working properly ${id}`)
  let post = posts.find((p) => id === p.id);

  res.render("seemore.ejs", { post });
});

// patching data


app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  
   let post = posts.find((p) => id === p.id);
   let newContent = req.body.content;
  
   post.content=newContent;
   
    console.log(`patch requiesting eorking successfully`);
   res.redirect('/posts')
});


app.get('/posts/:id/edit',(req,res)=>{
  let {id}=req.params;
  
  res.render('edit.ejs',{post})
  
})

// delete data

app.delete('/posts/:id',(req,res)=>{
  let {id}= req.params;
  posts= posts.filter((p)=> id!==p.id);
  res.redirect('/posts')
})























// app.all('/*',(req,res)=>{
//   return res.send ("page not found")
// })








// 01 server listening
app.listen(port, () => {
  console.log(`server is listening on port http://localhost:${port}`);
});
