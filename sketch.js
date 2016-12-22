var scrsize = 600;    // do NOT change values of these variables
var gravity = 0.35;   
var bird;
var game_speed = 5;
var in_game = 0;
var score = 0.0;
var time = 0;
//=========================================================================//
var gap_width = 100;
var num_gaps  = 3;
var inter_gap_width = 250;
var gap_size = 150;
var gaps = [];
var mid_dialog = "Dodge snickers bars and earn fat!";
var mid_dialog_size = 28;

function game_over(){
  in_game = 0;
  mid_dialog = "too fat to fly straight!";
  mid_dialog_size = 40;
}

function wrap_up(){
  // functionality to be added later
}

function keyTyped() {
  mid_dialog = "";
  if(in_game === 0) {
    setup();
    in_game=1;
  }
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
  if(bird.vely < 0){
    image(flame, bird.posx-27, bird.posy+5, flame.width/2.3, flame.height/2.3);
    textSize(25);
    text("", bird.posx+26, bird.posy+20);
  }
  //image(birdimg, bird.posx-42, bird.posy-28, birdimg.width/4-3, birdimg.height/4.5-5);
  
}

function update_score(){
  textSize(42);
  textFont("Verdana");
  stroke(180, 53, 7);
  fill(255, 255, 255, 180);
  text("Fat: ", 400, 80);
  textSize(54);
  textFont("Verdana");
  fill(255, 255, 255, 230);
  text(score.toFixed(0), 500, 80);
}

function preload(){
  bgimg = loadImage("assets/bgimg.jpg");
  flame = loadImage("assets/flame.png");
  birdimg  = loadImage("assets/bird.gif");
  choc  = loadImage("assets/choc.gif");
}

function setup() {
  createCanvas(600, 600);
  background(bgimg);
  first_gap = 1;
  //in_game = 1;
  time = 0;
  score = 0;
  gaps = [];
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
  update_score();
}

function draw() {
  time += 1;
  time %= 36001;
  if(in_game === 1){
    background(bgimg);
    critical_section();
    if(time % (60) === 0){
      score+=0.5;
    }
  }
  push();
  textSize(mid_dialog_size);
  textFont("Calibri");
  fill(255);
  noStroke();
  text(mid_dialog, 100, 200);
  pop();
}