"use strict"

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

//Helper Functions

function RangeOfCircle(number){
    return number-(360*Math.floor(number/360))
}

function LERP(current, target, t) {
    t = Math.min(t, 1);
    t = Math.max(0, t);
    return (current * (1 - t) + (target * t));
}
