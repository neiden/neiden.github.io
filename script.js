/*TODO: 
    > Find map pack and create a level layout []
    > Smooth tile scroll                      []
        - Add a small space the player can move
        without the camera locking
    > Create function to load all assets      []
    > Clean up frames when switching state    []
        - Need to set back to 0
    > Smooth horizontal collision             []
        - Maybe unique animation for when
        user is intentionally pushing 
        against a wall
    > Fix vertical collision                  []
        - fix jumping into platforms above player
        - find a way to work without
        using vertRect.y - 1
    > Add sounds                              []
    


    > Sprint jump ??                          [X]
    > Implement tile scrolling                [x]

*/

const FPS = 60;
var debugMode = false;

const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d'); 
const origin = [window.innerWidth/2, window.innerHeight/2];
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const img = new Image();
const bgImg = new Image();
const bgLayer1 = new Image();
const bgLayer2 = new Image();
const bgLayer3 = new Image();
const bgLayer4 = new Image();



const experiencePlaqueImg = new Image();
//512, 768
const experiencePlaqueOrigin = [1700, -60];
var experiencePlaque = new GameObject(ctx, experiencePlaqueOrigin[0], experiencePlaqueOrigin[1], 1000, 768, experiencePlaqueImg, 0, 0);

const START_POS_X = 0 
const START_POS_Y = 158
const MAP_EDGE = 1000
var globalXPos = 0
var globalYPos = 0

bgLayer1.src = './assets/backgrounds/2.1.png';
bgLayer2.src = './assets/backgrounds/2.2.png';
bgLayer3.src = './assets/backgrounds/2.3.png';
bgLayer4.src = './assets/backgrounds/2.4.png';

experiencePlaqueImg.src = './assets/objects/VerticalPlaqueTest.png';

var assets = [experiencePlaque];

background = new BackgroundParallax([bgLayer1, bgLayer2, bgLayer3, bgLayer4], ctx, window.innerWidth, window.innerHeight);

bgImg.src = './assets/backgrounds/example.png';
bgImg.addEventListener("load", () => {
},
"false",);
img.src = './assets/player1/WALK.png';
img.addEventListener("load",    () => {
},
"false",);

const aUpImg = new Image();
const aDownImg = new Image();
const bUpImg = new Image();
const bDownImg = new Image();
const leftUpImg = new Image();
const leftDownImg = new Image();
const rightUpImg = new Image();
const rightDownImg = new Image();

var test = "test";

aUpImg.src = './assets/ui/aUp3.png';
aDownImg.src = './assets/ui/aDown.png';

var aButton = new GameObject(ctx, window.innerWidth - 200, window.innerHeight - 200, 500,  500, aUpImg, 0, 0);

function respawn(){
  player.xVel = 0
  player.yVel = 0 
  player.x = window.innerWidth / 2;
  player.y = window.innerHeight / 2 - 100;
  globalYPos = START_POS_Y
  globalXPos = START_POS_X
  this.tileMap.tiles.forEach((tile) => {
    tile.x = tile.originX;
    tile.y = tile.originY;
  });
  this.tileMap.cosmeticTiles.forEach((tile) => {
    tile.x = tile.originX;
    tile.y = tile.originY;
  }); 
  this.assets.forEach((asset) => {
    experiencePlaque.x = experiencePlaqueOrigin[0];
    experiencePlaque.y = experiencePlaqueOrigin[1];
  });
}

const bg = new GameObject(ctx, 0, 0, 1728, 1080, bgImg, 0, 0);
var player = new Player(ctx, window.innerWidth/2, window.innerHeight/2 - 100, 32, 32, img, 0, 0);



var cameraLocked = false;


