"use strict"

// This file contains user input functionality
// so that they may scroll through the world

//The way this works is by moving everything except
//Mr. Smiley the opposite direction of the key.

// Input:
// "a" = scroll left
// "s" = scroll right
// "g" = turn on animation
// "h" = turn off animation

CANVAS.tabIndex = 0;
CANVAS.addEventListener("keydown", UserInput);

const SCROLL_RATE_WORLD = 5;
const SCROLL_RATE_SKY = SCROLL_RATE_WORLD/2;
const XMIN = 0
const XMAX = -2500

function UserInput(event){
    let key = event.key.toLowerCase();
    let stopMove = true;

    switch(key) {
        case 'a':
            if(worldTx + SCROLL_RATE_WORLD < XMIN) {
                worldTx += SCROLL_RATE_WORLD;
                skyTx += SCROLL_RATE_SKY;
            } else{
                worldTx = XMIN;
            }
            break;
        case 's':
            if(worldTx - SCROLL_RATE_WORLD > XMAX) {   // May want to generalize to work with different window sizes
                worldTx -= SCROLL_RATE_WORLD;
                skyTx -= SCROLL_RATE_SKY;
            } else{
                worldTx = XMAX;
            }
            break;
        case 'g':
            if (timer == null) {
                StartTicks();
            }
            break;
        case 'h':
            if (timer != null) {
                StopTicks();
            }
            stopMove = false;
            break;
        case 'i':   //DEBUG KEY
            alert("(DEBUGGER) 'i' has been pressed.");
            alert("worldTx = " + GetValue())
            break;
    }
    if (stopMove && timer==null ) {
        DrawScene();
    }
}

function GetValue() {   //PURELY DEBUGGING PURPOSES
    //return worldTx;
    return items[0].translateX;
}