//make some varible for board
let board;
let boardWidth=360;
let boardHeight=680;
let context;

//bird
let birdHeight=24;
let birdWidth=34;
let birdY=boardHeight/2;
let birdX=boardWidth/8;
let birdImg;

//bird object
let bird ={
    x:birdX,
    y:birdY,
    width:birdWidth,
    height:birdHeight

}

let topPipeImg;
let BottomPipeImg;


//pipes
let pipesArray=[];
let pipesWidth=64;
let pipesHeight=512;
let pipesX=boardWidth;
let pipesY=0;


//physics
let velocityX=-2//moves pip right side
let velocityY=0;
let gravity=0.09;
let sorce=0;
let gameOver=false;

window.onload=function(){

    board =document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context=board.getContext("2d");//used for drawing on the board
    

    //draw the bird
    //context.fillRect(bird.x,bird.y,bird.width,bird.height);
    
    birdImg=new Image();
    birdImg.src= "./img/flappybird.png";
    birdImg.onload=function(){ 
        context.drawImage(birdImg,bird.x,bird.y,bird.height,bird.width);

    }
    topPipeImg=new Image();
    topPipeImg.src="./img/toppipe.png";

    BottomPipeImg=new Image();
    BottomPipeImg.src="./img/bottompipe.png";
    

  requestAnimationFrame(update);

   setInterval(placePipes,1500);//every 1.5 seconds
  document.addEventListener("keydown",moveBird)
}

function update(){
    if(gameOver){
        return ;
    }
  requestAnimationFrame(update);
  context.clearRect(0,0,board.width,board.height);

  //brid
  velocityY+=gravity;
//   bird.y+=velocityY;
bird.y=Math.max(bird.y+velocityY,0)
  context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);
  
  if(bird.y>board.height){
    gameOver=true;
  }

  //pipes
  for(let i=0;i<pipesArray.length;i++){
    let pipe=pipesArray[i];
    pipe.x+=velocityX;
    context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);

    if(!pipe.passed && bird.x > pipe.x + pipe.width){
        sorce+=0.5;
        pipe.passed=true;
    }
    if(detectCollision(bird,pipe)){
        gameOver=true;
    }
  }

 //clear pipes
 while(pipesArray.length>0 && pipesArray[0].x < -pipesWidth){
    pipesArray.shift();
 }
  context.fillStyle="white";
  context.font="45px sans-serif";
  context.fillText(sorce,5,45);

  if(gameOver){
    context.fillText("Game_Over",5,90)
  }
}


function placePipes() {
  
  if(gameOver){
    return;
  }

    let randomPipeY=pipesY-pipesHeight/4-Math.random()*(pipesHeight/2);
    let openingSpace=boardHeight/4;
    let topPipe={
        img: topPipeImg,
        x:pipesX,
        y:randomPipeY,
        width:pipesWidth,
        height:pipesHeight,
        passed:false

    }
    pipesArray.push(topPipe); 

    let bottomPipe={
        img:BottomPipeImg,
        x:pipesX,
        y:randomPipeY+pipesHeight+openingSpace,
        width:pipesWidth,
        height:pipesHeight,
        passed:false
    }
    pipesArray.push(bottomPipe);
}         
 

function moveBird(e){
    if(e.code=="Space" || e.code=="ArrowUp" || e.code=="KeyX"){
        velocityY= -3;
    }
    if(gameOver){
        bird.y=birdY;
        pipesArray=[];
        sorce=0;
        gameOver=false;
        
    }
}

function detectCollision(a,b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;  
}