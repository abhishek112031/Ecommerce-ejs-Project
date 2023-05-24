const path = require('path');


const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');

const errorController = require('./controllers/error');

const mongoose=require('mongoose');
// const mongoConnect=require('./util/database').mongoConnect;
// const User=require('./models/user')



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findUserbyID("646b5b4beabb0c2224c11dc8")
//     .then(user => {
//       req.user = new User(user.name,user.email,user.cart,user._id);
//       next();
//     })
//     .catch(err => console.log(err));

 
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose.connect('mongodb+srv://abhishek112031:ecomdatabase@cluster0.ynvtbdb.mongodb.net/shop?retryWrites=true&w=majority').then(result=>{
  app.listen(3000)
})
.catch(err=>{
  console.log(err)
})

