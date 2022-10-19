"use strict"

// This file contains derived shapes

class Circle extends Shape {

   constructor() {
      super();
      this.Reset();
   }

   Reset() {
      super.Reset();
   }

   DrawObject(){
      CTX.beginPath();
      CTX.lineWidth = 1/((this.scaleX+this.scaleY)/2);
      CTX.arc(0,0,5,0,2 * Math.PI);
      CTX.fill();
      CTX.stroke();
   }

}

class RightTriangle extends Shape {

   constructor() {
      super();
      this.Reset();
   }

   Reset() {
      super.Reset();
   }

   DrawObject(){
      CTX.beginPath();
      CTX.lineWidth = 1/((this.scaleX+this.scaleY)/2);
      CTX.moveTo(0,0)
      CTX.lineTo(Math.cos(2*Math.PI), Math.sin(2*Math.PI))
      CTX.lineTo(Math.cos(Math.PI/2), Math.sin(Math.PI/2))
      CTX.lineTo(0,0)
      CTX.fill()
      CTX.stroke()
   }

}

class Rectangle extends Shape {

   constructor() {
      super();
      this.Reset();
   }

   Reset() {
      super.Reset();
   }

   DrawObject(){
      CTX.beginPath();
      CTX.lineWidth = 1/((this.scaleX+this.scaleY)/2);
      CTX.rect(-5, -5, 10, 10);
      CTX.fill();
      CTX.stroke();
   }
}

// Polar Rectangle, may be deleted (Gets weird with scaling)
/*class Rectangle extends Shape {
   #DELTA = Math.PI/2
   #points = []
   constructor() {
      super();
      this.Reset()
      
      for(let i=0; i <= 4;i++){
         let theta = (Math.PI/4) + i*this.#DELTA
         let point = {x:Math.cos(theta), y:Math.sin(theta)}
         this.#points.push(point)
      }
   }

   Reset() {
      super.Reset() 
   }

   DrawObject(){
      CTX.beginPath()
      CTX.moveTo(this.#points[0].x, this.#points[0].y)
      for(let i=1; i <= 4;i++){
         CTX.lineTo(this.#points[i].x,this.#points[i].y)
      }
      CTX.lineTo(this.#points[0].x,this.#points[0].y);
      CTX.lineWidth = 1/((this.scaleX+this.scaleY)/2)
      CTX.closePath()
      CTX.fill();
      CTX.stroke();
   }
}*/

class Star extends Shape {
   #starPoints = [0,2,4,1,3,0];
   #STARDELTA = (2*Math.PI)/5;
   #points = [];
   #startRotate = Math.random() * 360
   #endRotate = Math.random() * 360
   #startSize = Math.random() * .3
   #endSize = .7 + Math.random() * 1.3
   #grow
   #clockwise 
   constructor() {
      super();
      this.Reset();

      for(let i=0; i <= 5;i++){
         let theta = (this.#starPoints[i]*this.#STARDELTA);
         let point = {x:5*Math.cos(theta), y:5*Math.sin(theta)};
         this.#points.push(point);
      }

      //This creates an array, indexes into the array, and sets
      //Both variables to eachother at the exact same time.
      //I love Javascript. - M
      if(this.#startRotate > this.#endRotate){
         this.#endRotate = [this.#startRotate, this.#startRotate = this.#endRotate][0];
      }
      
      if(this.#startSize > this.#endSize){
         this.#endSize = [this.#startSize, this.#startSize = this.#endSize][0];
      }
      this.Rotate(this.#startRotate)
   }

   Tick(){
      const ROTATEDELTA = 1
      const SIZEDELTA = .02
      let top = this.rotate * 180/Math.PI
      let size = (this.scaleX+this.scaleY)/2
      if(top >= this.#endRotate){
         this.#clockwise = false
      } else if (top <= this.#startRotate){
         this.#clockwise = true
      }
      if(this.#clockwise){
         this.Rotate(ROTATEDELTA)
      }else{
         this.Rotate(-ROTATEDELTA)
      }
      
      if(size >= this.#endSize){
         this.#grow = false
      } else if (size <= this.#startSize){
         this.#grow = true
      }
      if(this.#grow){
         this.scaleX+=SIZEDELTA
         this.scaleY+=SIZEDELTA
      }else{
         this.scaleX-=SIZEDELTA
         this.scaleY-=SIZEDELTA
      }
   }

   Reset() {
      super.Reset();
   }

   DrawObject(){
      CTX.beginPath();
      CTX.lineWidth = 1/((this.scaleX+this.scaleY)/2);
      CTX.moveTo(this.#points[0].x, this.#points[0].y);
      for(let i=1; i <= 5;i++){
         CTX.lineTo(this.#points[i].x,this.#points[i].y);
      }
      CTX.lineTo(this.#points[0].x,this.#points[0].y);
      CTX.closePath();
      CTX.fill();
      CTX.stroke();
   }
}

// Bennett's code, good starting point.
// I would write new stuff above this comment to keep
// it separate from everything below, keeping the
// following to use as a reference.
class Plus extends Shape {

   constructor() {
      super();
   }

   DrawObject() {
      CTX.beginPath();
      CTX.moveTo(-10,0);
      CTX.lineTo(10,0);
      CTX.moveTo(0,-10);
      CTX.lineTo(0,10);
      CTX.stroke();
   }
}

class Polygon extends Shape {
   #points = [];

   constructor(sides=3) {
      super();
      this.Reset()
      if (sides < 3) {
         sides = 3;
      }

      for (let i = 0; i < sides; ++i) {
         let angle = 360 / sides * i * Math.PI / 180;
         let point = {x: 10*Math.cos(angle), y:10*Math.sin(angle)};
         this.#points.push(point);
      }
   }

   Reset() {
      super.Reset() 
   }

   DrawObject() {
      CTX.beginPath();
      CTX.moveTo(this.#points[0].x, this.#points[0].y);
      for(let i =1; i < this.#points.length; ++i) {
         CTX.lineTo(this.#points[i].x,this.#points[i].y);
      }
      CTX.lineTo(this.#points[0].x,this.#points[0].y);
      CTX.lineWidth = 1/((this.scaleX+this.scaleY)/2)
      CTX.closePath()
      CTX.fill();
      CTX.stroke();
   }
}