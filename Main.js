"use strict"

// This file contains global variables and initial
// function calls

// Bennett's code, good starting point.
// I would write new stuff above this comment to keep
// it separate from everything below, keeping the
// following to use as a reference.
const canvas = document.getElementById("theCanvas")
const ctx = canvas.getContext("2d")

let items = [];

function Display() {
    Axis();
    for (let i=0; i < items.length; ++i ) {
        items[i].Display(ctx);
    }
}

function Setup() {
    ctx.setTransform(1, 0, 0, -1, canvas.width/2, canvas.height/2);

    BuildItems();
}

Setup();
Display();