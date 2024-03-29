"use strict"

// This file contains global variables and initial
// function calls

// ****************
// GLOBAL VARIABLES
// ****************

const FPS = 60; // Ticks/Frames per second
const REFRESH_RATE = 1000/FPS;

const CANVAS = document.getElementById("theCanvas");
const CTX = CANVAS.getContext("2d");
const WIDTH = CANVAS.width;
const HEIGHT = CANVAS.height;
const HORIZON = HEIGHT/3

let timer = null;
let stopMove = true;

// Background and Items could be combined into a
// "Layers" array. Accessing gets a little messy,
// but multiple layers could be made, each with
// their very own parallax multipliers  ~Wesley
let background = {
    objects: [],
    parallaxMultiplier: 0.25
}
let items = [];

let worldTx = 0;
let skyTx = 0;

// *********
// FUNCTIONS
// *********

function StartTicks() {
    timer = setInterval(DrawScene, REFRESH_RATE);
}

function StopTicks() {
    if (timer != null) {
       clearInterval(timer);
       timer = null
    }
}

// *****
// CALLS
// *****

BuildScene();
DrawScene();