const express = require("express");
const mongoose = require("mongoose");

const Article = require('./models/article')

const app = express();
const articleRouter = require("./routes/articles");

const methodOverride = require('method-override')
mongoose.connect('mongodb+srv://wiki:season123@cluster0.u7a5kq7.mongodb.net/blog-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc'} )
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);


app.listen(5200);
