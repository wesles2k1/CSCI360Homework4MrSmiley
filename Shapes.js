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
      CTX.lineTo(10*Math.cos(2*Math.PI), 0)
      CTX.lineTo(0, 10*Math.sin(Math.PI/2))
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

      let startScale = this.#startSize + (Math.random() * (this.#endSize - this.#startSize));
      this.Scale(startScale, startScale);
   }

   //I don't care if this is over 30 lines. It works.
   //Plus the stars look damn good, if I do say so
   //myself. And I do. - M
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
