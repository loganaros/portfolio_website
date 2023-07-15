// init + set variables
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d"); // draw on canvas
var win_w = window.innerWidth;
var win_h = window.innerHeight;
canvas.width = 250;
canvas.height = 250;
var mousex = 0;
var mousey = 0;
var gravity = .98;


// return color of gumball
function colorGenerator() {
  var pastelcolors = ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff", "#ffd1dc" ];
  var randcolor = pastelcolors[Math.floor(Math.random() * (pastelcolors.length))];

  return randcolor;
}

// spawn gumballs
function gumball() {
  this.color = colorGenerator();
  this.radius = 10;
  this.startradius = this.radius;
  // this.x = Math.random() * (canvas.width - this.radius);
  // this.y = Math.random() * (canvas.height - this.radius);
  this.x = canvas.width / 2;
  this.y = canvas.height / 2;
  this.dy = Math.random() * 2;
  this.dx = Math.round((Math.random() - 0.5) * 10);
  this.vel = Math.random() / 5;
  this.update = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill();
  };
}

var bal = [];
for (var i=0; i<50; i++){
    bal.push(new gumball());
}

function animate() {    
  // reset win variables to current window height/width dimensions 
  if (win_w != window.innerWidth || win_h != window.innerHeight) {
    win_w = window.innerWidth;
    win_h = window.innerHeight;
  }
  requestAnimationFrame(animate);
  c.clearRect(0, 0, win_w, win_h);
  for (var i = 0; i < bal.length; i++) {
    bal[i].update();
    bal[i].y += bal[i].dy;
    bal[i].x += bal[i].dx;
    if (bal[i].y + bal[i].radius >= canvas.height) {
      bal[i].dy = -bal[i].dy * gravity;
    } else {
      bal[i].dy += bal[i].vel;
    }    
    if(bal[i].x + bal[i].radius > canvas.width|| bal[i].x - bal[i].radius < 0){
        bal[i].dx = -bal[i].dx;
    } 
    //forloop end
  }
//animation end
}

animate();

setInterval(function() {
  bal.push(new gumball());
  bal.splice(0, 1);
}, 400);