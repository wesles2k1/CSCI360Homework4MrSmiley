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

class House extends Structure {
    constructor() {
        super();
        this.Reset();

        let building = new Rectangle();
        building.fillColor = "red";
        building.Scale(25, 30);
        building.Translate(-25)
        this.shapes.push(building);

        let windowBL = new Rectangle();
        windowBL.fillColor = "cyan";
        windowBL.Scale(5, 6);
        windowBL.Translate(-30, -36)
        this.shapes.push(windowBL);

        let windowBR = new Rectangle();
        windowBR.fillColor = "cyan";
        windowBR.Scale(5, 6);
        windowBR.Translate(30, -36)
        this.shapes.push(windowBR);

        let windowTL = new Rectangle();
        windowTL.fillColor = "cyan";
        windowTL.Scale(5, 6);
        windowTL.Translate(-30, 36)
        this.shapes.push(windowTL);

        let windowTR = new Rectangle();
        windowTR.fillColor = "cyan";
        windowTR.Scale(5, 6);
        windowTR.Translate(30, 36)
        this.shapes.push(windowTR);

        let chimney = new Rectangle();
        chimney.fillColor = "red";
        chimney.Scale(3, 9);
        chimney.Translate(75, 200);
        this.shapes.push(chimney);

        let roof = new RightTriangle();
        roof.fillColor = "purple";
        roof.Scale(22, 22);
        roof.Translate(0, 275);
        roof.Rotate(225);
        this.shapes.push(roof);

        let awning = new RightTriangle();
        awning.fillColor = "purple";
        awning.Scale(6, 3);
        awning.Translate(125, 25);
        this.shapes.push(awning);
    }

    Reset() {
        super.Reset();
    }
}

class School extends Structure {
    constructor() {
        super();
        this.Reset();

        let building = new Rectangle();
        building.fillColor = "blue";
        building.Scale(25, 30);
        building.Translate(-25)
        this.shapes.push(building);

        let windowBL = new Rectangle();
        windowBL.fillColor = "cyan";
        windowBL.Scale(5, 6);
        windowBL.Translate(-30, -36)
        this.shapes.push(windowBL);

        let windowBR = new Rectangle();
        windowBR.fillColor = "cyan";
        windowBR.Scale(5, 6);
        windowBR.Translate(30, -36)
        this.shapes.push(windowBR);

        let windowTL = new Rectangle();
        windowTL.fillColor = "cyan";
        windowTL.Scale(5, 6);
        windowTL.Translate(-30, 36)
        this.shapes.push(windowTL);

        let windowTR = new Rectangle();
        windowTR.fillColor = "cyan";
        windowTR.Scale(5, 6);
        windowTR.Translate(30, 36)
        this.shapes.push(windowTR);

        let chimney = new Rectangle();
        chimney.fillColor = "red";
        chimney.Scale(3, 9);
        chimney.Translate(75, 200);
        this.shapes.push(chimney);

        let roof = new RightTriangle();
        roof.fillColor = "purple";
        roof.Scale(22, 22);
        roof.Translate(0, 275);
        roof.Rotate(225);
        this.shapes.push(roof);

        let awning = new RightTriangle();
        awning.fillColor = "purple";
        awning.Scale(6, 3);
        awning.Translate(125, 25);
        this.shapes.push(awning);
    }

    Reset() {
        super.Reset();
    }
}

// Teeter totter (2 Mr. Smileys, a line, and a right triangle)

// Swing (1 Mr. Smiley, series of lines)

class Couple extends Structure {
    #path;
    #movementSpeed;
    #anchor;
    #currentPointIndex;
    #nextPointIndex;
    #currentNextPointsDistance;
    
