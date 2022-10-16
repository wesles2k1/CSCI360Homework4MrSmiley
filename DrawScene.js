"use strict"

// This file will use the classes to draw objects
// into the world and create a scene

// Bennett's code, good starting point.
// I would write new stuff above this comment to keep
// it separate from everything below, keeping the
// following to use as a reference.const canvas = document.getElementById("theCanvas")
function BuildItems() {

    let item0 = new Polygon();

    items.push(item0);

    let item1 = new  Polygon(4)
    item1.Scale(3, 3);
    item1.Rotate(30);
    item1.Translate(50,50);
    item1.lineColor = "blue";
    item1.fillColor = "green";
    items.push(item1);

    // just to show I can
    console.log(item1.scaleX);
    // uses the getter
    console.log(item1.lineColor);

    // and I can't
    //console.log(item1.#points)
    //console.log(item1.#lineColor);

    let item2 = new  Polygon(8)
    item2.Scale(4,4);
    item2.Rotate(10);
    item2.Translate(-80,80);
    item2.lineColor = "cyan";
    item2.fillColor = "magenta";
    items.push(item2);

    let item3 = new Plus();
    item3.lineColor = "red";
    item3.Translate(-20, -20);
    items.push(item3);
}

function Axis() {
   let halfW = canvas.width/2;
   let halfH = canvas.height/2;
   ctx.lineStyle = "black";

   ctx.moveTo(-halfW,0);
   ctx.lineTo(halfW,0);
   ctx.moveTo(0, -halfH);
   ctx.lineTo(0, halfH);

   ctx.stroke();
}