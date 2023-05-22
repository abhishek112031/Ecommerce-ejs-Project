const getdb=require('../util/database').getdb; //allows us to connect with database;


class Product{
  constructor(title,price,imageUrl,description){
    this.title=title;
    this.price=price;
    this.imageUrl=imageUrl;
    this.description=description;
  }

  save(){

    const db=getdb();
    return db.collection('products')
    .insertOne(this)
    .then(result=>{
      console.log("---->",result);
    })
    .catch(err=>{
      console.log(err);
    })

  }
}


module.exports = Product;