    constructor() {
        super();
        this.Reset();

        this.#path = [
            {x: -25, y: 25},
            {x: -25, y: -25},
            {x: 25, y: -25},
            {x: 25, y: 25}
        ]
        this.#movementSpeed = 1;
        this.#currentPointIndex = 0;
        this.#nextPointIndex = 1;
        this.#currentNextPointsDistance = Math.sqrt(
            Math.pow(this.#path[this.#currentPointIndex].x - this.#path[this.#nextPointIndex].x, 2) +
            Math.pow(this.#path[this.#currentPointIndex].y - this.#path[this.#nextPointIndex].y, 2));
        this.#anchor = {x: 0, y: 0};
        this.translateX += this.#path[0].x + this.#anchor.x;
        this.translateY += this.#path[0].y + this.#anchor.y;
        
        let person1 = new Person();
        person1.Scale(0.5,0.5);
        person1.Translate(-15,0);
        this.structures.push(person1);

        let person2 = new Person();
        person2.Scale(0.5,0.5);
        person2.Translate(15,0);
        this.structures.push(person2);
    }

    Reset() {
        super.Reset();
    }

    Translate(tx, ty) { // Translates the anchor point rather than the couple itself
        this.#anchor.x = tx;
        this.#anchor.y = ty;
        
        this.translateX = this.#path[this.#currentPointIndex].x + this.#anchor.x;
        this.translateY = this.#path[this.#currentPointIndex].y + this.#anchor.y;
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

    SetPath(newPath, newStartPoint = 0) {
        if(newPath.length > 0) {
            this.#path = newPath;
            if(newStartPoint >= this.#path.length || newStartPoint < 0) {   // Protects against index errors
                newStartPoint = 0;
            }
            this.#currentPointIndex = newStartPoint;
            this.#nextPointIndex = this.#IncrementPathIndex(this.#currentPointIndex);
            this.#currentNextPointsDistance = Math.sqrt(
                Math.pow(this.#path[this.#currentPointIndex].x - this.#path[this.#nextPointIndex].x, 2) +
                Math.pow(this.#path[this.#currentPointIndex].y - this.#path[this.#nextPointIndex].y, 2));
            this.translateX = this.#path[this.#currentPointIndex].x;
            this.translateY = this.#path[this.#currentPointIndex].y;
        }
    }

    Tick() {
        // Don't look at this code unless you want to lose
        // your sanity and perish instantly  ~Wesley
        // Ye who wish to live, turn back now
        // (Should probably be split into GetDirection and
        // MoveCouple functions, but that's too much of a
        // pain right now and this works)   ~Wesley

        let movementRemaining = this.#movementSpeed;
        while(movementRemaining > 0) {
            // Gets coordinates of currentPoint and nextPoint
                // Works for now, but recalculates every tick, even
                // though they'll be the same most of the time.
                // These points really only change when the next
                // and current points cycle over.
                // currentPoint and nextPoint should probably be
                // member data instead of local to this function.
                // Too hard to figure out right now tho ~Wesley
            let currentPoint = {
                x: this.#anchor.x + this.#path[this.#currentPointIndex].x,
                y: this.#anchor.y + this.#path[this.#currentPointIndex].y
            }
            let nextPoint = {
                x: this.#anchor.x + this.#path[this.#nextPointIndex].x,
                y: this.#anchor.y + this.#path[this.#nextPointIndex].y
            }

            // Calculates angle from currentPoint to nextPoint, reletive to the X-axis
            let direction;
            if(nextPoint.x - currentPoint.x == 0) { // Handles undefined inverse tangent values (90 and 270 degrees)
                if(nextPoint.y - currentPoint.y > 0) {
                    direction = Math.PI / 2;    // Up/90 Degrees
                } else if(nextPoint.y - currentPoint.y < 0) {
                    direction = 3 * Math.PI / 2;    // Down/270 Degrees
                } else {    // Only occurs if given a path of size 1; This prevents the program from breaking
                    direction = 0;
                    movementRemaining = 0;
                }
            } else {    // Calculates angle
                direction = Math.atan(
                    (nextPoint.y - currentPoint.y) /
                    (nextPoint.x - currentPoint.x)
                );
                if(nextPoint.x - currentPoint.x < 0) {  // Adjusts angle if it's supposed to be from 90 to 270
                    direction += Math.PI;
                }
            }

            // Translates either to nextPoint or as far as movementRemaining will allow it
            let moveTo = {
                x: this.translateX + (movementRemaining * Math.cos(direction)),
                y: this.translateY + (movementRemaining * Math.sin(direction))
            }
            let moveDistance = Math.sqrt(
                Math.pow(currentPoint.x - moveTo.x, 2) +
                Math.pow(currentPoint.y - moveTo.y, 2));
            if(moveDistance < this.#currentNextPointsDistance) {    // Determines whether to translate to nextPoint or moveTo
                this.translateX = moveTo.x, // Note: Not calling this.Translate(x,y) because it will reset the anchor, we don't want that!
                this.translateY = moveTo.y;
                movementRemaining = 0;
            } else {
                let distanceCovered = Math.sqrt(
                    Math.pow(nextPoint.x, 2) +
                    Math.pow(nextPoint.y, 2));
                this.translateX = nextPoint.x;
                this.translateY = nextPoint.y;
                movementRemaining -= distanceCovered;
                this.#currentPointIndex = this.#IncrementPathIndex(this.#currentPointIndex);
                this.#nextPointIndex = this.#IncrementPathIndex(this.#nextPointIndex);
                this.#currentNextPointsDistance = Math.sqrt(
                    Math.pow(this.#path[this.#currentPointIndex].x - this.#path[this.#nextPointIndex].x, 2) +
                    Math.pow(this.#path[this.#currentPointIndex].y - this.#path[this.#nextPointIndex].y, 2));
            }
        }
    }

    #IncrementPathIndex(index) {
        if(index + 1 >= this.#path.length) {
            index = 0;
        } else {
            index++;
        }
        return(index)
    }
}