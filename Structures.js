"use strict"

// This file contains derived structures

class Person extends Structure {

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

class Sky extends Structure {
    numberOfStars = 250;
    #stars = [];

    constructor() {
        super();
        this.Reset();

        for(let i = 0; i < this.numberOfStars; i++) {
            let star = new Star();
            star.Translate((3000 * Math.random()) - (WIDTH / 2), (HEIGHT / 2) - ((HORIZON * Math.random()))) // Make sure to fit world size, not canvas
            this.#stars.push(star);
        }
    }

    Tick(){
        this.#stars.forEach(element => {element.Tick()})
    }

    Reset() {
        super.Reset();
    }

    DrawLines(){
        this.#stars.forEach(element => {element.Display()});
    }
}

// Ground (Rectangle)
// Fence (Array of rectangles)
// House (Rectangles and right triangle)
// School (Separate or just flip the house and different colors?)
// Teeter totter (2 Mr. Smileys, a line, and a right triangle)
// Swing (1 Mr. Smiley, series of lines)
// Couple (2 Mr. Smileys)