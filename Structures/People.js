"use strict"

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
class Couple extends Structure {
    #path;
    #reversePath;
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
        this.#reversePath = false;
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

    // If no parameter is passed, this.#reversePath is flipped
    ReversePath(reverse = !this.#reversePath) {
        this.#reversePath = reverse;
        if(!this.#reversePath) {
            this.#nextPointIndex = this.#IncrementPathIndex(this.#currentPointIndex);
        } else {
            this.#nextPointIndex = this.#DecrementPathIndex(this.#currentPointIndex);
        }
        this.#UpdateCurrentAndNextPoints();
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
                
                if(!this.#reversePath) {
                    this.#currentPointIndex = this.#IncrementPathIndex(this.#currentPointIndex);
                    this.#nextPointIndex = this.#IncrementPathIndex(this.#nextPointIndex);
                } else {
                    this.#currentPointIndex = this.#DecrementPathIndex(this.#currentPointIndex);
                    this.#nextPointIndex = this.#DecrementPathIndex(this.#nextPointIndex);
                }
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

    #DecrementPathIndex(index) {
        if(index == 0) {
            index = (this.#path.length - 1);
        } else {
            index--;
        }
        return(index)
    }
}


function RangeOfCircle(number){
    return number-(360*Math.floor(number/360))
}

function LERP(current, target, t) {
    t = Math.min(t, 1);
    t = Math.max(0, t);
    return (current * (1 - t) + (target * t));
}
