"use strict"

// Make classes (not derived from "Shape") to
// use derived shapes to draw complex objects

//"Structure" is used here as a way to composite 
//all of the simple shapes and transform them as
//one unit, instead of trying to transform each.
class Structure {
    translateX;
    translateY;
    rotate; // In Radians
    scaleX;
    scaleY;
    structures;
    shapes;

    Reset() {
        this.translateX = 0;
        this.translateY = 0;
        this.rotate = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.structures = [];
        this.shapes = [];
    }

    constructor() {
        this.Reset();
    }

    Translate(tx, ty) {
        this.translateX = tx;
        this.translateY = ty;
    }

    Rotate(theta) {
        this.rotate = theta * Math.PI / 180;
    }

    Scale(sx,sy) {
        this.scaleX = sx;
        this.scaleY = sy;
    }

    Tick() {
    }

    DrawLines(){
    }

    DrawStructure() {
        for (let i=0; i < this.structures.length; ++i ) {
            this.structures[i].DrawStructure();
        }
        for (let i=0; i < this.shapes.length; ++i ) {
            this.shapes[i].Display();
        }

        this.DrawLines()
    }

    Display() {
        CTX.save();

        CTX.translate(this.translateX, this.translateY);
        CTX.scale(this.scaleX, this.scaleY);
        CTX.rotate(this.rotate);

        this.DrawStructure();

        CTX.restore();
    }
}

// Mr. Smiley (Circles, a curve, and series of lines)
class MrSmiley extends Structure {

    constructor() {
        super();
        this.Reset();

        let head = new Circle();
        head.lineColor = "black";
        head.fillColor = "yellow";
        head.Scale(5,5);
        this.shapes.push(head);

        let rightEye = new Circle();
        rightEye.lineColor = "black";
        rightEye.fillColor = "blue";
        rightEye.Translate(-10, 10);
        rightEye.Scale(0.75,0.75);
        this.shapes.push(rightEye);

        let leftEye = new Circle();
        leftEye.lineColor = "black";
        leftEye.fillColor = "blue";
        leftEye.Translate(10, 10);
        leftEye.Scale(0.75,0.75);
        this.shapes.push(leftEye);

        this.shapes.forEach(element => {element.Translate(element.translateX,element.translateY+100)});
    }

    Reset() {
        super.Reset();
    }

    DrawLines(){
        CTX.beginPath()

        //Smile!
        CTX.arc(0,100,15,(11*Math.PI)/6,(7*Math.PI)/6,true);

        //Torso
        CTX.moveTo(0,0)
        CTX.lineTo(0,100-25)

        //Arms
        CTX.moveTo(0,60)
        CTX.lineTo(25,40)
        CTX.moveTo(0,60)
        CTX.lineTo(-25,40)

        //Legs
        CTX.moveTo(0,0)
        CTX.lineTo(-50*Math.cos(4*Math.PI/3),50*Math.sin(4*Math.PI/3))
        CTX.moveTo(0,0)
        CTX.lineTo(50*Math.cos(4*Math.PI/3),50*Math.sin(4*Math.PI/3))

        CTX.stroke()
    }
}

// Sky (Rectangle and array of > 100 stars)
// Ground (Rectangle)
// Fence (Array of rectangles)
// House (Rectangles and right triangle)
// School (Separate or just flip the house and different colors?)
// Teeter totter (2 Mr. Smileys, a line, and a right triangle)
// Swing (1 Mr. Smiley, series of lines)
// Couple (2 Mr. Smileys)