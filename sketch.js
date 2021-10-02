var ground, sand;
var toy, yee;
var nube, aire;
var bel;
var tall;
var cactus;
var four;
var twins;
var GN, GC;
var colore;
var duo;
var puntaje_trex = 0;
var muerto, derrotado;
var murir;
var saltar;
var velocidad;
var gameoverX, gamealien;
var gameover, restart;

function preload() {
  yee = loadAnimation("rex derecho0.png", "rex ize0.png");
  sand = loadImage("ground2.png");
  bel = loadImage("cactus 10.png");
  tall = loadImage("cactus 20.png");
  four = loadImage("cactus 30.png");
  twins = loadImage("cactus 40.png");
  colore = loadImage("cactus 50.png");
  duo = loadImage("cactus 60.png");
  aire = loadImage("sprite_nube0.png");
  derrotado = loadImage("rex t pose0-1.png");
  murir = loadSound("die.mp3");
  saltar = loadSound("jump.mp3");
  velocidad = loadSound("checkPoint.mp3");
  gamealien = loadImage("game over0.png");
  restart = loadImage("gameover20.png");
}

function setup() {
  var posi = createCanvas(800, 200);
  posi.position((windowWidth - width) / 2, (windowHeight - height) / 2);

  //crea el sprite del suelo
  ground = createSprite(200, 180);
  ground.addImage("ground", sand);
  ground.velocityX = -9;
  jon = createSprite(50, 190, 50, 5);
  jon.visible = false;
  //Crea el sprite del Trex
  toy = createSprite(50, 160);
  toy.addAnimation("running", yee);
  toy.setCollider("circle", 0, 0, 40);
  toy.debug = false;
  //añade escala y posición al Trex
  toy.scale = 0.5;
  //Crea el sprite del Trex
  muerto = createSprite(50, 160);
  muerto.addAnimation("running", derrotado);
  muerto.setCollider("circle", 0, 0, 40);
  muerto.debug = false;
  //añade escala y posición al Trex
  muerto.scale = 0.5;
  muerto.visible = false;
  //Crea el sprite del gamealien
  gameoverX = createSprite(width / 2, height / 2.7);
  gameoverX.addImage("GAME OVER", gamealien);
  gameoverX.scale = 0.4;
  gameoverX.visible = false;
  //Crea el sprite del gameover
  gameover = createSprite(width / 2, height / 1.5);
  gameover.addImage("fin", restart);
  gameover.scale = 0.5;
  gameover.visible = false;

  GN = new Group();
  GC = new Group();
  etapa = 0;
}

function draw() {
  background(255, 255, 255);
  fill("red")
  textSize(14)
  text("Made by Kail Jeremy Blakeney Contreras",90,30)
  if (etapa == 0) {
    azul();
    verde();
    puntaje();
    if (ground.x < 0) {
      ground.x = 1000;
    }

    if (keyDown("space") && toy.collide(jon)) {
      toy.velocityY = -19;
      saltar.play();
    }
    toy.velocityY = toy.velocityY + 2;

    if (GC.isTouching(toy)) {
      murir.play();
      etapa = 1;
    }
  }

  if (etapa == 1) {
    gameoverX.visible = true;
    gameover.visible = true;
    ground.velocityX = 0;
    toy.velocityY = 0;
    muerto.y = toy.y;
    toy.visible = false;
    muerto.visible = true;
    GC.setVelocityXEach(0);
    GN.setVelocityXEach(0);
    GC.setLifetimeEach(-1);
    GN.setLifetimeEach(-1);
     fill("black");
  textSize(18);
  text("Score: " +  puntajeFinal, width / 1.5, 25);
    if (mousePressedOver(gameover)){
    etapa=0;
    puntaje_trex=0
    gameoverX.visible = false;
    gameover.visible = false;
    muerto.visible = false;
    toy.visible = true;
    ground.velocityX = -9;
    GN.destroyEach();
    GC.destroyEach();
      
      
      
    
    }
  }

  toy.collide(jon);
  drawSprites();
}
function azul() {
  if (frameCount % 40 == 0) {
    nube = createSprite(width, random(20, 65));
    nube.addImage("volar", aire);

    nube.velocityX = -5;
    GN.add(nube);
    GN.setDepthEach(1);
  }
  //
}
function verde() {
  var tipo = Math.round(random(1, 6));
  if (frameCount % 40 == 0) {
    cactus = createSprite(width, random(168, 170));
    cactus.lifetime = 200;
    cactus.velocityX = -(9 + puntaje_trex / 100);
    ground.velocityX = cactus.velocityX;
    switch (tipo) {
      case 1:
        cactus.scale = 0.45;
        cactus.addImage("tacos1", bel);
        break;
      case 2:
        cactus.scale = 0.45;
        cactus.addImage("tacos2", tall);
        break;
      case 3:
        cactus.scale = 0.35;
        cactus.addImage("tacos3", four);
        break;
      case 4:
        cactus.scale = 0.45;
        cactus.addImage("tacos4", twins);
        break;
      case 5:
        cactus.scale = 0.45;
        cactus.addImage("tacos5", colore);
        break;
      case 6:
        cactus.scale = 0.45;
        cactus.addImage("tacos6", colore);
        break;
    }

    GC.add(cactus);
    cactus.lifetime = 200;
  }
}
function puntaje() {
  puntaje_trex = puntaje_trex + Math.round(getFrameRate() / 60);
  if (puntaje_trex % 100 == 0 && puntaje_trex > 0) velocidad.play();
  puntajeFinal = puntaje_trex;
  fill("black");
  textSize(18);
  text("Score: " + puntaje_trex, width / 1.5, 25);
}
