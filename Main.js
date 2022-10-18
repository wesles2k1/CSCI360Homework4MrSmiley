"use strict"

// This file contains global variables and initial
// function calls

const DEBUG_TURN_ON_SHAPES = false
const DEBUG_TURN_ON_ITEMS = false

const FPS = 60;
const REFRESH_RATE = 1000/FPS;

const CANVAS = document.getElementById("theCanvas");
const CTX = CANVAS.getContext("2d");
let width = CANVAS.width;
let height = CANVAS.height;

let timer = null;
let items = [];
let worldTx = 0;

function StartTicks() {
    timer = setInterval(DrawScene, REFRESH_RATE);
}

function StopTicks() {
    if (timer != null) {
       clearInterval(timer);
       timer = null
    }
}

if(DEBUG_TURN_ON_SHAPES){
    BuildShapes();
}
if(DEBUG_TURN_ON_ITEMS){
    BuildItems();
}
DrawScene();