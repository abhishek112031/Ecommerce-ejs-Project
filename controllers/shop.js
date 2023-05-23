const Product = require('../models/product');
// const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
  Product.findbyId(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// exports.getCart = (req, res, next) => {

//   req.user.getCart()
//   .then(cart=>{
//     // console.log(cart)
//     return cart.getProducts();
//   })
//   .then(products=>{
//     res.render('shop/cart', {
//             path: '/cart',
//             pageTitle: 'Your Cart',
//             products: products
//           });

//   })
//   .catch(err=>{
//     console.log(err);
//   })

// };

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findbyId(prodId).then(product=>{
    return req.user.addToCart(product)
    .then(result=>{
      console.log(result);
    })
  })
  // let fetchedcart;
  // req.user.getCart()
  // .then(cart=>{
  //   fetchedcart=cart;
  //   return cart.getProducts({where:{id:prodId}})
  // })
  // .then(products=>{
  //   let product;
  //   if(products.length>0){
  //     product=products[0];
  //   }
  //   let newQty=1;
  //   if(product){
  //     const oldQty=product.cartItem.quantity;
  //     newQty=oldQty+1;
  //     return fetchedcart.addProduct(product,{through:{quantity:newQty}})
  //   }
  //   return Product.findByPk(prodId)
  //   .then(product=>{
  //     fetchedcart.addProduct(product,{through:{quantity:newQty}});

  //   })
  //   .catch(err=>{
  //     console.log(err);
  //   })
  // })
  // .then(()=>{
  //   res.redirect('/cart');
  // })
  // .catch(err=>{
  //   console.log(err)
  // })
  
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
req.user.getCart()
.then(cart=>{
  return cart.getProducts({where:{id:prodId}})
})
.then(products=>{
  const product=products[0];
 return product.cartItem.destroy();

})
.then((result)=>{
  res.redirect('/cart')
})
.catch(err=>{
  console.log(err)
})
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