var keymap = {
    16: 'shiftLeft',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

var keydown = {};

document.addEventListener('keydown', function(e){
    keydown[keymap[e.which]] = true;
})

document.addEventListener('keyup', function(e){
    keydown[keymap[e.which]] = false;
});


var backgroundMusic = new Audio('./assets/sounds/background.mp3');


var breakout = 0;
var delta = Date.now();
//1.) Handle Inputs
//2.) Update game state
//3.) Render game
function tick(){
  var now = Date.now();   
  if (now - delta > (1000/FPS)){
    

    backgroundMusic.play();
    //console.log(keydown, player.state, player);
    //Inputs
    player.input(keydown);
    
    if (keydown['right']){
      aButton.img = aDownImg;
    }
    else{
      aButton.img = aUpImg;
    }
    //Update
    if(Math.abs(player.xVel) > .0015){
        player.xVel *= .85;
    }
    else{
        player.xVel = 0;
    }

    if (player.yVel < 15){
        player.yVel += 1;
    }
    
    let playerHeadHitbox = {
      x: player.x,
      y: player.y + player.yVel,
      width: player.width * player.sizeMultiplier - 30,
      height: (player.height * .25) * player.sizeMultiplier
    }
    let playerFeetHitbox = {
        x: player.x,
        y: player.y + player.yVel + (player.height *  1.5),
        width: player.width * player.sizeMultiplier - 30,
        height: player.sizeMultiplier * (player.height * .25)
    }
    
    let horzRect = {
        x: player.x + player.xVel,
        y: player.y , 
        width: player.width * player.sizeMultiplier - 30,
        height: player.height * player.sizeMultiplier
    }
    
    this.tileMap.tiles.forEach((tile) => {
        if (player.isIntersected(tile, horzRect)){
            while(player.isIntersected(tile, horzRect)){
                horzRect.x += -Math.sign(player.xVel);
                breakout += 1;
                // if (breakout > 200){
                //   console.log("bad bad bad");
                //   breakout = 0;
                //   break;
                // }
                
            }
            player.x = horzRect.x;
            player.xVel = 0;
        }
        else if(player.isIntersected(tile, playerFeetHitbox) && Math.abs(player.yVel > 0)){
            while(player.isIntersected(tile, playerFeetHitbox)){ 
                playerFeetHitbox.y += -Math.sign(player.yVel);
            }
          player.y = playerFeetHitbox.y - player.height * 1.5;  
          player.yVel = 0;
            if (Math.abs(player.xVel) > 0) {
                player.changeState("runState");
            }
            else{
                player.changeState("idleState");
            }
        }
        if (player.isIntersected(tile, playerHeadHitbox)){
          while(player.isIntersected(tile, playerHeadHitbox)){
            playerHeadHitbox.y += -Math.sign(player.yVel);
          }
          player.yVel = 0 // consider adding a value here for a 'bounce' back down when hitting ceilings
          player.y = playerHeadHitbox.y;
          player.changeState("jumpState")// TODO update this to a falling state
        }
         
    });

    if (originDistance()){
        this.tileMap.tiles.forEach((tile) => {
            tile.x += -player.xVel;
            tile.y += -player.yVel;
        });
        this.tileMap.cosmeticTiles.forEach((tile) => {
            tile.x += -player.xVel;
            tile.y += -player.yVel;
        });
        this.assets.forEach((asset) => {
          asset.x += -player.xVel;
          asset.y += -player.yVel;
        })
    }
    else{
        player.x += player.xVel;
        player.y += player.yVel;
    }
    globalYPos += player.yVel;
    globalXPos += player.xVel;
  
    // Player falls off gameScreen
   //  console.log("Global Y position: " + globalYPos + " Global X position: " + globalXPos)
    if (globalYPos > 800){
      respawn();
    }

    //Render
    if(player.img.complete == true && bg.img.complete == true){
       // bg.render();
        background.render();
        tileMap.render(ctx);
        assets.forEach((asset) => asset.render());
        player.render();
        aButton.render();
 
        if (debugMode){
          ctx.beginPath(); 
          ctx.fillStyle = "blue";
          ctx.rect(playerHeadHitbox.x, playerHeadHitbox.y, playerHeadHitbox.width, playerHeadHitbox.height);
          ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = "green";
          ctx.rect(horzRect.x, horzRect.y, horzRect.width, horzRect.height);
          ctx.fill();

          ctx.beginPath(); 
          ctx.fillStyle = "red";
          ctx.rect(playerFeetHitbox.x, playerFeetHitbox.y, playerFeetHitbox.width, playerFeetHitbox.height);
          ctx.fill();
        }
    }

    window.requestAnimationFrame(tick);
    delta = now - (delta % (1000/FPS));
  }
  else{
    window.requestAnimationFrame(tick);
    console.log("too fast");
  }
}

//TODO actually implement and use division of distance to create sliding camera effect
function originDistance(){
    let xDistance = player.x - origin[0] + player.xVel;
    let yDistance = player.y - origin[1] + player.yVel;
    //console.log("player is this far from origin: ", xDistance, yDistance);
    return Math.abs(xDistance) > 30 || Math.abs(yDistance) > 100;
}


var tileMap = new TileMap("./assets/backgrounds/Tileset2.png", "temp", 32, window.innerWidth / 2 - 75 , window.innerHeight / 2 - 390);


window.requestAnimationFrame(tick);

