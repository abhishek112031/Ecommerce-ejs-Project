const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;


let _db;

const mongoConnect=(callback)=>{

  MongoClient.connect('mongodb+srv://abhishek112031:ecomdatabase@cluster0.ynvtbdb.mongodb.net/shop?retryWrites=true&w=majority').then(client=>{
    console.log('Connected!!');
    _db=client.db();
    callback();
  }).catch(err=>{
    console.log(err);
    throw err;
  });
}

const getdb=()=>{
  if(_db){
    return _db;
  }
  throw 'no db found!'
}


exports.mongoConnect=mongoConnect;
exports.getdb=getdb;
