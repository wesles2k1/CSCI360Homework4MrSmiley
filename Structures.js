"use strict"

// This file contains derived structures

class Person extends Structure {
    head;
    rightEye;
    leftEye;

    constructor() {
        super();
        this.Reset();
        this.head = new Circle();
        this.head.lineColor = "black";
        this.head.fillColor = "yellow";
        this.head.Scale(5,5);
        this.shapes.push(this.head);

        this.rightEye = new Circle();
        this.rightEye.lineColor = "black";
        this.rightEye.fillColor = "blue";
        this.rightEye.Translate(-10, 10);
        this.rightEye.Scale(0.75,0.75);
        this.shapes.push(this.rightEye);

        this.leftEye = new Circle();
        this.leftEye.lineColor = "black";
        this.leftEye.fillColor = "blue";
        this.leftEye.Translate(10, 10);
        this.leftEye.Scale(0.75,0.75);
        this.shapes.push(this.leftEye);

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

    FaceColor(color) {
        this.head.fillColor = color;
    }

    EyeColor(color) {
        this.rightEye.fillColor = color;
        this.leftEye.fillColor = color;
    }
}

class Sky extends Structure {
    numberOfStars = 250;

    constructor() {
        super();
        this.Reset();

        let background = new Rectangle()
        background.Scale(3000,HORIZON/10)
        background.fillColor = "#38285c"
        background.Translate(0,HORIZON)
        this.shapes.push(background)
        for(let i = 0; i < this.numberOfStars; i++) {
            let star = new Star();
            star.fillColor = "Yellow"
            star.lineColor = "Yellow"
            star.Translate((3000 * Math.random()) - (WIDTH / 2), (HEIGHT / 2) - ((HORIZON * Math.random()))) // Make sure to fit world size, not canvas
            this.shapes.push(star);
        }
    }

    Tick(){
        this.shapes.forEach(element => {element.Tick()})
    }

    Reset() {
        super.Reset();
    }

}

class Ground extends Structure {
    constructor(){
        super();
        this.Reset()

        let ground = new Rectangle()
        ground.fillColor = "green"
        ground.Scale(3000,HORIZON/5)
        ground.Translate(0,-HORIZON/2)
        this.shapes.push(ground)
    }

    Reset() {
        super.Reset();
    }
}
// Fence (Array of rectangles)
// House (Rectangles and right triangle)
// School (Separate or just flip the house and different colors?)
// Teeter totter (2 Mr. Smileys, a line, and a right triangle)
// Swing (1 Mr. Smiley, series of lines)
// Couple (2 Mr. Smileys)
class Couple extends Structure {
    #path;
    
    constructor() {
        super();
        this.Reset();

        this.#path = [
            {x: -25, y: 25},
            {x: -25, y: -25},
            {x: 25, y: -25},
            {x: 25, y: -25}
        ]

        let person1 = new Person();
        person1.Scale(0.5,0.5);
        person1.Translate(-15,0);
        this.shapes.push(person1);

        let person2 = new Person();
        person2.Scale(0.5,0.5);
        person2.Translate(15,0);
        this.shapes.push(person2);

        this.translateX = this.#path[0].x;
        this.translateY = this.#path[0].y;
    }

    Reset() {
        super.Reset();
    }

    Path(newPath) {
        this.#path = newPath;
    }

    Tick() {
    }
}