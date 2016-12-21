var scrsize = 600;
var gravity = 0.35;
var bird;
var game_speed = 5;
var in_game = 0;



var gap_width = 100;
var num_gaps  = 3;
var inter_gap_width = 250;
var gap_size = 150;
var gaps = [];


function game_over(){
  in_game = 0;
  console.log("game over!");
}

function wrap_up(){
  // functionality to be added later
}

function keyTyped() {
  if(in_game === 0) return;
  if (key === ' ') {
    bird.vely = -7.2;
  } 
}

function collision_check(){
  var status = false;
  for (i=0; i<gaps.length; i++){
    if ( ((bird.posx+bird.dia/2 > gaps[i].xmin) && (bird.posx-bird.dia/2 < gaps[i].xmin)||
          (bird.posx-bird.dia/2 < gaps[i].xmax) && (bird.posx+bird.dia/2 > gaps[i].xmax))&&
          !(bird.posy+bird.dia/2 < gaps[i].ymax && bird.posy-bird.dia/2 > gaps[i].ymin) ){
      status = true;
    } // this place is quite complicated
  }
  return status;
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
    fill(28, 3, 4);
    rect(gaps[i].xmin, 0, gaps[i].xmax - gaps[i].xmin, gaps[i].ymin);
    image(choc, gaps[i].xmin-105, -3, (gaps[i].xmax - gaps[i].xmin)*3.2, gaps[i].ymin+10);
    
    rect(gaps[i].xmin, gaps[i].ymax, gaps[i].xmax - gaps[i].xmin, scrsize - gaps[i].ymin);
    image(choc, gaps[i].xmin-105, gaps[i].ymax-12, (gaps[i].xmax - gaps[i].xmin)*3.2, scrsize - gaps[i].ymin);
    //fill(50, 255, 0, 200);
    //ellipse((gaps[i].xmax+gaps[i].xmin)/2, (gaps[i].ymax+gaps[i].ymin)/2, 
    //      (gaps[i].xmax-gaps[i].xmin), (gaps[i].ymax-gaps[i].ymin));
  }
}

function update_bird(){
  if(bird.posy + bird.vely >= ground.posy){ // ground to bird collision check done here
    bird.posy = ground.posy;
    draw_bird();
    //wrap_up();
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
  ellipse(bird.posx, bird.posy, bird.dia, bird.dia);
}


function preload(){
  bgimg = loadImage("assets/bgimg.jpg");
  flame = loadImage("assets/flame.png");
  bird  = loadImage("assets/bird.gif");
  choc  = loadImage("assets/choc.gif");
}

function setup() {
  createCanvas(600, 600);
  background(bgimg);
  first_gap = 1;
  in_game = 1;
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
  if(collision_check()){  //  pillar to gap collision check done in the func called here
    //wrap_up();
    game_over();
  }
}

function draw() {
  if(in_game === 0) return;
  background(bgimg);
  critical_section();
}