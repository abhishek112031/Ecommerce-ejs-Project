const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');

const errorController = require('./controllers/error');

const mongoConnect=require('./util/database').mongoConnect;
const User=require('./models/user')



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findUserbyID("646b5b4beabb0c2224c11dc8")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));

  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);



mongoConnect(()=>{
  
  app.listen(3000);
})

