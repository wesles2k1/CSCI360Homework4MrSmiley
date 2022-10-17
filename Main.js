"use strict"

// This file contains global variables and initial
// function calls

const FPS = 60;
const REFRESH_RATE = 1000/FPS;

const canvas = document.getElementById("theCanvas");
const ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

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

BuildItems();
DrawScene();