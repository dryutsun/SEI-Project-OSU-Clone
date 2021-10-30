// Canvas
const canvas = document.querySelector('canvas')

// Setting Context
const ctx = canvas.getContext('2d')
const cursorCenterPos = canvas.width / 2

scoreBoard = document.querySelector("#score")
missBoard = document.querySelector("#missed")
timeBoard = document.querySelector("#time-remaining")

// Setting Max Width
ctx.canvas.width = 900;
ctx.canvas.height = 900; 

let clickScore = 0


// Game Menu
function menu () {
    ctx.fillStyle = "#000000"
    ctx.font = "24px Righteous"
    ctx.textAlign = 'center';
    ctx.fillText('OSU CLONE', canvas.width / 2, canvas.height / 4);
    // ctx.font = "24px Fira Mono";
    ctx.font = "20px Righteous";
    ctx.textAlign = 'center';
    ctx.fillText('Click on the circles as before they dissapear on the screen!', canvas.width / 2, canvas.height / 2);
    ctx.textAlign = 'center';
    ctx.fillText('Press Spacebar to Start!', canvas.width / 2, canvas.height / 1.5);
}

// Countdown Timer
function countDown() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#000000"
        ctx.font = "40px Righteous"
        ctx.textAlign = 'center';
        ctx.fillText('3...', canvas.width / 2, canvas.height / 3);
    }, 1000);
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#000000"
        ctx.font = "40px Righteous"
        ctx.textAlign = 'center';
        ctx.fillText('2...', canvas.width / 2, canvas.height / 3);
    }, 2000);
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#000000"
        ctx.font = "40px Righteous"
        ctx.textAlign = 'center';
        ctx.fillText('1...', canvas.width / 2, canvas.height / 3);
        startGame()
    }, 3000);

}
// Keyboard Event Listener
ctx.canvas.addEventListener('keydown', (event)=>{
    if (event.keyCode == '32 ') {
        console.log("Spacebar Pressed")
        oneMinute = 60
        clickScore = 0
        missedTargets = []
        allTargets = []
        timeBoard.innerText = 60;
        let enoAudio = new Audio("assets/ST.mp3");
        enoAudio.play();
        countDown()
        // startGame();
    }
}) 

menu();


