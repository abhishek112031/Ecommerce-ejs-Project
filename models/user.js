const mongodb=require('mongodb');
const getdb=require('../util/database').getdb;

class User{
  constructor(name,email){
    this.name=name;
    this.email=email;
  }

  save(){
    const db=getdb();

    return db.collection('users').insertOne(this)
    .then(result=>{
      console.log('user--->',result)
    })
    .catch(err=>{
      console.log(err);
    })
  }

  static findUserbyID(userId){
    const db=getdb();

    return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)})
    .then(user=>{
      console.log('single user=>',user);
      return user;
    }).catch(err=>{
      console.log(err)
    })

  }
}

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });

module.exports = User;
