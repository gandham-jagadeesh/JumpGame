import kaboom from "kaboom";


kaboom();

loadSprite("hinata","./sprites/tile001.png");
setGravity(2400);


scene("game",()=>{

    const hinata = add([
        sprite("hinata"),
       pos(40,80),
        area(),
        body(),
    ]);
    
    
    const ground = add([
      rect(width(),48),
      pos(0,height()-48),
      outline(3),
      area(),
      body({isStatic:true}),
      color(127,200,255),
    ]);

      function jump (){
        
            if(hinata.isGrounded()){
             hinata.jump(800)
            }     
    }
      
      
    onKeyPress("space",jump);
    onClick(jump);
    
    function spawnTree(){
        const obstacle = add([
            rect(50,rand(50,64)),
            area(),
            outline(),
            pos(width(),height()-48),
            anchor("botleft"),
            color(255,180,255),
            move(LEFT,240),
            "tree"
        ]);
    
        wait(rand(0.5,1.5),()=>{
            spawnTree()
        })
    };
    
    spawnTree()
    

    

 let score = 0;
 const scoreLabel = add([
    text(score),
    pos(24,24)
 ]);
 
 onUpdate(()=>{
    score++;
    scoreLabel.text=score;
 });

    hinata.onCollide("tree",()=>{
      go("lose",score+10000);
      addKaboom(hinata.pos);
      shake();
    });
    
    

})

scene("lose",(score)=>{
  
    add([
        sprite("hinata"),
        pos(width()/2,height()/2-80),
        scale(1),
        anchor("center"),
    ]);


      add([
        text("game over"+" "+score),
        pos(width()/2,height()/2+80),
        scale(2),
        anchor("center")
    ])


   onKeyPress("space",()=>(go("game")));
    onClick(()=>go("game"));
 
})




go("game");