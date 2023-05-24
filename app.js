const path = require('path');


const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');

const errorController = require('./controllers/error');

const mongoose=require('mongoose');
const User=require('./models/user');



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("646dacb9036eedb426c2d2f8")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));

 
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose.connect('mongodb+srv://abhishek112031:ecomdatabase@cluster0.ynvtbdb.mongodb.net/shop?retryWrites=true&w=majority').then(result=>{
  User.findOne().then(user=>{
    if(!user){

      const user=new User({
        name:'Abhishek Adhikary',
        email:'abhishek.112031@gmail.com',
        cart:{
          items:[]
        }
      });
      user.save();
    }
  })
  app.listen(3000);
})
.catch(err=>{
  console.log(err)
})

