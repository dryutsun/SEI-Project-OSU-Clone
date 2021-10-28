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
missBoard = document.querySelector("#missed")
timeBoard = document.querySelector("#time-remaining")

// Setting Max Width
ctx.canvas.width = 900;
ctx.canvas.height = 900; // need to make space for the scoreboard...so everytime canvas.height is invoked - 100?

let clickScore = 0

// ! BEGINNING OF GAME
// Game Menu
function menu () {
ctx.fillStyle = "#000000"
ctx.font = "24px Fira Mono"
ctx.textAlign = 'center';
ctx.fillText('OSU CLONE', canvas.width / 2, canvas.height / 4);
// ctx.font = "24px Fira Mono";
ctx.font = "20px Fira Mono";
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
        ctx.font = "40px Fira Mono"
        ctx.textAlign = 'center';
        ctx.fillText('3...', canvas.width / 2, canvas.height / 3);
    }, 1000);
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#000000"
        ctx.font = "40px Fira Mono"
        ctx.textAlign = 'center';
        ctx.fillText('2...', canvas.width / 2, canvas.height / 3);
    }, 2000);
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#000000"
        ctx.font = "40px Fira Mono"
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
        console.log(`You clicked at ${mouseX}, ${mouseY}`)

        // ! IMPORTANT: Rewrite as a for loop since forEach cannot iterate backwards. 
        // * Because we were iterating through an array that was being spliced, it could not be reindexed correctly.
        // * Stack Overflow reccomended to iterate backwards. Another solution was to use filter and reassing allTargets to itself.

        // !The algorithmic complexity of this approach is O(n^2) as splice function and the for loop both iterate over the array (splice function shifts all elements of array in the worst case). Instead you can just push the required elements to the new array and then just assign that array to the desired variable (which was just iterated upon). https://stackoverflow.com/questions/9882284/looping-through-array-and-removing-items-without-breaking-for-loop

        function clickPlay() {
            var audio = new Audio("/assets/clicksound.mp3");
            audio.play();
        }

        for (i = allTargets.length - 1; i >= 0; i--) {
            let clickEvent = allTargets[i].clicked(mouseX, mouseY)
            if (clickEvent == true) {
                clickScore++
                score.innerText = clickScore
                clickPlay();
                particlex = allTargets[i].x // makes the particle effect focus on center of circleTarget
                particley = allTargets[i].y // makes particle effect focus on center of CircleTarget
                particleAmount = 100
                const circularIncrementation = Math.PI * 2 / particleAmount
                for (let i = 0; i < particleAmount; i++) {
                    particleArray.push(new clickParticles(particlex, particley, 1, `rgb(255,165,0)`, {
                        x: Math.cos(circularIncrementation * i),
                        y: Math.sin(circularIncrementation * i)
                    }))
                }

                allTargets.splice(i, 1)
                

            } 
        }
    }

  setTimeout(()=>{
            particleArray.splice(i, 1) // make it leave array after certain interval
    }, 3000)


    // Creating a Cursor Object so That the user can meaningfully see where they are.


    // TODO: object spawning should only be able to be spawned if they are at least two max radius's apart from each other.


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
        this.endRadian = endRadian 
        this.color = color
        this.growing = true;
        this.growingAmount = .75

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
            let distance = Math.sqrt(((mouseX - x1) ** 2) + ((mouseY - y1) ** 2)) // <--- forgot to sqrt lol
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

    // * PARTICLE COLOR RANDOMIZER
    function getRandomFireColor() {
        let r = 255
        let g = Math.floor(Math.random() * 255)
        let b = Math.floor(Math.random() * 204)
        return `rgb(${r},${g},${b})`
    }

    // TODO: PARTICLE EFFECTS
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
            ctx.stroke()
            ctx.closePath()
            ctx.restore()
        }

        this.update = function (){
            this.draw()
            this.x += this.velocity.x // will send a particle from the center of the circle defined in circleTarget
            this.y += this.velocity.y // will send a particle from the center of the circle
            this.alpha -= 0.007
            // if (this.alpha > .9) {
            //     this.fading = true
            // } else if (this.alpha < .01) {
            //     this.fading = false
            // }

            // if (this.fading == true) {
            //     this.alpha -= this.fading
            // }

        }
    }

    // * SPAWNING MULTIPLE INSTANCES OF TARGETSQUARES
    const allTargets = [] // the array is local to this particular startGame so can be accessed
    function spawnTarget() {
        setInterval(() => {
            const spawnX = getRandomSpawn(20, canvas.width-20)
            const spawnY = getRandomSpawn(20, canvas.height-20)
            let r = 20
            const sr = 0
            const er = 2 * Math.PI
            const color = "red"
            let growthMax = 25
            let growthMin = 1
            // ? Do I write the logic for spawn distance here?
            let newTargetCircle = new targetCircles(spawnX, spawnY, r, sr, er, color, growthMax, growthMin)
            allTargets.push(newTargetCircle)
        }, 750)

        console.log(allTargets)
    }
    spawnTarget()
    let missTargets = []
    let animation;

// ! DRAW () 
    drawGameLoop = () => { 
        animation = requestAnimationFrame(drawGameLoop);
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
        myBlack = "rgba(0, 0, 0, 0.1)" // Opacity maybe creating ghosting 
        ctx.fillStyle = myBlack
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        let cursor = new aimPointer(mouseX, mouseY, "green", 10, 10)
        cursor.draw();
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
        particleArray.forEach((particle)=>{ // Need to discover some logic like radial expansion that will allow me to splice the particle after certain time...
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
            if (oneMinute <= 0) { //! If it is still 0 will keep running engamemenu
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
        ctx.font = "40px Fira Mono"
        ctx.textAlign = 'center';
        ctx.fillText(`Your Score Was: ${clickScore}`, canvas.width / 2, canvas.height / 3);
        ctx.fillText(`Your Missed: ${missTargets.length} times.`, canvas.width / 2, canvas.height / 2);
        ctx.fillText(`Press Spacebar to Play again.`, canvas.width / 2, canvas.height / 1.5);
        console.log("I am being run again...")
        
    }

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