var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swag-shop');


var Product = require('./model/product');
var WishList = require('./model/wishlist');
const wishlist = require('./model/wishlist');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post('/product', function(req, res){
    var product = new Product(req.body);

    product.save(function(err, saveProduct){
        if(err){
            res.status(500).send({error:"Could not save product"});
        }else{
            res.send(saveProduct[0]);
            
        }
    })
});

app.get('/allproducts', function(req, res){
    Product.find({}, function(err, products){
        if(err){
            res.status().send({error:"Could not fetch Products"})
        }else{
            res.send(products);
        }

    });
    
});

app.get('/listofwishlist', function(req, res){
    wishlist.find({}).populate({path: 'products', model: 'Product'}).exec(function(err, wishlists){
        if(err){
            res.status(500).send({error:"Could not create a wishlist"});
        }else{
            res.send(wishlists);
        }

    });
});

app.post('/newwishlist', function(req, res){
    var wishlist = new WishList(req.body);

    wishlist.save(function(err, newwishlist){
        if(err){
            res.status(500).send({error:"Could not create a new wishlist"});
        }else{
            res.send(newwishlist);
        }
    });


});


app.put('/wishlist/prod/add', function(req, res){
    Product.findOne({_id: req.body.productId}, function(err, product){
        if(err){
            res.status(500).send({error:"Could not add item to wishlist"});
        }else{
            WishList.update({_id: req.body.wishlistId}, {$addToSet: {products: product._id}}, function(err, wishlist){
                if(err){
                    res.status(500).send({error:"Could not add item to wishlist"});
                }else{

                    res.send(wishlist);

                }
            });
        }
    });
});


app.listen(3000, function(){
    console.log("server run on port 2780");
});