// ! MAIN STRUCTURES:
// ! INITIAL STATE


// ! Canvas Created
const canvas = document.querySelector('canvas')

// ! Setting the Canvas Size
canvas.width = 500;
canvas.height = 500;
console.log(`Width: ${canvas.width} Height: ${canvas.height}`)

// ! Setting Context
const ctx = canvas.getContext('2d')
const cursorCenterPos = canvas.width/2







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

// * CREATE SPAWNING CIRCLES
function targetSquares(x,y,color, width, height, maxXValue, maxYValue) { 
    this.x = x
    this.y = y
    this.maxXValue = maxXValue
    this.maxYValue = maxYValue
    this.color = color
    this.height = height
    this.width = width

    this.render = function() {
        ctx.filleStyle = this.color
        ctx.fillRect(this.x, this.y, this.color, this.width, this.height, this.maxXValue, this.maxYValue)
    }
}

// ! DRAW () (i.e. Gameloop)
const drawGameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let cursor = new aimPointer(mouseX, mouseY, "red", 5, 5)
    cursor.render();    







requestAnimationFrame(drawGameLoop);
}






// ! FPS/INTERVAL SPEED
let canvasRenderInterval= setInterval(drawGameLoop, 70)







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




























