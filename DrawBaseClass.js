"use strict"

// This file contains the base class for
// drawable objects to be derived from

// Based off of code by Dan Bennett
class Drawable {
        translateX;
        translateY;
        rotate;
        scaleX;
        scaleY;
        #lineColor;
        fillColor;

    constructor() {
        this.Reset();
    }

    set lineColor( value) {
       this.#lineColor = value; 
    }

    get lineColor() {
       return this.#lineColor;
    }

    set fillColor(value) {
       this.fillColor = value;
    }

    get fillColor() {
        return this.fillColor;
    }

    Reset() {
        this.translateX = 0;
        this.translateY = 0;
        this.rotate = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.lineColor = "black";
        this.fillColor = "red";
    }

    Tick() {
    }

    Scale(sx,sy) {
        this.scaleX = sx;
        this.scaleY = sy;
    }

    Rotate(theta) {
        this.rotate = theta;
    }

    Translate(tx, ty) {
        this.translateX = tx;
        this.translateY = ty;
    }

    DrawObject(ctx) {
    }

    Display(ctx) {
       ctx.save();

       ctx.translate(this.translateX, this.translateY);
       ctx.scale(this.scaleX, this.scaleY);
       ctx.rotate(this.rotate);

       ctx.fillStyle = this.fillColor;
       ctx.strokeStyle = this.lineColor;
 
       this.DrawObject(ctx);

       ctx.restore();
    }
}