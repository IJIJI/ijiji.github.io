

var xSpeedMax = 8;
var xSpeedMin = 4;

var ySpeedMax = 6;
var ySpeedMin = 1;

var speed = 0.5; //speed modifier

var amountBalls = 700;
var radiusBall = 20;

var balls = [];
var pointsP1 = 0;
var pointsP2 = 0;
var xSpeedMod;
var ySpeedMod;
// var color = {red:"255", green:"255", blue:"255"};
// var pointsP1 = 0;
// var pointsP2 = 0;



function setup(){
    var canvas = createCanvas(windowWidth, windowHeight);
    var div = document.getElementById('jsHolder')
    var divWidth = div.offsetWidth;
    var divHeight = div.offsetHeight;
    canvas.parent('jsHolder')
    resizeCanvas(divWidth, divHeight);
    //ball 1 object
    for (var x = 0; x < amountBalls; x++){
        if (random(-1,1) < 0){
            xSpeedMod = -speed;
        }
        else {
            xSpeedMod = speed;
        }
        if (random(-1,1) < 0){
            ySpeedMod = -speed;
        }
        else {
            ySpeedMod = speed;
        }
        ball = new Ball(random(0.3 * divWidth, 0.7 * divWidth), random(0.3 * divHeight, 0.7 * divHeight), radiusBall, random(xSpeedMin, xSpeedMax) * xSpeedMod, random(ySpeedMin, ySpeedMax) * ySpeedMod, 255, 255, 255);
        balls.push(ball);
    }
}
function draw(){
    background(0);

    for (var x = 0; x < balls.length; x++){
        ball = balls[x];
        ball.display();
        ball.move();
    }
    score(pointsP1, pointsP2);
}

function windowResized() {
    var div = document.getElementById('jsHolder')
    var divWidth = div.offsetWidth;
    var divHeight = div.offsetHeight;
    resizeCanvas(divWidth, divHeight);
}


class Ball {
    constructor(x, y, radius, xSpeed, ySpeed, r, g, b){
        this.xPos = x;
        this.yPos = y;
        this.radius = radius;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.color = {red:r, green:g, blue:b }
    }


    display(){
        fill(this.color.red, this.color.green, this.color.blue)
        stroke(0);
        ellipse(this.xPos, this.yPos, this.radius * 2, this.radius * 2);
        
    }

    move(){
        var div = document.getElementById('jsHolder')
        var divWidth = div.offsetWidth;
        var divHeight = div.offsetHeight;
        if (this.xPos - this.radius < 0){
            this.xSpeed = Math.abs(this.xSpeed);
            pointsP2 += 1;
            this.color.red = 255;
            this.color.green = 0;
            this.color.blue = 0;
        }
        if (this.xPos + this.radius > divWidth){
            this.xSpeed = -Math.abs(this.xSpeed);
            pointsP1 += 1;
            this.color.red = 0;
            this.color.green = 255;
            this.color.blue = 0;
        }
        if (this.yPos - this.radius < 0){
            this.ySpeed = Math.abs(this.ySpeed);
        }
        if (this.yPos + this.radius > divHeight){
            this.ySpeed = -Math.abs(this.ySpeed);
        }
        this.xPos += this.xSpeed;
        this.yPos += this.ySpeed;
    }
}
function score(p1, p2){
    textSize(40);
    fill(0);
    stroke(255);
    text(p1, windowWidth * 0.1, windowHeight * 0.1);
    text(p2, windowWidth * 0.9, windowHeight * 0.1);
}

// TODO The game will be a jumper where you avoid horizontally incomming balls. You bounce off the floor, and can double jump once.

//TODO Implement this: https://github.com/processing/p5.js/wiki/Beyond-the-canvas
//TODO https://github.com/loneboarder/p5.experience.js

