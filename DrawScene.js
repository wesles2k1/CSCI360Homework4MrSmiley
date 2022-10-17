"use strict"

// This file will use the classes to draw objects
// into the world and create a scene

// "BuildItems" is from Bennett, I haven't looked at it closely yet ~Wesley
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

function DrawScene() {
    ctx.clearRect(0, 0, width, height);
    ctx.save();

    ctx.setTransform(1, 0, 0, -1, canvas.width/2, canvas.height/2); // Base world orientation
    
    ctx.translate(worldTx, 0);

    for (let i=0; i < items.length; ++i ) {
        items[i].Display(ctx);
    }

    ctx.restore();

    Axis(); // Eventually replace with MrSmiley since that and Axis are both constant reletive to viewer
}

function Axis() {
    ctx.strokeStyle = "black";
    ctx.beginPath();

    ctx.moveTo(0, height/2);
    ctx.lineTo(width,height/2);

    ctx.moveTo(width/2,0);
    ctx.lineTo(width/2,height);
    ctx.stroke();
}