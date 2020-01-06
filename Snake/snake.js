/*eslint-env browser*/
var cvs=document.getElementById("snake");
var ctx=cvs.getContext("2d");

//Dimensions of each square

var box = 32;

//Load all images

var ground=new Image();
ground.src="images/ground.png";

var foodImage =new Image();
foodImage.src="images/food.png";

//Load Audio

var dead = new Audio();
var down = new Audio();
var eat = new Audio();
var left = new Audio();
var right = new Audio();
var up = new Audio();

dead.src="audio/dead.mp3";
down.src="audio/down.mp3";
eat.src="audio/eat.mp3";
left.src="audio/left.mp3";
right.src="audio/right.mp3";
up.src="audio/up.mp3";




//The array for the snake
var snake =[];
snake[0] = {
    x: 9*box,
    y: 10*box
}

var food = 
    {
            x: Math.floor(Math.random()*17+1)*box,
            y: Math.floor(Math.random()*15+3)*box
    }


var score =0;
var d;

document.addEventListener("keydown",direction);

function direction(event){
    
    if(event.keyCode==37 && d!="RIGHT"){
        d= "LEFT";
        left.play();
    }else if(event.keyCode==38 && d!="DOWN"){
        d="UP";
        up.play();
    }else if(event.keyCode==39 && d!="LEFT"){
        d="RIGHT";
        right.play();
    }else if(event.keyCode==40 && d!="UP"){
        d="DOWN";
        down.play();
    }
}
function collision (head,arraySnake)
{
    for(var i=0;i<arraySnake.length;i++)
    {
        if(head.x==arraySnake[i].x && head.y==arraySnake[i].y)
        {
            return true;
        }
    }
    return false;
}

function draw(){
    ctx.drawImage(ground,0,0);
    for(var i=0;i<snake.length;i++){
        if(i==0){
            ctx.fillStyle="green";
                }else {
                    ctx.fillStyle="white";
                      }
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle="red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
        
    }
    ctx.drawImage(foodImage,food.x,food.y);
    
    //old head position
    
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;
    
  
    
    if(snakeX==food.x && snakeY==food.y)
    {
        //We dont remove the tail
    score++;
        eat.play();
        food = 
        {
            x: Math.floor(Math.random()*17+1)*box,
            y: Math.floor(Math.random()*15+3)*box
        }
        
    }
    else
    {
    //Remove old head of the snake
    snake.pop();
    }
    
    switch(d){
        case "UP": snakeY-=box;
            break;
        case "DOWN":snakeY+=box;
            break;
        case "RIGHT":snakeX+=box;
            break;
        case "LEFT":snakeX-=box;
            break;       
            }
    
    var newHead = 
        {
            x:snakeX,
            y:snakeY  
        }
    
    
      //Check if game over
    if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake))
    {
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);
    ctx.fillStyle="white";
    ctx.font="45px Changa One";
    ctx.fillText(score,2*box,1.6*box);
    
    
    
}

    var game = setInterval(draw,100);

