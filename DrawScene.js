"use strict"

// This file will use the classes to draw objects
// into the world and create a scene

// "BuildItems" is from Bennett, I haven't looked at it closely yet ~Wesley
function BuildItems() {

    let item0 = new Polygon();

    items.push(item0);

    let item1 = new Polygon(4)
    item1.Scale(3, 3);
    item1.Rotate(30);
    item1.Translate(50,50);
    item1.lineColor = "blue";
    item1.fillColor = "green";
    items.push(item1);

    let item2 = new Polygon(8)
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

    let item4 = new Polygon(9)
    item4.lineColor = "red"
    item4.fillColor = "rgba(0,0,0,0)"
    item4.Rotate(90)
    item4.Scale(12,12)
    item4.Translate(100,-100)
    items.push(item4)
}

function DrawScene() {
    CTX.clearRect(0, 0, width, height);
    CTX.save();

    CTX.setTransform(1, 0, 0, -1, CANVAS.width/2, CANVAS.height/2); // Base world orientation
    
    CTX.translate(worldTx, 0);

    for (let i=0; i < items.length; ++i ) {
        items[i].Display();
    }

    CTX.restore();

    Axis(); // Eventually replace with MrSmiley since that and Axis are both constant reletive to viewer
}

function Axis() {
    CTX.strokeStyle = "black";
    CTX.beginPath();

    CTX.moveTo(0, height/2);
    CTX.lineTo(width,height/2);

    CTX.moveTo(width/2,0);
    CTX.lineTo(width/2,height);
    CTX.stroke();
}