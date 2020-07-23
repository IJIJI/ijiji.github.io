var towerCount = 10;
var towerWidth = 0.06;

const bottomOffset = 70;
var towerYPos;

const minHeight = 0.1;
const maxHeight = 0.65;

var towerArray = [];
var towerArrayNew = [];
var cTower1;
var cTower2;

var steps = 0;

var currentCompare = 0;

var streak = 0;

function setup(){
  divWidth = windowWidth;
  divHeight = windowHeight;
  createCanvas(divWidth, divHeight);
  
  if (divWidth > 1000){
    towerCount = 20;
    towerWidth = 0.03;
  }

  frameRate(4);
  towerYPos = divHeight - bottomOffset;

  for(var x = 0; x < towerCount; x++){
    var height = minHeight*divHeight + Math.round(random(1, 25)) * ((maxHeight*divHeight - minHeight*divHeight) / 25)
    var towerX = (divWidth-140- divWidth * towerWidth)/(towerCount-1) * x + 70 + divWidth * towerWidth / 2;
    cTower1 = new tower(towerX, height, x);
    towerArray.push(cTower1);


  }

}

function draw(){
  background(0);
  rectMode(CORNERS);
  
  overlay();
  


  for(var x = 0; x < towerCount; x++){
    cTower1 = towerArray[x];
    cTower1.display();
  }

  compare(currentCompare, currentCompare+1);
  currentCompare++;
  
  if (currentCompare+1 >= towerCount){
    currentCompare = 0;
  }
  if (streak < towerCount){
    steps++;
  }
  
  
}


class tower{
  constructor(xPos, height, start){
    this.xPos = xPos;
    this.height = height;
    this.width = divWidth * towerWidth;
    this.start = start;
  }
  display(){
    rectMode(CORNER);
    fill(255);
    rect(this.xPos - this.width/2, towerYPos, this.width, -this.height);
    textAlign(CENTER, CENTER);
    textSize(20)
    text(this.start, this.xPos, divHeight - 30);
  }
}

function compare(one, two){
  cTower1 = towerArray[one];
  cTower2 = towerArray[two];
  if (cTower1.height > cTower2.height){
    swap(one, two);
    streak = 0;
  }
  else{
    streak++;
  }
}


function swap(one, two){
  var xTower1;
  var xTower2;

  
  
  cTower1 = towerArray[one];
  xTower1 = cTower1.xPos;

  cTower2 = towerArray[two];
  xTower2 = cTower2.xPos;


  cTower1.xPos = xTower2;
  cTower2.xPos = xTower1;

  towerArray[two] = cTower1;
  towerArray[one] = cTower2;
}

function windowResized() {
  location.reload();
}

function overlay(){

  fill(255);
  rect(0 + 60, divHeight - 50, divWidth - 60, divHeight - 60);
  

  textAlign(CENTER);
  rectMode(CENTER);

  textSize(40);
  text(steps, 50, 50);


  if(
    mouseX > divWidth - 60 - 50 &&
    mouseX < divWidth - 60 + 50 &&
    mouseY > 40 - 25 &&
    mouseY < 40 + 25
  ){
    fill(200);
  }

  rect(divWidth - 60, 35, 80, 40, 5);
  fill(0);
  textSize(22);
  text('restart', divWidth - 60, 35);
}

function mousePressed() {
  if(
    mouseX > divWidth - 60 - 50 &&
    mouseX < divWidth - 60 + 50 &&
    mouseY > 40 - 20 &&
    mouseY < 40 + 20
  ){
    location.reload();
  }
}