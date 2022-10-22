"use strict"

// This file contains derived structures

class Person extends Structure {
    head;
    rightEye;
    leftEye;
    girl = false;
    skirtColor = "pink"

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

        //skirt
        if(this.girl){
            CTX.save();
                CTX.scale(1.5,1.5);
                CTX.translate(0,5)
                CTX.beginPath()
                CTX.moveTo(0,0)
                CTX.lineTo(-30*Math.cos(4*Math.PI/3),25*Math.sin(4*Math.PI/3))
                CTX.lineTo(30*Math.cos(4*Math.PI/3),25*Math.sin(4*Math.PI/3))
                CTX.moveTo(0,0)
                CTX.fillStyle = this.skirtColor
                CTX.fill()
            CTX.restore();
        }        
    }

    FaceColor(color) {
        this.head.fillColor = color;
    }

    EyeColor(color) {
        this.rightEye.fillColor = color;
        this.leftEye.fillColor = color;
    }

    Skirt(color){
        if(this.girl){
            this.girl = false
        }else{
            this.girl = true
            this.skirtColor = color
        }
        this.DrawLines()
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

class FenceComponent extends Structure {

    constructor(hue=0) {
        super();
        this.Reset();

        const HUE_SHIFT = 20


        let post = new Rectangle();
        post.fillColor = "hsl(" + hue + ",60%,50%)"
        post.lineColor = "hsl(" + hue + ",60%,20%)"
        post.Scale(2,9)
        post.Translate(-20,0)

        let topPost = new Rectangle();
        topPost.fillColor = "hsl(" + (hue+HUE_SHIFT) + ",60%,50%)"
        topPost.lineColor = "hsl(" + (hue+HUE_SHIFT) + ",60%,20%)"
        topPost.Scale(9,2.5)
        topPost.Translate(30,27)
        this.structures.push(topPost)

        let bottomPost = new Rectangle();
        bottomPost.fillColor = "hsl(" + (hue-HUE_SHIFT) + ",60%,50%)"
        bottomPost.lineColor = "hsl(" + (hue-HUE_SHIFT) + ",60%,20%)"
        bottomPost.Scale(9,2.5)
        bottomPost.Translate(30,-15)
        this.structures.push(bottomPost)

        this.structures.push(post)
    }

    Reset(){
        super.Reset()
    }
}

class Fence extends Structure {
    constructor() {
        super();
        this.Reset();

        const COMPONENT_WIDTH = 104
        const LOOP_NUMBER = 38
        
        let hue = Math.floor(Math.random()*360)
        let rando


        let first = new FenceComponent(hue)
        this.structures.push(first)
        
        for(let i=1; i < LOOP_NUMBER; i++){
            rando = Math.floor(Math.random()*(240-120)-120)
            rando = RangeOfCircle(rando)
            while(RangeOfCircle(rando+hue) >= RangeOfCircle(hue-50) && RangeOfCircle(rando+hue) <= RangeOfCircle(hue+50)){
                rando = Math.floor(Math.random()*(240-120)-120)
                rando = RangeOfCircle(rando)
            }
            hue += rando
            hue = RangeOfCircle(hue)
            let next = new FenceComponent(hue)
            next.Translate(COMPONENT_WIDTH*i,0)
            this.structures.push(next)
        }
    }

    Reset(){
        super.Reset()
    }
}

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

class TeeterTotter extends Structure {
    #fulcrumSpeed;
    #fulcrumTheta;
    #clockwise;
    #maxRotation;

    constructor() {
        super();
        this.Reset();

        this.#fulcrumSpeed = 1 *(Math.PI/180);
        this.#fulcrumTheta = 0 *(Math.PI/180);
        this.#clockwise = true;
        this.#maxRotation = 35 *(Math.PI/180);

        let fulcrum = new RightTriangle();
        fulcrum.Scale(2, 6);
        fulcrum.Rotate(225);
        this.structures.push(fulcrum);

        let person1 = new Person();
        person1.Scale(0.5,0.5);
        this.structures.push(person1);
        
        let person2 = new Person();
        person2.Scale(0.5,0.5);
        this.structures.push(person2);
    }

    Reset() {
        super.Reset()
    }
    
    DrawStructure(){
        CTX.beginPath()

        // Fulcrum
        this.structures[0].Display();

        // Board
        CTX.save();
            CTX.translate(0, 0);
            CTX.rotate(this.#fulcrumTheta);
            CTX.moveTo(75, 0);
            CTX.lineTo(-75, 0);
            CTX.stroke();
            // Each person
            CTX.save();
                CTX.translate(50, 0);
                CTX.rotate(-this.#fulcrumTheta);
                //CTX.lineWidth = 1/((this.structures[1].scaleX+this.structures[1].scaleY)/2);
                this.structures[1].Display();
            CTX.restore();
            CTX.save();
                CTX.translate(-50, 0);
                CTX.rotate(-this.#fulcrumTheta);
                //CTX.lineWidth = 1/((this.structures[2].scaleX+ this.structures[2].scaleY)/2);
                this.structures[2].Display();
            CTX.restore();
        CTX.restore();

    }

    Tick() {
        if(this.#clockwise) { 
            this.#fulcrumTheta -= this.#fulcrumSpeed;
            if(this.#fulcrumTheta <= -this.#maxRotation) {
                this.#clockwise = false;
            }
        }else {
            this.#fulcrumTheta += this.#fulcrumSpeed;
            if(this.#fulcrumTheta >= this.#maxRotation) {
                this.#clockwise = true;
            }
        }
    }
}

class Swing extends Structure {
    #swingSpeed;
    #swingTheta;
    #clockwise;
    #maxRotation;

    constructor() {
        super();
        this.Reset();

        this.#swingSpeed = 1 *(Math.PI/180);
        this.#swingTheta = 0 *(Math.PI/180);
        this.#clockwise = true;
        this.#maxRotation = 45 *(Math.PI/180);

        let person = new Person();
        person.Scale(0.5,0.5);
        person.Translate(0,0);
        this.structures.push(person);
    }

    Reset() {
        super.Reset()
    }
    
    DrawStructure(){
        CTX.beginPath()
        //CTX.lineWidth = 1/((this.scaleX+this.scaleY)/2);

        // Legs
        CTX.moveTo(0,150)
        CTX.lineTo(-40, 0)
        CTX.moveTo(0,150)
        CTX.lineTo(40, 0)
        CTX.stroke();

        // Rope and swing
        CTX.save();
            CTX.translate(0, 150);
            CTX.rotate(this.#swingTheta);
            CTX.moveTo(0, 0);
            CTX.lineTo(0, -115);
            CTX.moveTo(-10, -115);
            CTX.lineTo(10, -115);
            CTX.stroke();
            // Person
            CTX.save();
                CTX.translate(0, -115);
                CTX.rotate(-this.#swingTheta * 0.5);
                this.structures[0].Display();
            CTX.restore();
        CTX.restore();
    }

    Tick() {
        if(this.#clockwise) { 
            this.#swingTheta -= this.#swingSpeed;
            if(this.#swingTheta <= -this.#maxRotation) {
                this.#clockwise = false;
            }
        }else {
            this.#swingTheta += this.#swingSpeed;
            if(this.#swingTheta >= this.#maxRotation) {
                this.#clockwise = true;
            }
        }
    }
}

class Couple extends Structure {
    #path;
    #movementSpeed;
    #anchor;
    #currentPointIndex;
    #nextPointIndex;
    #currentPoint;
    #nextPoint
    #currentNextPointsDistance;
    #percentAlongPath;
    
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
        this.#anchor = {x: 0, y: 0};
        this.#currentPointIndex = 0;
        this.#nextPointIndex = 1;
        this.#UpdateCurrentAndNextPoints();
        this.translateX += this.#path[0].x + this.#anchor.x;
        this.translateY += this.#path[0].y + this.#anchor.y;
        this.#percentAlongPath = 0;
        
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
        
        this.#UpdateCurrentAndNextPoints();
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
    SetSkirt(index, color){
        this.structures[index-1].Skirt(color);
    }

    SetPath(newPath, newStartPoint = 0) {
        if(newPath.length > 0) {
            this.#path = newPath;
            if(newStartPoint >= this.#path.length || newStartPoint < 0) {   // Protects against index errors
                newStartPoint = 0;
            }
            this.#currentPointIndex = newStartPoint;
            this.#nextPointIndex = this.#IncrementPathIndex(this.#currentPointIndex);
            this.#UpdateCurrentAndNextPoints();
            this.translateX = this.#path[this.#currentPointIndex].x;
            this.translateY = this.#path[this.#currentPointIndex].y;
        }
    }

    Tick() {
        // t = this.#percentAlongPath
        // dt = movementRemaining
        // alpha = currentPoint
        // beta = nextPoint
        let movementRemaining = (this.#movementSpeed / this.#currentNextPointsDistance);
        while(movementRemaining > 0) {
            if(this.#percentAlongPath + movementRemaining < 1) {    // Determines whether to translate to nextPoint or moveTo
                this.#percentAlongPath += movementRemaining;
                this.translateX = LERP(this.#currentPoint.x, this.#nextPoint.x, this.#percentAlongPath); // Note: Not calling this.Translate(x,y) because it will reset the anchor, we don't want that!
                this.translateY = LERP(this.#currentPoint.y, this.#nextPoint.y, this.#percentAlongPath);
                movementRemaining = 0;
            } else {
                movementRemaining = (1 - this.#percentAlongPath);
                this.#percentAlongPath = 0;
                this.translateX = this.#nextPoint.x;
                this.translateY = this.#nextPoint.y;
 
                this.#currentPointIndex = this.#IncrementPathIndex(this.#currentPointIndex);
                this.#nextPointIndex = this.#IncrementPathIndex(this.#nextPointIndex);
                this.#UpdateCurrentAndNextPoints();
            }
        }
    }

    // This version of Tick() was done before I knew about LERP.
    // It's far messier and more complicated than the LERP version,
    // but it still works fine as far as I can tell.    ~Wesley
    /*Tick() {
        // Don't look at this code unless you want to lose
        // your sanity and perish instantly  ~Wesley
        // Ye who wish to live, turn back now

        let movementRemaining = this.#movementSpeed;
        while(movementRemaining > 0) {
            // Calculates angle from currentPoint to nextPoint, reletive to the X-axis
            let direction;
            if(this.#nextPoint.x - this.#currentPoint.x == 0) { // Handles undefined inverse tangent values (90 and 270 degrees)
                if(this.#nextPoint.y - this.#currentPoint.y > 0) {
                    direction = Math.PI / 2;    // Up/90 Degrees
                } else if(this.#nextPoint.y - this.#currentPoint.y < 0) {
                    direction = 3 * Math.PI / 2;    // Down/270 Degrees
                } else {    // Only occurs if given a path of size 1; This prevents the program from breaking
                    direction = 0;
                    movementRemaining = 0;
                }
            } else {    // Calculates angle
                direction = Math.atan(
                    (this.#nextPoint.y - this.#currentPoint.y) /
                    (this.#nextPoint.x - this.#currentPoint.x)
                );
                if(this.#nextPoint.x - this.#currentPoint.x < 0) {  // Adjusts angle if it's supposed to be from 90 to 270
                    direction += Math.PI;
                }
            }

            // Translates either to nextPoint or as far as movementRemaining will allow it
            let moveTo = {
                x: this.translateX + (movementRemaining * Math.cos(direction)),
                y: this.translateY + (movementRemaining * Math.sin(direction))
            }
            let moveDistance = Math.sqrt(
                Math.pow(this.#currentPoint.x - moveTo.x, 2) +
                Math.pow(this.#currentPoint.y - moveTo.y, 2));

            if(moveDistance < this.#currentNextPointsDistance) {    // Determines whether to translate to nextPoint or moveTo
                this.translateX = moveTo.x, // Note: Not calling this.Translate(x,y) because it will reset the anchor, we don't want that!
                this.translateY = moveTo.y;
                movementRemaining = 0;
            } else {
                let distanceCovered = Math.sqrt(
                    Math.pow(this.#nextPoint.x, 2) +
                    Math.pow(this.#nextPoint.y, 2));
                this.translateX = this.#nextPoint.x;
                this.translateY = this.#nextPoint.y;
                movementRemaining -= distanceCovered;

                this.#currentPointIndex = this.#IncrementPathIndex(this.#currentPointIndex);
                this.#nextPointIndex = this.#IncrementPathIndex(this.#nextPointIndex);
                this.#UpdateCurrentAndNextPoints();
            }
        }
    }*/

    #UpdateCurrentAndNextPoints() {
        this.#currentPoint = {
            x: this.#anchor.x + this.#path[this.#currentPointIndex].x,
            y: this.#anchor.y + this.#path[this.#currentPointIndex].y
        }
        this.#nextPoint = {
            x: this.#anchor.x + this.#path[this.#nextPointIndex].x,
            y: this.#anchor.y + this.#path[this.#nextPointIndex].y
        }
        this.#currentNextPointsDistance = Math.sqrt(
            Math.pow(this.#path[this.#currentPointIndex].x - this.#path[this.#nextPointIndex].x, 2) +
            Math.pow(this.#path[this.#currentPointIndex].y - this.#path[this.#nextPointIndex].y, 2));
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


//Helper Functions

function RangeOfCircle(number){
    return number-(360*Math.floor(number/360))
}

function LERP(current, target, t) {
    t = Math.min(t, 1);
    t = Math.max(0, t);
    return (current * (1 - t) + (target * t));
}
