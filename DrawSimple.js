"use strict"

// This file contains derived drawable objects

// Bennett's code, good starting point.
// I would write new stuff above this comment to keep
// it separate from everything below, keeping the
// following to use as a reference.
class Plus extends Drawable {

    constructor() {
       super();
    }

    DrawObject(ctx) {
       ctx.beginPath();
       ctx.moveTo(-10,0);
       ctx.lineTo(10,0);
       ctx.moveTo(0,-10);
       ctx.lineTo(0,10);
       ctx.stroke();
    }
}

class Polygon extends Drawable {
       #points = [];

    constructor( sides=3) {
       super();
       this.Reset()
       if (sides < 3) {
          sides = 3;
       }

       for (let i = 0; i < sides; ++i) {
          let angle = 360 / sides * i * Math.PI / 180;
          let point= {x: 10*Math.cos(angle), y:10*Math.sin(angle)};
          this.#points.push(point);
       }
    }

    Reset() {
       super.Reset() 
    }

    DrawObject(ctx) {
       ctx.beginPath();
       ctx.moveTo(this.#points[0].x, this.#points[0].y);
       for(let i =1; i < this.#points.length; ++i) {
            ctx.lineTo(this.#points[i].x,this.#points[i].y);
       }
       ctx.lineTo(this.#points[0].x,this.#points[0].y);
       ctx.fill();
       ctx.stroke();
    }
}