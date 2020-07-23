//! remove above this!

const god = false;
const dbug = false;

var mode = 'easy';

const edgeOffset = 20;
const astrSpawnXdev = 600;

const xSpeedMax = 3;
const xSpeedMin = 2;

const ySpeedMax = 2;
const ySpeedMin = -2;

const playerSpeed = 9;
const playerAngleSpeed = 6;

const radiusMaxBall = 40;
const radiusMinBall = 55;
var amountBalls = 5;
var ballsSpawned = false;

const maxPoints = 75;

const redWidth = 20;

//menu vars
const menuSpacing = 20;
const menuHeight = 70;
const menuItems = ["Easy", "HARD", "How To Play", "Quit"];
var overMenu = [];
const backxPos = 100;
const backyPos = 50;
var overBack = false;
var overNext = false;
var tutorialPage = 0;

// object vars
var asteroid;
var asteroids = [];
var Player1;
let playerImage;
var pointText = [];

var alive = true;
var menu = false;
var tutorial = false;
var levelTime = 6; // time in seconds it takes to raise the level.
var level = 1;
var pointsCore = 0;

var timeStart;
var time;
var timeElapsed;
const easyTime = 8;
const mediumTime = 6;
const hardTime = 6;

var divWidth  = 165;
var divHeight = 185;

function preload() {
  playerImage = loadImage('img/JavaScript.p5/AsteroidHunt/player.png');
  
  
  logoImage = loadImage('img/JavaScript.p5/AsteroidHunt/Logo.png');
  howTo1Image = loadImage('img/JavaScript.p5/AsteroidHunt/How to play.png');
  howTo2Image = loadImage('img/JavaScript.p5/AsteroidHunt/How to play 2.png');
}


function setup(){
  if (divWidth == 165 && divHeight == 185){
    createCanvas(windowWidth, windowHeight);
    divWidth = windowWidth;
    divHeight = windowHeight;
  }
  // defining vars to enable restart
  asteroids = [];
  level = 1;
  pointsCore = 0;
  menu = true;
  alive = true;

  for (var x = 0; x < amountBalls; x++){
    var radius = random(radiusMinBall, radiusMaxBall);
    asteroid = new Asteroid(radius, random(0 + radius + edgeOffset ,divHeight - radius - edgeOffset), divWidth + radius + edgeOffset, -random(xSpeedMin, xSpeedMax), random(ySpeedMin, ySpeedMax));
    asteroids.push(asteroid);
  }

  Player1 = new Player(divWidth / 2, divHeight / 2, 0, playerSpeed, playerAngleSpeed, playerImage);

  imageMode(CENTER);
  angleMode(DEGREES);

  timeStart = Date.now();
}

function draw(){
  background(0);
  if (keyIsDown(ESCAPE)){
    setup();
    tutorial = false;
  }
  

  if (alive == true && menu == false){
    time = Date.now();
    timeElapsed = Math.round((time - timeStart) / 100) / 10; 

    rectMode(CORNERS);
    fill(255, 0 , 0)
    rect(0, 0, redWidth ,divHeight);

    Player1.move();
    Player1.display();
    for (var x = 0; x < asteroids.length; x++){
      asteroid = asteroids[x];
      asteroid.move();
      asteroid.display();
    }


    score();


  }
  else if (menu == true){
    startMenu();
  }
  else if (alive == false){
    lose(level);
  }
  debug();
  
}

//? player code VV

class Player{
    constructor(xPos, yPos, angle, speed, angleSpeed, img){
        this.xPos = xPos;
        this.yPos = yPos;
        this.angle = angle;
        this.angleSpeed = angleSpeed;
        this.currentAngleSpeed = 0;
        this.speed = -speed;
        this.currentSpeed = 0;
        this.size = 0.4;
        this.image = img;

    }
    display(){
        push();
        translate(this.xPos, this.yPos);
        rotate(this.angle);
        image(this.image, 0, 0, this.image.width * this.size, this.image.height * this.size);
        pop();
    }

    move(){
      if (keyIsDown(UP_ARROW)){
        this.currentSpeed = -this.speed;
      }
      else if(keyIsDown(DOWN_ARROW)){
        this.currentSpeed = this.speed;
      }
      else{
        this.currentSpeed = 0;
      }

      if (keyIsDown(RIGHT_ARROW)){
        this.currentAngleSpeed = this.angleSpeed;
      }
      else if(keyIsDown(LEFT_ARROW)){
        this.currentAngleSpeed = -this.angleSpeed;
      }
      else{
        this.currentAngleSpeed = 0;
      }
      this.angle = this.angle + this.currentAngleSpeed;
      if(this.angle > 360){
        this.angle = this.angle - 360;
      }
      else if (this.angle <= 0){
        this.angle = this.angle + 360;
      }
      this.xPos = this.xPos + (this.currentSpeed * Math.cos(this.angle * (Math.PI / 180)));
      this.yPos = this.yPos + (this.currentSpeed * Math.sin(this.angle * (Math.PI / 180)));


        if (mode == 'hard' && god != true){
          if (this.xPos < 0 - edgeOffset || this.xPos > divWidth + edgeOffset || this.yPos < 0 - edgeOffset || this.yPos > divHeight + edgeOffset){
            alive = false;

          }
        }
        else {
        if (this.xPos < redWidth){
          this.xPos = redWidth;
        }
        else if (this.xPos > divWidth){
          this.xPos = divWidth;
        }
        else if (this.yPos < 0){
          this.yPos = 0;
        }
        else if (this.yPos > divHeight){
          this.yPos = divHeight;
        }
      }
    }
}

