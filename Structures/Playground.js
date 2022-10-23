"use strict"

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

function RangeOfCircle(number){
    return number-(360*Math.floor(number/360))
}

function LERP(current, target, t) {
    t = Math.min(t, 1);
    t = Math.max(0, t);
    return (current * (1 - t) + (target * t));
}
