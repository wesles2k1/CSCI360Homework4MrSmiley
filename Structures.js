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
    #movementSpeed;
    #currentPoint;
    #nextPoint;
    
    constructor() {
        super();
        this.Reset();

        this.#path = [
            {x: -25, y: 25},
            {x: -25, y: -25},
            {x: 25, y: -25},
            {x: 25, y: 25}
        ]
        this.#movementSpeed = 5;
        this.#currentPoint = 0;
        this.#nextPoint = 1;

        let person1 = new Person();
        person1.Scale(0.5,0.5);
        person1.Translate(-15,0);
        this.structures.push(person1);

        let person2 = new Person();
        person2.Scale(0.5,0.5);
        person2.Translate(15,0);
        this.structures.push(person2);
        
        this.translateX = this.#path[0].x;
        this.translateY = this.#path[0].y;
    }

    Reset() {
        super.Reset();
    }

    Path(newPath, newStartPoint=0) {
        this.#path = newPath;
        this.#currentPoint = newStartPoint;
        if(this.#path.length > 1) {
            this.#currentPoint += 1;
        }
    }
    
    //Takes in a height that assumes a Person is 10 units tall by default.
    //Then it scales the person and moves them to be in the same plane
    //as their partner. This sucked to do during a physics lecture. - M
    SetHeight(index, height){
        let person = this.structures[index-1]
        height /= 20
        person.Scale(height,height)
        person.Translate(person.translateX,(height-.5)*-50*Math.sin(4*Math.PI/3))
    }

    SetFaceColor(index, color) {
        this.structures[index-1].FaceColor(color);
    }

    SetEyeColor(index, color) {
        this.structures[index-1].EyeColor(color);
    }

    Tick() {
        // Don't touch this unless you want to lose your sanity
        // and instantly perish ~Wesley
        /*
        let movementRemaining = this.#movementSpeed;
        while(movementRemaining > 0) {
            // Direction gets a value of the angle from currentPoint to nextPoint
            // (Needed to calculate x and y components of movement)
            let direction;
            if(this.#path[this.#nextPoint].x - this.#path[this.#currentPoint].x == 0) {
                if(this.#path[this.#nextPoint].y - this.#path[this.#currentPoint].y < 0) {
                    direction = Math.PI / 2;
                } else if(this.#path[this.#nextPoint].y - this.#path[this.#currentPoint].y > 0) {
                    direction = 3 * Math.PI / 2;
                } else {
                    direction = 0;  // This should never happen??? Means nextPoint and currentPoint are the same?
                }
            } else {
                direction = Math.atan(
                    (this.#path[this.#nextPoint].y - this.#path[this.#currentPoint].y) /
                    (this.#path[this.#nextPoint].x - this.#path[this.#currentPoint].x)
                );
            }
            // Translates either to nextPoint or as far as movementRemaining will allow it
            let moveTo = {
                x: movementRemaining * Math.cos(direction),
                y: movementRemaining * Math.sin(direction)
            }
            if(moveTo.x ) { 
                //Okay so this if needs to detect if moveTo is passed nextPoint
                //but it's relevent to where ever currentPoint is, so direction
                //matters here. I'm figuring that the if check here is going to
                //be actually horrendous and really long.
            }
            // Ignore the line blow, but don't delete it
            //this.Translate(this.translateX + movementRemaining, this.translateY + movementRemaining)
        }
        */
    }
}