//? asteroids

class Asteroid {
  constructor(radius, yPos, xPos, xSpeed, ySpeed){
    this.xPos = xPos;
    this.yPos = yPos;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.radius = radius;
    this.hit = false;
  }


  display(){
    if (this.hit == false){
      fill(255, 255, 255)
      stroke(0);
      ellipse(this.xPos, this.yPos, this.radius * 2, this.radius * 2);
    }
  }

  move(){
      
    if (this.hit == false){

      if (this.xPos - this.radius  < redWidth){
        if (god == true){
          this.xSpeed = Math.abs(this.xSpeed);
        }
        else{
          alive = false;
        }
      }
      if (this.xPos + this.radius > divWidth){
        this.xSpeed = -Math.abs(this.xSpeed);

      }
      if (this.yPos - this.radius < 0){
        this.ySpeed = Math.abs(this.ySpeed);
      }
      if (this.yPos + this.radius > divHeight){
        this.ySpeed = -Math.abs(this.ySpeed);
      }
      this.xPos += this.xSpeed;
      this.yPos += this.ySpeed;

      if (this.xPos >= Player1.xPos - this.radius && this.xPos <= Player1.xPos + this.radius){
        if (this.yPos >= Player1.yPos - this.radius && this.yPos <= Player1.yPos + this.radius){
          this.hit = true;
          var pointsAdd = round(((divWidth - this.xPos) / this.xPos) * maxPoints);
          pointsCore = pointsCore + pointsAdd;
          
        }
      }
    
    }
  }
  respawn(){
    var radius = random(radiusMinBall, radiusMaxBall);
    this.radius = radius;
    this.yPos = random(0 + radius + edgeOffset ,divHeight - radius - edgeOffset);
    this.xPos = random(divWidth + radius + edgeOffset, divWidth + radius + edgeOffset + astrSpawnXdev);
    this.ySpeed = random(ySpeedMin, ySpeedMax);
    this.xSpeed = -random(xSpeedMin, xSpeedMax);
    this.hit = false;
    
  }

}

function astrSpawn(amount){
  var done = 0;
  for (var x = 0; x < asteroids.length; x++){
    if (done >= amount){break;}
    asteroid = asteroids[x];
    if (asteroid.hit == true){
      asteroid.respawn();
      done = done + 1;
    }
    
  }
  if (done < amount){
    for (var x = 0; x < amount - done; x++){
      var radius = random(radiusMinBall, radiusMaxBall);
      asteroid = new Asteroid(radius, random(0 + radius + edgeOffset ,divHeight - radius - edgeOffset), random(divWidth + radius + edgeOffset, divWidth + radius + edgeOffset + astrSpawnXdev), -random(xSpeedMin, xSpeedMax),  random(ySpeedMin, ySpeedMax));
      asteroids.push(asteroid);
    }
  }
  

}


//? misc items VV

function score(){
  if (alive == true){
      if (timeElapsed % levelTime == 0 && timeElapsed != 0){
          level = timeElapsed / levelTime + 0;
          
      }
      if (timeElapsed % levelTime == 0 && timeElapsed != 0 && ballsSpawned != true){
        astrSpawn(amountBalls + Math.round(level / 3.75));
        ballsSpawned = true;
      }
      if (timeElapsed % levelTime != 0){
        ballsSpawned = false;
      }
      textAlign(CENTER, CENTER);
      textSize(40);
      fill(255);
      text(level, divWidth / 2, 50);
  }
}

