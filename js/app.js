// ! MAIN STRUCTURES:
// ! INITIAL STATE


// ! Canvas Created
const canvas = document.querySelector('canvas')

// ! Setting the Canvas Size
// canvas.width = 512;
// canvas.height = 512;
// console.log(`Width: ${canvas.width} Height: ${canvas.height}`)

// ! Setting Context
const ctx = canvas.getContext('2d')
const cursorCenterPos = canvas.width/2

// ctx.strokeStyle = "#342"
// gridSize = 16

// drawGrid(ctx, gridSize);

// function drawGrid(ctx, size) { // Hoisting this function to the top
//     const w = ctx.canvas.width;
//     const h = ctx.canvas.height;
//     ctx.beginPath();
//     for (var x=0;x<=w;x+=size){
//         ctx.moveTo(x-0.5,0);      // 0.5 offset so that 1px lines are crisp
//         ctx.lineTo(x-0.5,h);
//     }
//     for (var y=0;y<=h;y+=size){
//         ctx.moveTo(0,y-0.5);
//         ctx.lineTo(w,y-0.5);
//     }
//     ctx.stroke();               // Only do this once, not inside the loops
// }


ctx.canvas.width = ctx.canvas.height = 512;

ctx.strokeStyle = "#009"; // Do this once only
drawGrid(ctx,16);

function drawGrid(ctx,size){
  var w = ctx.canvas.width,
      h = ctx.canvas.height;
  ctx.beginPath();
  for (var x=0;x<=w;x+=size){
    ctx.moveTo(x-0.5,0);
    ctx.lineTo(x-0.5,h);
  }
  for (var y=0;y<=h;y+=size){
    ctx.moveTo(0,y-0.5);
    ctx.lineTo(w,y-0.5);
  }
  ctx.stroke();
}





// ! OBJECT CLASSES
// * CREATE POINTER CLASS FOR CURSOR
function aimPointer(x, y, color, width, height) {
    // * Object Properties
    this.x = x
    this.y = y
    this.color = color
    this.height = height
    this.width = width

    // * Object Methods

    this.render = function() {
        ctx.fillStyle= this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

// * CREATE SPAWNING CIRCLES/SQUARES
function targetSquares(x, y, color, width, height,) { 
    this.x = x
    this.y = y
    this.color = color
    this.height = height
    this.width = width
    this.alive = true;

    this.render = function() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

function getRandomSpawn(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}


// * SPAWNING MULTIPLE INSTANCES OF TARGETSQUARES
const allTargets = []
function spawnTarget() {
    setInterval(() => {
        const x = getRandomSpawn(0,512)
        const y = getRandomSpawn(0,512)
        const color = "red"
        const h = 25
        const w = 25
        allTargets.push(new targetSquares(x, y, color, h, w))
    }, 1000)
    console.log(allTargets)
}
spawnTarget()

// * CLICK/COLLISION DETECTION
if (
    player.x < thing.x + thing.width &&
    player.x + player.width > thing.x &&
    player.y < thing.y + thing.height &&
    player.y + player.height > thing.y &&
    (clickPosition(true))
)

// ! DRAW () (i.e. Gameloop)
const drawGameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let cursor = new aimPointer(mouseX, mouseY, "red", 2, 2)
    console.log(cursor)
    cursor.render();    
    allTargets.forEach((target) => {
        target.render();
    })
    // console.log(mouseX, mouseY)










requestAnimationFrame(drawGameLoop);
}
drawGameLoop();





// ! FPS/INTERVAL SPEED
// let canvasRenderInterval= setInterval(drawGameLoop, 500)







// ! UPDATE()
// ! MOVEMENT FUNCTIONS
var mouseX = 0;
var mouseY = 0;
canvas.addEventListener("mousemove", setMousePosition, false)


function setMousePosition (event) { // ! Mouse Event to get X & Y Position
    mouseX = event.clientX - canvasPosition.x;
    mouseY = event.clientY - canvasPosition.y;
}


// ! HELPER FUNCTION TO GET EXACT MOUSE POSITION RELATIVE TO CANVAS
let getPosition = (curs) => {
    let xPos = 0;
    let yPos = 0;

    while (curs) {
        xPos += (curs.offsetLeft - curs.scrollLeft + curs.clientLeft)
        yPos += (curs.offsetTop - curs.scrollTop + curs.clientTop)
        curs = curs.offsetParent
    }

    return {
        x: xPos,
        y: yPos
    }
}

let canvasPosition = getPosition(canvas)

canvas.addEventListener("click", clickPosition)

function clickPosition (event) {
    console.log(`You clicked at ${mouseX}, ${mouseY}`)
    return true
} 
