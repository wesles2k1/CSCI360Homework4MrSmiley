"use strict"

// This file will use the classes to draw objects
// into the world and create a scene
let paths = {
    zigzag : [
        {x: -50, y: 0},
        {x: 50, y: 0},
        {x: 0, y: 25},
        {x: 0, y: -25}
    ],
    diamond : [
        {x: -25, y: 0},
        {x: 0, y: 25},
        {x: 25, y: 0},
        {x: 0, y: -25}
    ],
    still : [
        {x: 0, y:0}
    ],
    figureeight : [
        {x: -50, y: 0},
        {x: -25, y: 25},
        {x: 25, y: -25},
        {x: 50, y: 0},
        {x: 25, y: 25},
        {x: -25, y: -25}
    ]
}
function BuildScene() {

    let sky = new Sky();
        background.objects.push(sky);
    
    let ground = new Ground();
        items.push(ground)

    let fence = new Fence()
        fence.Translate(-50,90)
        fence.Scale(.67,.67)
        items.push(fence)

    let swing = new Swing();
        swing.Translate((Math.random()*2500), 25);
        swing.Scale(0.75);
        items.push(swing);

    let teeterTotter = new TeeterTotter();
        teeterTotter.Translate(RoundInSteps(Math.random()*2500-100, 12, 100), 50);
        teeterTotter.Scale(0.75);
        items.push(teeterTotter);

    let couple = new Couple();
        couple.SetFaceColor(2,"pink");
        couple.SetEyeColor(1,"red");
        couple.SetHeight(1,10);
        couple.SetSkirt(2,"pink")
        couple.SetPath(paths.figureeight, -4);
        couple.Translate(RoundInSteps(Math.random()*2500, 17), 0);
        items.push(couple);

    let gay = new Couple();
        gay.SetFaceColor(1,"#F874A1");
        gay.SetFaceColor(2,"#1BCF47");
        gay.SetSkirt(1,"#FF8FAD")
        gay.SetSkirt(2,"#E6EE2F")
        gay.SetPath(paths.zigzag,0)
        gay.SetHeight(1,9)
        gay.SetHeight(2,11)
        gay.Translate(RoundInSteps(Math.random()*2500, 15),-10)
        items.push(gay)
    
    let house = new House();
        house.Translate(-150, 0)
        items.push(house);

    let school = new School();
        school.Translate(2650, 0);
        school.Scale(-1, 1);
        items.push(school);

}

function DrawScene() {
    CTX.clearRect(0, 0, WIDTH, HEIGHT);

    CTX.save();
        CTX.setTransform(1, 0, 0, -1, WIDTH/2, HEIGHT/2); // Base world orientation
        
        CTX.save();
            CTX.translate(background.parallaxMultiplier * worldTx, 0);  // Parallaxes the background

            for (let i=0; i < background.objects.length; ++i ) {
                background.objects[i].Display();
                if(!stopMove){
                    background.objects[i].Tick()
                }
            }
        CTX.restore();

        CTX.save();
            CTX.translate(worldTx, 0);  // Translates the world

            for (let i=0; i < items.length; ++i ) {
                items[i].Display();
                if(!stopMove){
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


//Helper Functions

function RoundInSteps(number, step, min = 0) {
    return Math.ceil((number - min) / step ) * step + min;
}
