const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var playerArrows = [];
var board1
var board2
var boardno = []
var limit = 10
var shooted 
function preload() {
  backgroundImg = loadImage("./assets/background2.gif");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(200, 350, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(250, playerBase.position.y - 160, 50, 180, options);
  World.add(world,player)

  playerArcher = new PlayerArcher(
    340,
    playerBase.position.y - 112,
    120,
    120
  );

  board1 =  new Board(width-300,250,50,200)
  board2 =  new Board(width-400,height-325,50,200)
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);
  image(baseimage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerimage,player.position.x,player.position.y,50,180)

  playerArcher.display();
  board1.display()
  board2.display()

  for (var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();
      collisionWithBoard1(i)
      collisionWithBoard2(i)

    }
  }

  if(shooted === 1&&shooted!==2){
    text("You shooted Board 1!",width - width/6,75)
  }
  if(shooted === 2&&shooted!==1){
    text("You shooted Board 2!",width - width/6,150)
  }

  if(shooted ===3){
    text("You shooted Both-Boards!",width - width/6,100)
  }
  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);
  text("Arrows left:"+limit+"/10",width / 8,100)
}

function keyPressed() {
  if (keyCode === 32 & limit >0) {
    limit-=1
    var posX = playerArcher.body.position.x;
    var posY = playerArcher.body.position.y;
    var angle = playerArcher.body.angle;
    //console.log(angle);

    var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

    Matter.Body.setAngle(arrow.body, angle);
    playerArrows.push(arrow);
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}
                                                                                       


function collisionWithBoard1(index){
  if (playerArrows[index]!==undefined&&board1!==undefined){
    var collision1 = Matter.SAT.collides(playerArrows[index].body, board1.body);
    if (collision1.collided){
      
      Matter.World.remove(world, playerArrows[index].body);
      delete playerArrows[index]
      
      if(shooted===2){
        shooted =3
      }else if(shooted!==5125&&shooted!==3){
        shooted = 1
      }
      
    }

  }
    
}

function collisionWithBoard2(index){
  if (playerArrows[index]!==undefined&&board2!==undefined){
    var collision2 = Matter.SAT.collides(playerArrows[index].body, board2.body);
    if (collision2.collided){
      Matter.World.remove(world, playerArrows[index].body);
      delete playerArrows[index]
      
      if(shooted===1){
        shooted = 3
      }else if(shooted!==5125&&shooted!==3){
        shooted=2
      }
    }

  }
    
}
