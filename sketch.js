var bg;
var boyimg,boyrunning,boy,boycollided;
var tiger,tigerObs,fox,foxObs, foxC,tigerC,plantCollided;
var plant,plantObs,plantObsgroup;
var tigerObsgroup,foxObsgroup;
var gameState = "play";
var score = 0;
var invisiblegrd;


function preload(){
bg = loadImage("background4.jpg");
boyimg = loadAnimation("boy1.png");
boyrunning = loadAnimation("boy1.png","boy2.png","boy3.png");
boycollided = loadAnimation("boy2.png");
tiger= loadAnimation("tiger1.png","tiger2.png","tiger3.png");
tigerC = loadAnimation("tiger1.png");
fox = loadAnimation("fox1.png","fox2.png","fox3.png");
foxC = loadAnimation("fox1.png");
plant = loadAnimation("plant2.png","plant3.png");
plantCollided = loadAnimation("plant1.png");
//adding gameover image
gameoverImg = loadImage("gameOver.png");
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  ground = createSprite(windowWidth/2,windowHeight/2,width*2,height*2);
  ground.addImage(bg);
  ground.scale = 3.0;
  ground.velocityX = -2;

  boy = createSprite(110, height-250, 50, 60);
  boy.scale = 0.6;
  boy.addAnimation("running",boyrunning);
  boy.addAnimation("collided",boycollided);
  //boy.debug = true;
  boy.setCollider("rectangle",0,0,30,boy.height);

  plantObsgroup= new Group();
  tigerObsgroup= new Group();
  foxObsgroup = new Group();
  invisiblegrd = createSprite(windowWidth/2,height-140,width*2,3);
  invisiblegrd.visible = false;

  //creating gameover
  gameover = createSprite(750,350);
  gameover.addImage(gameoverImg);
  gameover.scale = 1;
  gameover.visible = false;
}

function draw() {
  background("black"); 
  drawSprites();
  boy.collide(invisiblegrd);

  if(gameState==="play"){
    ground.velocityX = -(8+ score/500);

    if(ground.x<0){
      ground.x = windowWidth/2;
    }
    
    if(keyDown("space")){
      boy.velocityY = -10;
      
    }
    boy.velocityY = boy.velocityY + 1;
    score = score+ Math.round(getFrameRate()/60);
    
    //creating continous obstacles
    var select_obs = Math.round(random(1,3));  
    if(World.frameCount % 180 == 0)
     {
        if(select_obs == 1) {
          tiger1();
        } else if (select_obs == 2) {
          plant1();
        } else {
          fox1();
        }
      }   
   
      if(tigerObsgroup.isTouching(boy)){
        gameState = "end";
        tigerObs.addAnimation("tigerr", tigerC);
      } 
      if(plantObsgroup.isTouching(boy)){
        gameState = "end";
        plantObs.addAnimation("plantt", plantCollided);
      }   

      if(foxObsgroup.isTouching(boy)){
        foxObs.addAnimation("foxx", foxC);
        gameState = "end";
      }
   
}
else if (gameState === "end") {
  gameover.visible = true;
  textSize(40);
  fill(255);
  text("Press 'R' to Restart the game!", 480,450);
  
  //set velcity of each game object to 0
  ground.velocityX = 0;
  boy.velocityY = 0;

  tigerObsgroup.setVelocityXEach(0);
  foxObsgroup.setVelocityXEach(0);
  plantObsgroup.setVelocityXEach(0);

  //change the trex animation
  boy.changeAnimation("collided",boycollided);
  
  //set lifetime of the game objects so that they are never destroyed
  tigerObsgroup.setLifetimeEach(-1);
  foxObsgroup.setLifetimeEach(-1);
  plantObsgroup.setLifetimeEach(-1);
 
  if(keyDown("R")) {
    reset();
  }
}
 
 
  textSize(40);
  fill("white");
  text("SCORE : "+score,300,60);

}
function tiger1(){
  
    tigerObs = createSprite(1500,height-170,20,10);
    tigerObs.scale=0.5;
    tigerObs.addAnimation("tigerr", tiger);
    //tigerObs.addAnimation("tigerC", tigerC);
    
    tigerObs.velocityX = -10;
    tigerObs.lifetime= windowWidth/2;
    tigerObsgroup.add(tigerObs);
  }
  
  function plant1(){
    plantObs = createSprite(1500,height-170,20,10);
    plantObs.scale=0.5;
    plantObs.addAnimation("plantt", plant);
    //plantObs.addAnimation("plantC", plantCollided);
    
    plantObs.velocityX = -10;
    plantObs.lifetime= windowWidth/2;
    plantObsgroup.add(plantObs);
  }

  function fox1(){
    foxObs = createSprite(1500,height-170,20,10);
    foxObs.addAnimation("foxx",fox);
    //foxObs.addAnimation("foxx", foxC);
    foxObs.scale=1.5;
    foxObs.velocityX = -10;
    foxObs.lifetime= windowWidth/2;
    foxObsgroup.add(foxObs);
  }
  
  function reset(){
    gameState = "play";
    gameover.visible = false;
    tigerObsgroup.destroyEach();
    foxObsgroup.destroyEach();
    plantObsgroup.destroyEach();
    
    boy.changeAnimation("running",boyrunning);
    score = 0;    
  }