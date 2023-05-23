const mongodb=require('mongodb');
const getdb=require('../util/database').getdb;
const ObjectId=mongodb.ObjectId;

class User{
  constructor(name,email,cart,id){
    this.name=name;
    this.email=email;
    this.cart=cart;//{items:[{},{},...{}]}
    this._id=id;
  }

  save(){
    const db=getdb();

    return db.collection('users').insertOne(this)
    // .then(user=>{
    //   // console.log('user--->',user);
    //   // return user;
    // })
    // .catch(err=>{
    //   console.log(err);
    // })
  }

  addToCart(product){
    const cartProductIndex=this.cart.items.findIndex(cp=>{
      return cp.productId.toString()===product._id.toString();

    });

    let newQuantity=1;
    let updatedCartItems=[...this.cart.items];
    if(cartProductIndex>=0){
      newQuantity=this.cart.items[cartProductIndex].quantity+1;
      updatedCartItems[cartProductIndex].quantity=newQuantity;
    }
    else{
      updatedCartItems.push({productId:new ObjectId(product._id),quantity:newQuantity})
    }

    const updatedCart={
      items:updatedCartItems
    };

    const db=getdb();
    return db.collection('users').updateOne({_id:new ObjectId(this._id)},
    {$set:{cart:updatedCart}});


  }

  getCart(){
    const db=getdb();
    const productIds=this.cart.items.map(i=>{
      return i.productId;
    });

    return db.collection('products').find({_id:{$in:productIds}})
    .toArray()
    .then(products=>{
      return products.map(p=>{
        return {...p,quantity:this.cart.items.find(i=>{
          return i.productId.toString()===p._id.toString()
        }).quantity
      };

      })
    })

  }

  deleteFromCart(productId){
    const updatedCartItems=this.cart.items.filter(item=>{
      return item.productId.toString() !==productId.toString()
    });
    const db=getdb();
    return db.collection('users').updateOne({_id:new ObjectId(this._id)},
    {$set:{cart:{items:updatedCartItems}}});
  }



  addOrder() {
    const db = getdb();
    return this.getCart()
      .then(products => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.name
          }
        };
        return db.collection('orders').insertOne(order);
      })
      .then(result => {
        this.cart = { items: [] };
        return db
          .collection('users')
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }



  getOrders(){
    const db=getdb();
    return db.collection('orders').find({'user._id':new ObjectId(this._id)}).toArray();

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
