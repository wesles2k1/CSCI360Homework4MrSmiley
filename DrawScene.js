"use strict"

// This file will use the classes to draw objects
// into the world and create a scene

function BuildScene() {

    let sky = new Sky();
    background.objects.push(sky);
    
    let ground = new Ground();
    items.push(ground)

    let couple = new Couple();
    couple.SetFaceColor(2,"pink");
    couple.SetEyeColor(1,"red");
    couple.SetHeight(1,10);
    let newPath = [
        {x: -25, y: 0},
        {x: 25, y: 0},
        {x: 0, y: 25},
        {x: 0, y: -25}
    ];
    couple.Path(newPath);   // Second parameter, custom start point, doesn't quite work yet
    //couple.Translate(100, 0); // For some reason, translates Couple, but not Couple's path? Kinda broken for now
    items.push(couple);

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