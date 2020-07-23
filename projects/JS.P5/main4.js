

var xSpeedMax = 8;
var xSpeedMin = 4;

var ySpeedMax = 6;
var ySpeedMin = 1;

var speed = 0.6; //speed modifier
var colorSpeed = 20;

var amountBalls = 400;
var radiusBall = 20;

var balls = [];
var pointsP1 = 0;
var pointsP2 = 0;
var xSpeedMod;
var ySpeedMod;

var sliderVal;
var sliderID = 'jsHolder';
var output1ID = 'output1JS';

var color1 = 0;   //color between 0 and 255 for balls coming from the right and left
var color2 = (255/3);
var colorStart = 255; //start greyvalue


function setup(){
    document.getElementById("checkJS").checked = "true";
    balls = [];
    pointsP1 = 0;
    pointsP2 = 0;
    document.getElementById(output1ID).innerHTML = "Balls: " + amountBalls + "          Speed: " + speed;


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
        ball = new Ball(random(0.3 * windowWidth, 0.7 * windowWidth), random(0.3 * windowHeight, 0.7 * windowHeight), radiusBall, random(xSpeedMin, xSpeedMax) * xSpeedMod, random(ySpeedMin, ySpeedMax) * ySpeedMod, color1, color2, colorStart);
        colorise(ball.colorStart);
        balls.push(ball);
        
    }
}
function draw(){
    background(0);
    ballSlider();

    for (var x = 0; x < balls.length; x++){
        ball = balls[x];
        ball.display();
        ball.move();
    }
    score(pointsP1, pointsP2);
}



class Ball {
    constructor(x, y, radius, xSpeed, ySpeed, clr1, clr2, clrstrt){
        this.xPos = x;
        this.yPos = y;
        this.radius = radius;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.color1 = clr1;
        this.color2 = clr2;
        this.color = -Math.abs(clrstrt);
    }


    display(){
        if (document.getElementById("checkJS").checked == true){
            colorise(this.color);
        }
        else{
            colorise(-255);
        }
        
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
            if (document.getElementById("checkJS").checked == true){
                this.color = this.color2;
                if (this.color2 >= 255){
                    this.color2 = 0;
                }
            
                this.color2 += colorSpeed;
            }
        }
        if (this.xPos + this.radius > divWidth){
            this.xSpeed = -Math.abs(this.xSpeed);
            pointsP1 += 1;
            if (document.getElementById("checkJS").checked == true){
                this.color = this.color1;
                if (this.color1 >= 255){
                    this.color1 = 0;
                }
            
                this.color1 += colorSpeed;
            }
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

function colorise(color){
    var r;
    var g;
    var b;
    
    if (color < 0){
        color = Math.abs(color);
        fill(color, color, color);
    }
    else if (color < (255/3)){
        color = color * 3;
        r = 255 - color;
        g = color;
        b = 0;
        fill(r,g,b);
    }
    else if (color < 2*(255/3)){
        color = (color - 255/3) * 3;
        r = 0;
        g = 255 - color;
        b = color;
        fill(r,g,b);
    }
    else {
        color = (color - 2*(255/3)) * 3;
        r = color;
        g = 0;
        b = 255-color;
        fill(r,g,b);
    }

    
}

function windowResized() {
    var div = document.getElementById(sliderID);
    var divWidth = div.offsetWidth;
    var divHeight = div.offsetHeight;
    resizeCanvas(divWidth, divHeight);
}

function ballSlider() {
    var ballsVal = document.getElementById("ballsJS").value;
    if (ballsVal != amountBalls){
        amountBalls = ballsVal;
        setup();
    }
    var speedVal = document.getElementById("speedJS").value;
    if (speedVal != speed){
        speed = speedVal;
        setup();
    }
}

// TODO The game will be a jumper where you avoid horizontally incomming balls. You bounce off the floor, and can double jump once.;