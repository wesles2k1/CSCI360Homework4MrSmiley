"use strict"

// This file contains the base class for
// structures to be derived from
// Structures are made up of shapes and
// other structures

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
        theta *= Math.PI / 180;
        this.rotate += theta;
        if(this.rotate >= 2*Math.PI) {
            this.rotate -= 2*Math.PI
       }
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