// START GAME
function startGame() {
    console.log("Game Started.")

    // Creating Canvas Event Listener so you can click on objects.
    canvas.addEventListener("click", clickPosition)
    
    function clickPosition(event) {
        function clickPlay() {
            let audio = new Audio("assets/Water-Blup.mp3");
            audio.play();
        }

        for (i = allTargets.length - 1; i >= 0; i--) {
            let clickEvent = allTargets[i].clicked(mouseX, mouseY)
            if (clickEvent == true) {
                clickScore++
                score.innerText = clickScore
                clickPlay();
                // makes the particle effect focus on center of circleTarget
                particlex = allTargets[i].x 
                particley = allTargets[i].y 
                particleAmount = 400
                const circularIncrementation = Math.PI * 2 / particleAmount
                for (let i = 0; i < particleAmount; i++) {
                    particleArray.push(new clickParticles(particlex, particley, 2, `rgb(108, 117, 240)`, {
                        x: Math.cos(circularIncrementation * i),
                        y: Math.sin(circularIncrementation * i)
                    }))
                }
                allTargets.splice(i, 1)
            } 
        }
    }

    // TODO: object spawning should only be able to be spawned if they are at least two max radius's apart from each other. <-- STRETCH


    // ! OBJECT CLASSES
    // * CREATE POINTER CLASS FOR CURSOR
    function aimPointer(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.height = height
        this.width = width
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
        this.endRadian = endRadian 
        this.color = color
        this.growing = true;
        this.growingAmount = .50

        this.draw = function () {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.r, this.startRadian, this.endRadian)
            ctx.fillStyle = this.color
            ctx.fill()
            // For aesthetic purposes I have removed the stroke values.
            // ctx.strokeStyle = 'blue';
            // ctx.stroke()
            ctx.closePath()
        }

        this.clicked = function () {
            let x1 = this.x
            let y1 = this.y
            console.log(x1, y1)  
            let distance = Math.sqrt(((mouseX - x1) ** 2) + ((mouseY - y1) ** 2))
            // distance = 
            if (distance < this.r) {
                return true
            } else {
                return false
            }

        }

        this.update = function () {
            // ! State is set to true so it will grow.
            // ! when it reaches 50 it will change to false and start shrinking
            if (this.r > 50) {
                this.growing = false;  
            }
            else if (this.r < 2) {
                return true;
            }
            if (this.growing == true) {
                this.r += this.growingAmount
            } else {
                this.r -= this.growingAmount
            }
        }
    }

    // * RANDOMIZER FUNCTION
    function getRandomSpawn(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min) + min) // * get to spawn in borders
    }

    particleArray = []
    function clickParticles(x, y, r, color, velocity, alpha) {
        this.x = x
        this.y = y
        this.r = r
        this.velocity = velocity
        this.color = color
        this.alpha = 1
 

        this.draw = function () {
            ctx.save()
            ctx.globalAlpha = this.alpha
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
            ctx.fillStyle = this.color
            ctx.fill()
            ctx.closePath()
            ctx.restore()
        }

        this.update = function (){
            this.draw()
            this.x += this.velocity.x // will send a particle from the center of the circle defined in circleTarget
            this.y += this.velocity.y // will send a particle from the center of the circle
            this.alpha -= 0.0099
        }
    }

    // * SPAWNING MULTIPLE INSTANCES OF TARGETSQUARES
    const allTargets = []
    function spawnTarget() {
        setInterval(() => {
            const spawnX = getRandomSpawn(20, canvas.width-20)
            const spawnY = getRandomSpawn(20, canvas.height-20)
            let r = 20
            const sr = 0
            const er = 2 * Math.PI
            const color = "rgba(0, 159, 225)"
            let growthMax = 25
            let growthMin = 1
            let newTargetCircle = new targetCircles(spawnX, spawnY, r, sr, er, color, growthMax, growthMin)
            allTargets.push(newTargetCircle)
        }, 2000)

        console.log(allTargets)
    }

    spawnTarget()
    let missTargets = []
    let animation;

// ! DRAW () 
    drawGameLoop = () => { 
        animation = requestAnimationFrame(drawGameLoop);
        // All things commented out below are for aesthetic purposes.
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
        myBlack = "rgba(0, 105, 148, 0.9)" // Opacity maybe creating ghosting 
        ctx.fillStyle = myBlack
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        // let cursor = new aimPointer(mouseX, mouseY, "red", 10, 10)
        // cursor.draw(); 

        // * Target Draw
        allTargets.forEach((target) => {
            target.draw();
            target.update();
            if (target.r == 2) { 
                allTargets.splice(target, 1)
                missTargets.push(target)
                console.log(missTargets)
                missBoard.innerText = missTargets.length 
            }
            })

        particleArray.forEach((particle)=>{
            if (particle.alpha > 0) {
            particle.update()
            } else {
            particleArray.splice(i, 1)
            }
        })
    
    }
    drawGameLoop();


//! COUNTDOWN CLOCK
function countDownTimer () {
    let oneMinute = 60
    let countDownClock = setInterval(() => {

        timeBoard.innerText = oneMinute.toString()
        if (oneMinute <= 0) { 
            clearInterval(countDownClock)
            }
            oneMinute--
        }, 1000);

    setTimeout(()=> {
        endGameMenu()
        cancelAnimationFrame(animation)
    }, 60000)

}

    countDownTimer();

//! END GAME MENU
function endGameMenu(){

    ctx.fillStyle = "#FFFFFF"
    ctx.font = "40px Righteous"
    ctx.textAlign = 'center';
    ctx.fillText(`Your Score Was: ${clickScore}`, canvas.width / 2, canvas.height / 3);
    ctx.fillText(`Your Missed: ${missTargets.length} times.`, canvas.width / 2, canvas.height / 2);
    ctx.fillText(`Press Spacebar to Play again.`, canvas.width / 2, canvas.height / 1.5);
    console.log("I am being run again...")
    
}

// ! MOVEMENT FUNCTIONS
let mouseX = 0;
let mouseY = 0;
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