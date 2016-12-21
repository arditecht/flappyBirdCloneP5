var scrsize = 600;
var gravity = 0.35;
var bird;
var game_speed = 5;
var in_game = 0;



var gap_width = 100;
var num_gaps  = 3;
var inter_gap_width = 220;
var gap_size = 150;
var gaps = [];


function game_over(){
  console.log("game over called");
}

function wrap_up(){
  
}

function keyTyped() {
  if (key === ' ') {
    bird.vely = -7.5;
  } 
}

function collision_check(){
  for(i=0; i<gaps.length; i++){
    
  }
  //return true or false..
}

function add_gap(){
  var holder = random(200, scrsize-50);
  var gap = {
    ymax : holder,
    ymin : holder - gap_size,
    xmin : scrsize + inter_gap_width,
    xmax : scrsize + inter_gap_width + gap_width
  }
  
  
  gaps.push(gap);
}

function rem_gap(){
  gaps.shift();
}

function handle_gap(){
  if(gaps.length === 0) add_gap();
  for(i=0; i<gaps.length; i++){
    if(gaps[i].xmax <= 0){
      rem_gap();
    }
    else if(gaps[i].xmax <= 600 && i === gaps.length-1){
      add_gap();
    }
  }
}

function update_gap(){
  for(i=0; i<gaps.length; i++){
    gaps[i].xmin -= game_speed;
    gaps[i].xmax -= game_speed;
  }
  handle_gap();
  draw_gap();
}

function draw_gap(){
  for(i=0; i<gaps.length; i++){
    fill(255, 255, 255, 100);
    ellipse((gaps[i].xmax+gaps[i].xmin)/2, (gaps[i].ymax+gaps[i].ymin)/2, 
          (gaps[i].xmax-gaps[i].xmin), (gaps[i].ymax-gaps[i].ymin));
  }
}

function update_bird(){
  if(bird.posy + bird.vely >= ground.posy){ // ground to bird collision check done here
    bird.posy = ground.posy;
    draw_bird();
    wrap_up();
    game_over();
    return;
  }
  bird.posy += bird.vely;
  bird.vely += bird.accy;
  draw_bird();
  if(collision_check()){  //  pillar to gap collision check done in the func called here
    wrap_up();
    game_over();
  }
}

function draw_bird(){
  fill(255);
  noStroke();
  ellipse(bird.posx, bird.posy, bird.dia, bird.dia);
}




function preload(){
  bgimg = loadImage("assets/bgimg.jpg");
  flame = loadImage("assets/flame.png");
  bird  = loadImage("assets/flame.png");
}

function setup() {
  createCanvas(600, 600);
  background(0);
  first_gap = 1;
  bird = {
    posx: 150,
    posy: scrsize/2,
    velx: 0.0,
    vely: 0.0,
    accx: 0.0,
    accy: gravity,
    dia : 55
  }
  
  ground = {
    posy: 572,
  }
  
}

function critical_section(){
  update_bird();
  update_gap();
}

function draw() {
  background(bgimg);
  critical_section();
}