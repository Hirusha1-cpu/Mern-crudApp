const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies
app.use(cors());

const DB_URL = "mongodb+srv://Hirusha_Fernando:hN2MY6wIvZnfxE1T@cluster0.nwko1gt.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(DB_URL, 
    { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    }).then(()=>{
        console.log('connected successfully');
    }).catch((error)=>{
        console.log(error);
    })
//db schema and model
const postSchema = mongoose.Schema({
    title:String,
    description:String,
})

const Post = mongoose.model('Post', postSchema);


app.get('/', (req, res) => {
  res.send('Express is here');
});

app.post('/create', (req, res) => {
 Post.create({
    title:req.body.title,
    description:req.body.description
 }).then((doc)=> console.log(doc))
 .catch(err=> console.log(err))
});

app.get('/posts', (req, res) => {
    Post.find()
      .then(items => res.json(items))
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  });

app.delete('/delete/:id', (req, res) => {
    Post.findByIdAndRemove({_id:req.params.id}).then(doc =>console.log(doc))
    .catch(err => {
        console.log(err);
        
      });
   
}) 
app.put('/update/:id', (req, res) => {
    const postId = req.params.id;
    const { title, description } = req.body;
    Post.findByIdAndUpdate(postId, { title, description })
      .then((doc) => {
        console.log('Post updated:', doc);
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('Error updating post:', err);
        res.sendStatus(500);
      });
  });

// app.put('/update/:id', (req, res) => {
//     console.log(req.params);
//     console.log(req.body);
//     Post.findByIdAndUpdate({_id:req.params.id},{
//         title: req.body.title,
//         description: req.body.description
//     }).then(doc =>console.log(doc))
//     .catch(err => {
//         console.log(err);
        
//       });
// })
const port = 8077;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
