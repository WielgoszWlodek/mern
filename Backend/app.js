const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/book-routes");
const routeruser = require("./routes/user-routes");
//const authRoute = require("./routes/auth");
//const userRoute = require("./routes/users");
const categoryRoute = require("./routes/categories");
const cors = require("cors");
const app = express();
const multer = require("multer");
const path = require("path");


app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });

// Middlewares


app.use(cors());
app.use("/books", router); // localhost:3000/books
app.use("/users", routeruser); 
//app.use("/auth", authRoute); 
//app.use("/users", userRoute);
app.use("/categories", categoryRoute);


mongoose.connect("mongodb+srv://admin:zgryz@cluster0.0klfrmh.mongodb.net/BookStore?retryWrites=true&w=majority"
).then(()=>console.log("Connected to database"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=>console.log(err));