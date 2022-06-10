var trex,imgTrex,imgTrexP;
var imgGround,ground,ground2;
var cloud,imgCloud;
var cactu;
var imgC1,imgC2,imgC3,imgC4,imgC5,imgC6;
var cactusG,cloudG;
var PLAYING = 1;
var OVER = 0;
var gameState = PLAYING;
var score = 0;
var gameOver,imgGameOver;
var btnReset,imgReset;

function preload(){
  imgTrex = loadAnimation("trex1.png","trex3.png","trex4.png");
  imgGround = loadImage("ground2.png");
  imgCloud = loadImage("nuvem.png");
  imgC1 = loadImage("cacto1.png");
  imgC2 = loadImage("cacto2.png");
  imgC3 = loadImage("cacto3.png");
  imgC4 = loadImage("cacto4.png");
  imgC5 = loadImage("cacto5.png");
  imgC6 = loadImage("cacto6.png");
  imgTrexP = loadImage("trex_parado.png");
  imgGameOver = loadImage("gameOver.png");
  imgReset = loadImage("reiniciar.png");

}
//inicializa var (executa somente 1 vez)
function setup(){
  createCanvas(windowWidth,windowHeight);

  //criando o trex
  trex = createSprite(50,height/2,20,50);
  trex.addAnimation("running", imgTrex);
  trex.addImage("pause", imgTrexP);
  trex.scale = 0.5;
  //trex.debug = true;
  trex.setCollider("circle",0,0,40);

  //cria o chão
  ground = createSprite(200,height -60,400,20); 
  ground.addImage("ground",imgGround);

  ground2 = createSprite(200, height -50 , 400, 10)
  ground2.visible = false;
  
  //criando grupos
  cactusG = new Group();
  cloudG = new Group();

  gameOver = createSprite(width/2,height/2 -50);
  gameOver.addImage(imgGameOver);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  btnReset = createSprite(width/2,height/2);
  btnReset.addImage(imgReset);
  btnReset.scale = 0.6;
  btnReset.visible = false;
}


function draw(){
  //definir a cor do plano de fundo 
  background(200);

  text("points: " + score,width -130,30);
  
  if (gameState === PLAYING){
  
    score = score + Math.round(getFrameRate()/50);

    ground.velocityX = -4;
  
    if(ground.x < 200){
      ground.x = ground.width/2;
    }

    if(touches.length > 0 || keyDown("space") && trex.y >= height/2 +300){
      trex.velocityY = -10;
      touches = [];
    }
    
    trex.velocityY = trex.velocityY + 0.5;

    createClouds();

    createCactus();
    
    if(cactusG.isTouching(trex)){
      
      gameState = OVER;
    }
  }
  else if(gameState === OVER){
    ground.velocityX = 0;
    
    trex.velocityY = 0;
    
    cloudG.setVelocityXEach(0);
    cactusG.setVelocityXEach(0);

    cloudG.setLifetimeEach(-1);
    cactusG.setLifetimeEach(-1);

    trex.changeImage("pause");

    btnReset.visible = true;
    gameOver.visible = true;

    if(mousePressedOver(btnReset) || touches.length > 0){
      reset();
      touches = [];
    }
  }
  
 //impedir que o trex caia
  trex.collide(ground2);

  drawSprites();
}
//cria as nuvens
function createClouds(){
  if(frameCount % 60 === 0){
    cloud = createSprite(width +10,random(10,height/2),40,10);
    cloud.velocityX = -2;
    cloud.lifetime = 1000;
    cloud.addImage(imgCloud);
    cloud.scale = 0.7;
    cloud.depth = trex.depth;
    trex.depth += 1;
    cloudG.add(cloud);
  }
}
//cria os cactos
function createCactus(){
  if(frameCount % 60 === 0){
    cactu = createSprite(width +20,height -70,10,30);
    cactu.velocityX = -4;
    cactu.lifetime = 1000;
    
    var anything = Math.round(random(1,6));

    switch(anything){
      case 1: cactu.addImage(imgC1);
      break;
      case 2: cactu.addImage(imgC2);
      break;
      case 3: cactu.addImage(imgC3);
      break;
      case 4: cactu.addImage(imgC4);
      break;
      case 5: cactu.addImage(imgC5);
      break;
      case 6: cactu.addImage(imgC6);
      break;
      default: break;
    }
    cactu.scale = 0.5;
  
    cactusG.add(cactu);
  }
}

function reset(){
  gameState = PLAYING;
  score = 0;
  btnReset.visible = false;
  gameOver.visible = false;
  cactusG.destroyEach();
  cloudG.destroyEach();
  trex.changeAnimation("running");
}
