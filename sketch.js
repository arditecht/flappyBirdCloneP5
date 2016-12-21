var scrsize = 600;
var gravity = 0.38;
var bird;
var game_speed = 1;


function game_over(){
  
}

function keyTyped() {
  if (key === ' ') {
    bird.vely = -7;
  } 
  else if (key === 'p') {
    
  }
}

function update_bird(){
  if(bird.posy + bird.vely >= ground.posy){
    bird.posy = ground.posy;
    draw_bird();
    game_over();
    return;
  }
  bird.posy += bird.vely;
  bird.vely += bird.accy;
  draw_bird();
}

function draw_bird(){
  fill(255);
  noStroke();
  ellipse(bird.posx, bird.posy, 60, 60);
}




function preload(){
  bgimg = loadImage("assets/bgimg.jpg");
  flame = loadImage("assets/flame.png");
  bird  = loadImage("assets/flame.png");
}
function setup() {
  createCanvas(600, 600);
  background(0);
  
  bird = {
    posx: 150,
    posy: scrsize/2,
    velx: 0.0,
    vely: 0.0,
    accx: 0.0,
    accy: gravity
  }
  
  ground = {
    near_index: 1.3,
    posy: 530,
    velx: -1 * this.near_index * game_speed
  }
  
  
}

function draw() {
  background(bgimg);
  update_bird();
}