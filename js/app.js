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
const cursorCenterPos = canvas.width / 2

// ctx.canvas.globalCompositeOperation = "destination-over"
// ! Selectors
scoreBoard = document.querySelector("#score")

ctx.canvas.width = ctx.canvas.height = 900;
// ctx.canvas.fillStyle = "black"
// ctx.canvas.fillRect = (0,0, canvas.width, canvas.height)



canvas.addEventListener("click", clickPosition)

let clickScore = 0


function clickPosition(event) {
    console.log(`You clicked at ${mouseX}, ${mouseY}`)

    // ! IMPORTANT: FOR EVERY targetCircle Generated, I need to check if it has been clicked.
    // TODO: Rewrite as a for loop since forEach cannot iterate backwards. 
    // * Because we were iterating through an array that was being spliced, it could not be reindexed correctly.
    // * Stack Overflow reccomended to iterate backwards. Another solution was to use filter and reassing allTargets to itself.

    // !The algorithmic complexity of this approach is O(n^2) as splice function and the for loop both iterate over the array (splice function shifts all elements of array in the worst case). Instead you can just push the required elements to the new array and then just assign that array to the desired variable (which was just iterated upon). https://stackoverflow.com/questions/9882284/looping-through-array-and-removing-items-without-breaking-for-loop

    function myPlay() {
        var audio = new Audio("/assets/clicksound.mp3");
        audio.play();
    }

    function checkState(){
    for (i = allTargets.length - 1; i >= 0; i--) {
        let clickEvent = allTargets[i].clicked(mouseX, mouseY)
        let minGrowth = allTargets[i].r
        if (clickEvent == true) {
            clickScore++
            score.innerText = clickScore
            myPlay();}

        // } else if (allTargets[i].r == 1) {
        //     allTargets.splice(i, 1)
        //     console.log("You missed")
        // }
    }

}


// allTargets.forEach((target) => { 
//     let clickEvent = target.clicked(mouseX, mouseY)
//     console.log(allTargets)
//     if (clickEvent == true) {
//         clickScore++
//         score.innerText = clickScore
//         console.log(clickScore)
//         allTargets.splice(target, 1) // ! Should I use filter() instead?
//     } else {
//         "You missed."
//     }
//     // isClicked(target, mouseX, mouseY)
// })



// function isClicked(target, mouseX, mouseY)
//      target.x COMPARE mouseX
//      target.y COMPARE mouseY

// TODO: Can I abstract out the .clicked function into the event handler instead of each individual targetCircle instance?

// ! object spawning should only be able to be spawned if they are at least two max radius's apart from each other.



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

    this.draw = function () {
        ctx.fillStyle = this.color
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
    this.growing = true;
    this.growingAmount = .025


    this.draw = function () {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, this.startRadian, this.endRadian)
        ctx.fillStyle = this.color


        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    }

    this.clicked = function () {
        let x1 = this.x
        let y1 = this.y
        console.log(x1, y1)
        // ! sqrt(A*2 - B*2) Pythagorean    
        let distance = Math.sqrt(((mouseX - x1) ** 2) + ((mouseY - y1) ** 2)) // <--- forgot to sqrt lol
        // distance = 
        if (distance < this.r) {
            this.color = "green"
            return true

        } else {
            return false
        }
    }

    this.update = function () {
        if (this.r > 50) {
            this.growing = false;
        }
        if (this.r < 1) {
            this.growing = true;
        }
        if (this.growing == true) {
            this.r += this.growingAmount
        } else {
            this.r -= this.growingAmount
        }


    }


}

function getRandomSpawn(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

function clickParticles(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
}

function countDown(duration, elapsed, lastFrameTime) {
    this.duration = 0;
    this.elapsed = 0;
    this.isActive = false;
    this.lastFrameTime = Date.now()
}

// ! arc(x, y, radius, startAngle, endAngle, counterclockwise)






// * SPAWNING MULTIPLE INSTANCES OF TARGETSQUARES
const allTargets = []
function spawnTarget() {
    setInterval(() => {
        const spawnX = getRandomSpawn(0, canvas.width)
        const spawnY = getRandomSpawn(0, canvas.height)
        let r = 20
        const sr = 0
        const er = 2 * Math.PI
        const color = "red"
        let growthMax = 25
        let growthMin = 0.1
        // ? Do I write the logic for spawn distance here?
        let newTargetCircle = new targetCircles(spawnX, spawnY, r, sr, er, color, growthMax, growthMin)
        allTargets.push(newTargetCircle)
        newSpawn = allTargets.length - 1
        // allTargets[newSpawn].growCircle();

        // allTargets.push(new targetCircles(spawnX, spawnY, r, sr, er, color, growthMax, growthMin))

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
    requestAnimationFrame(drawGameLoop);
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    myBlack = "rgba(0, 0, 0, 0.1)"
    ctx.fillStyle = myBlack
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    let cursor = new aimPointer(mouseX, mouseY, "green", 10, 10)
    cursor.draw();
    allTargets.forEach((target) => {
        target.draw();
        target.update();
    })

    // console.log(mouseX, mouseY)












}
drawGameLoop();

// ! UPDATE?








// ! FPS/INTERVAL SPEED
// let canvasRenderInterval= setInterval(drawGameLoop, 500)







// ! UPDATE()
// ! MOVEMENT FUNCTIONS
var mouseX = 0;
var mouseY = 0;
canvas.addEventListener("mousemove", setMousePosition, false)


function setMousePosition(event) { // ! Mouse Event to get X & Y Position
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
    }