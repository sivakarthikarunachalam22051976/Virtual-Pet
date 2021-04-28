var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood, feed_Dog;
var feedTime;
var foodObj;
var milkImg, milk;
var database;

//create feed and lastFed variable here
var lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
milkImg = loadImage("Milk.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  milk = createSprite(1010,465,10,10);
  milk.addImage(milkImg);
  milk.scale = 0.07;

  
  feedTime = database.ref('feedTime')
  feedTime.on("value",function(data){
  lastFed = data.val();
  })
  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed_Dog=createButton("Feed Dog");
  feed_Dog.position(900,95);
  feed_Dog.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  foodObj.getFoodStock();
 
  //write code to display text lastFed time here
  fill("white");
  textSize(20);
  if(lastFed >= 12){
    text("Last Fed : " + lastFed % 12 + " PM", 10,20)
  } else if(lastFed == 0){
    text("Last Fed : 12 AM",10,20)
  } else{
    text("Last Fed : " + lastFed + " AM",10,20)
  }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
  //write code here to update food stock and last fed time
  function feedDog(){
    dog.addImage(happyDog);
    foodObj.deductFood(foodStock);
    database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime: hour()
    })
  }
//function to add food in stock
function addFoods(){
  dog.addImage(sadDog);
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}