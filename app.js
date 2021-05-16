var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.set('view engine', 'ejs');

app.use( express.static( "public" ) );




app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

//const url ='mongodb+srv://Ishika:ishika123@cluster0.ueoqm.mongodb.net/calculator?retryWrites=true&w=majority'
//mongoose.connect('mongodb+srv://ishika:ishika123@cluster0.ueoqm.mongodb.net/calculator?retryWrites=true&w=majority', {useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connect('mongodb+srv://Ishika:ishika123@cluster0.ueoqm.mongodb.net/calculator', {useNewUrlParser:true,useUnifiedTopology:true});

const calculatorSchema={
  name:String,
  // ans: Number
};

const Calculator = mongoose.model("Calculator",calculatorSchema);

//We stored this introduction heading in mongoDB database

const calculator1=new Calculator({
  name:"Welcome to our Calculator"
});
const calculator2=new Calculator({
  name:"It perform different calculations"
});





const defaultItems=[calculator1,calculator2];

const listSchema={
  name:String,
  items:[calculatorSchema],
}
const List=mongoose.model("List",listSchema);

app.get('/', function(req, res) {
  Calculator.find({},function(err,foundItems){
    if(foundItems.length === 0){
        Calculator.insertMany(defaultItems,function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Successfull saved default items to DB ");
        }
      });
      res.redirect("/");
    }else{
      res.render('page/index', {newListItems: foundItems});
      //res.render("list", {listTitle: "Today", newListItems: foundItems});
    }  
  });
 
});


let port = process.env.PORT;
if(port == null || port == ""){
  port=3000;
}
app.listen(port, function() {
  console.log("app has started successfully");
});

