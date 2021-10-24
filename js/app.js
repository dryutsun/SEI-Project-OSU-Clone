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

ctx.canvas.globalCompositeOperation = "destination-over"
// ! Selectors
scoreBoard = document.querySelector("#score")

ctx.canvas.width = ctx.canvas.height = 512;
ctx.canvas.fillStyle = "black"
ctx.canvas.fillRect = (0,0, canvas.width, canvas.height)



canvas.addEventListener("click", clickPosition)

let clickScore = 0


function clickPosition (event) {
    console.log(`You clicked at ${mouseX}, ${mouseY}`)
    
    // ! IMPORTANT: FOR EVERY targetCircle Generated, I need to check if it has been clicked.
    allTargets.forEach((target) => { 
        let clickEvent = target.clicked(mouseX, mouseY)
        if (clickEvent == true) {
            clickScore++
            score.innerText = clickScore
            console.log(clickScore)
            allTargets.splice(target, 1) // ! Should I use filter() instead?
        } else {
            "You missed."
        }
        // isClicked(target, mouseX, mouseY)
    })
    ;
} 

// function isClicked(target, mouseX, mouseY)
//      target.x COMPARE mouseX
//      target.y COMPARE mouseY

// TODO: Can I abstract out the .clicked function into the event handler instead of each individual targetCircle instance.
// TODO: Weird bug that clicks multiple circles or double clicked? ! SOLVED

// * object spawning should only be able to be spawned if they are at least two radius's apart from each other.



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
function targetCircles(x, y, r, startRadian, endRadian, color) { 
    this.x = x
    this.y = y
    this.r = r
    this.startRadian = startRadian
    this.endRadian = endRadian * Math.PI
    this.color = color
    // ! need to create a max r value that circle r will increment to until it reaches the max
    // ! then it will decrement until it becomes negative at which point it should be "removed"
    // ! from the canvas but not in the same way as a successful click does, it should then be
    // ! stored in a "missed" array.
    // * RENDERING
    this.render = function() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, this.startRadian, this.endRadian)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    }
    // * CLICK DETECTION
    
    this.clicked = function() { // https://codeboxsystems.com/tutorials/en/how-to-drag-and-drop-objects-javascript-canvas/
        let x1 = this.x
        let y1  = this.y
        console.log(x1, y1)      
        let distance = Math.sqrt(((mouseX - x1) ** 2) + ((mouseY - y1) ** 2)) // <--- forgot to sqrt lol
        // distance = 
        if (distance < this.r) {
            this.color = "green"
            return true

        } else {
            return false
        }
    }


}

function getRandomSpawn(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}



// ! arc(x, y, radius, startAngle, endAngle, counterclockwise)






// * SPAWNING MULTIPLE INSTANCES OF TARGETSQUARES
const allTargets = []
function spawnTarget() {
    setInterval(() => {
        const spawnX = getRandomSpawn(0,512)
        const spawnY = getRandomSpawn(0,512)
        const r = 20
        const sr = 0
        const er = 2 * Math.PI
        const color = "orange"
        // ? Do I write the logic for spawn distance here?
        allTargets.push(new targetCircles(spawnX, spawnY, r, sr, er, color))
    }, 1000)
    console.log(allTargets)
}
spawnTarget()

// * CLICK/COLLISION DETECTION
// if (
//     player.x < thing.x + thing.width &&
//     player.x + player.width > thing.x &&
//     player.y < thing.y + thing.height &&
//     player.y + player.height > thing.y &&
//     (clickPosition(true))
// ) 

// ! DRAW () (i.e. Gameloop)
drawGameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let cursor = new aimPointer(mouseX, mouseY, "red", 10, 10)
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
let getPosition = (canvas) => {
    let xPos = 0;
    let yPos = 0;

    while (canvas) {
        xPos += (canvas.offsetLeft - canvas.scrollLeft + canvas.clientLeft)
        yPos += (canvas.offsetTop - canvas.scrollTop + canvas.clientTop)
        canvas = canvas.offsetParent
    }

    return {
        x: xPos,
        y: yPos
    }
}

let canvasPosition = getPosition(canvas)

