class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height)); // position
    this.vel = createVector(0, 0); // velocity
    this.acc = createVector(0, 0); // acceleration
    this.prevPos = this.pos.copy(); // previous position
    this.maxSpeed = 2;
  }
  
  update() {
    // apply acceleration and velocitiy
    this.vel.add(this.acc); 
    this.vel.limit(this.maxSpeed); // limit velocity
    this.pos.add(this.vel); 
    this.acc.mult(0); 
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  show() {
    stroke(255, 10);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }
  
  follow(vectors) {
    // get the index in the flow field
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    
    // get the force and apply it
    let force = vectors[index];
    this.applyForce(force);
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }

  }

}

let inc;
let scl;
let cols, rows;
let zoff;
let particles;
let flowField;
let fr;

function setup() {
  var canvas = createCanvas(500, 500);
  canvas.parent('sketch01');
  inc = 0.1;
  scl = 10;
  cols = floor(width / scl);
  rows = floor(height / scl);
  zoff = 0;
  fr = createP('');
  particles = [];
    
  flowField = new Array(cols * rows);

  for(let i = 0; i < 300; i++) {
    particles[i] = new Particle();
  }
  
  background(100);
}

function draw() {
    var yoff = 0;
    for(let y = 0; y < rows; y++) {
      var xoff = 0;
      for(let x = 0; x < cols; x++) {
        // set the vector in the flow field
        var index = x + y * cols; 
        var angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
        let v = p5.Vector.fromAngle(angle);
        v.setMag(1); // set the power of the field on the particle
        flowField[index] = v;
        
        xoff += inc;

        stroke(0,50);
      }
      yoff += inc;
      zoff += 0.0003; // rate the flow field changes
    }
  
  // update and draw the particles
  for(let i = 0; i < particles.length; ++i) {
    particles[i].follow(flowField);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}