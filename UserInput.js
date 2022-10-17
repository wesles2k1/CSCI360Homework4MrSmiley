"use strict"

// This file contains user input functionality
// so that they may scroll through the world

// Input:
// "a" = scroll left
// "s" = scroll right
// "g" = turn on animation
// "h" = turn off animation

canvas.tabIndex = 0;
canvas.addEventListener("keydown", UserInput);

const SCROLL_RATE = 5;
const XMIN = 0
const XMAX = -2750

function UserInput(evnt){
    let key = evnt.key;
    let stopMove = true;

    switch(key) {
        case 'a':
            if(worldTx + SCROLL_RATE < XMIN) {
                worldTx += SCROLL_RATE;
            } else{
                worldTx = XMIN;
            }
            break;
        case 's':
            if(worldTx - SCROLL_RATE > XMAX) {   // May want to generalize to work with different window sizes
                worldTx -= SCROLL_RATE;
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
            break;
    }
    if (stopMove && timer==null ) {
        DrawScene();
    }
}