"use strict"

// This file will use the classes to draw objects
// into the world and create a scene

// "BuildItems" is from Bennett, I haven't looked at it closely yet ~Wesley
// There's not much to look at. It's just a playground for us to fuck around with shapes - M
function BuildShapes() {
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

    let item5 = new Circle();
    item5.lineColor = "green"
    item5.fillColor = "rgba(0,0,0,0)"
    item5.Scale(10,10)
    items.push(item5)

    let item6 = new Star();
    item6.lineColor = "Blue"
    item6.fillColor = "rgba(0,0,0,0)"
    item6.Rotate(78)
    item6.Scale(10,10)
    item6.Translate(190,190)
    items.push(item6)

    let item7 = new Rectangle();
    item7.lineColor = "Blue"
    item7.fillColor = "rgba(0,0,0,0)"
    item7.Scale(10, 10)
    item7.Scale(6,8)
    item7.Translate(-120,-180)
    items.push(item7)

    let item8 = new RightTriangle()
    item8.Scale(100,100)
    item8.Translate(120,-120)
    items.push(item8)

}

function BuildItems(){
    let mrSmileyInTheFlesh = new Person();
    items.push(mrSmileyInTheFlesh);
}

function BuildScene() {

    let sky = new Sky();
    background.objects.push(sky);
    
    let ground = new Ground();
    items.push(ground)

    let item8 = new RightTriangle() // Just to test out parallax
    item8.Scale(5,5)
    item8.Translate(120,-120)
    items.push(item8)
    
}

function DrawScene() {
    CTX.clearRect(0, 0, WIDTH, HEIGHT);

    CTX.save();
        CTX.setTransform(1, 0, 0, -1, WIDTH/2, HEIGHT/2); // Base world orientation
        
        CTX.save();
            CTX.translate(background.parallaxMultiplier * worldTx, 0);  // Parallaxes the background

            for (let i=0; i < background.objects.length; ++i ) {
                background.objects[i].Display();
                if(timer != null){
                    background.objects[i].Tick()
                }
            }
        CTX.restore();

        CTX.save();
            CTX.translate(worldTx, 0);  // Translates the world

            for (let i=0; i < items.length; ++i ) {
                items[i].Display();
                if(timer != null){
                    items[i].Tick()
                }
            }
        CTX.restore();

        let theManHimself = new Person()
        theManHimself.Scale(0.8,0.8);
        theManHimself.Translate(0, -100);
        theManHimself.Display()
    CTX.restore();
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