function startMenu(){
  if (tutorial == true){
    textAlign(CENTER, CENTER);
    rectMode(CENTER);

    if (tutorialPage == 1){
      image(howTo1Image, divWidth/2, divHeight/2, divWidth, divHeight);
    }
    else if (tutorialPage == 2){
      image(howTo2Image, divWidth/2, divHeight/2, divWidth, divHeight);
    }
    if(
      mouseX > backxPos - 60 &&
      mouseX < backxPos + 60 &&
      mouseY > backyPos - 60 &&
      mouseY < backyPos + 60
    ){
      overBack = true;
      fill(50);
    }
    else{
      overBack = false;
      fill(0);
    }
    
    stroke(255);
    rect(backxPos, backyPos, 120, 50);

    if(
      mouseX > divWidth - backxPos - 60 &&
      mouseX < divWidth - backxPos + 60 &&
      mouseY > backyPos - 60 &&
      mouseY < backyPos + 60
    ){
      overNext = true;
      fill(50);
    }
    else{
      overNext = false;
      fill(0);
    }

    rect(divWidth - backxPos, backyPos, 120, 50);
    
    
    
    fill(255);
    textSize(35);
    text('Back',backxPos, backyPos + 2);
    text('Next',divWidth - backxPos, backyPos + 2);
    


  }
  else{
    textAlign(CENTER, CENTER);
    rectMode(CENTER); 

    var menuContentHeight = divHeight / 2 - ((menuItems.length + 2) * (menuHeight + menuSpacing)) / 2 + (menuHeight + menuSpacing) / 2;
    // textSize(80);
    // fill(255);
    // stroke(255);
    // text('ASTEROID HUNT',divWidth / 2 + 1, menuContentHeight + 1);
    // fill(255, 0, 0);
    // stroke(255, 0, 0);
    // text('ASTEROID HUNT',divWidth / 2, menuContentHeight);
    image(logoImage, divWidth / 2, menuContentHeight );
    for(var x = 0; x < menuItems.length; x++){
      if(
        mouseX > divWidth / 2 - (divWidth / 2.2) / 2 &&
        mouseX < divWidth / 2 + (divWidth / 2.2) / 2 &&
        mouseY > (menuContentHeight + (x + 2) * (menuHeight + menuSpacing)) - menuHeight / 2 &&
        mouseY < (menuContentHeight + (x + 2) * (menuHeight + menuSpacing)) + menuHeight / 2
      ){
        overMenu[x] = true;
        fill(50);
      }
      else{
        overMenu[x] = false;
        fill(0);
      }
      stroke(255);
      
      rect(divWidth / 2, menuContentHeight + (x + 2) * (menuHeight + menuSpacing), divWidth / 2.2, menuHeight);
      fill(255);
      textSize(40);
      text(menuItems[x],divWidth / 2, menuContentHeight + (x + 2) * (menuHeight + menuSpacing));  

    }
  }

}



  // image(howTo1Image, divWidth/2, divHeight/2, divWidth, divHeight);
  // rectMode(CENTER);
  // fill(0);
  // stroke(255);
  // rect(backxPos, backyPos, 120, 50);
  // fill(255);
  // textSize(35);
  // text('Back',backxPos, backyPos + 2);
  




function mousePressed() {
  if (overMenu[0] == true && menu == true){
    overMenu[0] = false;
    
    mode = 'easy';
    levelTime = easyTime;
    menu = false;
    timeStart = Date.now();
  }
  else if (overMenu[1] == true && menu == true){
    overMenu[1] = false;

    mode = 'medium';
    levelTime = mediumTime;
    menu = false;
    timeStart = Date.now();
  }
  else if (overMenu[2] == true && menu == true){
    overMenu[2] = false;
    tutorial = true;
    tutorialPage = 1;
  }
  else if (overMenu[3] == true && menu == true){
    overMenu[2] = false;
    window.open("projects.html#JS.P5", "_self");
  }
  else if (overBack == true && tutorial == true){
    tutorialPage = tutorialPage - 1;
    if (tutorialPage < 1){
      tutorialPage = 0;
      tutorial = false;
    }

  }
  else if (overNext == true && tutorial == true){
    tutorialPage = tutorialPage + 1;
    if (tutorialPage > 2){
      tutorial = false;
      tutorialPage = 0;
    }
  }

}
function howToPlay(){
  image(howTo1Image, divWidth/2, divHeight/2, divWidth/2, divHeight/2);
}



function lose(score){
  background(0);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  fill(255);
  stroke(0);
  rect(divWidth / 2, divHeight / 2, divWidth / 2.2, divHeight / 2.8);
  textSize(100);
  fill(0);
  stroke(0);
  text('YOU LOSE',divWidth / 2 + 3, divHeight / 2 - 40 + 3);
  fill(255, 0, 0);
  stroke(255, 0, 0);
  text('YOU LOSE',divWidth / 2, divHeight / 2 - 40);
  fill(0);
  stroke(0);
  textSize(40);
  text('Level: ' + score, divWidth/2, divHeight/2 + 40);
  textSize(20);
  text('Press Space To Continue.', divWidth/2, divHeight/2 + 90);
  

  if (keyIsDown(ENTER) || keyIsDown(32)){
    setup();
  }
}


function debug(){
  
  if (dbug == true){
    textAlign(LEFT, CENTER);
    textSize(11);
    fill(255);
    stroke(0);
    text('Angle: ' + Player1.angle + ' Time: ' + timeElapsed + ' Level: ' + level + ' Score: ' + pointsCore + ' Mode: ' + mode + ' LevelTime: ' + levelTime +' Asteroids: ' + asteroids.length, divWidth * 0.05, divHeight * 0.05);
  }
}

function windowResized() {
  divWidth = windowWidth;
  divHeight = windowHeight;
  resizeCanvas(divWidth, divHeight);
}

