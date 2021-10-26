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
    // ctx.fillStyle = "#000000"
    // ctx.font = "24px Fira Mono"
    // ctx.textAlign = 'center';
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
    if (event.keyCode == '65') {
        console.log("Spacebar Pressed")
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
                allTargets.splice(i, 1)

            } // } else if (allTargets[i].update == false) { // * needs to be in a rendering space not click event handler
            //     allTargets.splice(i, 1)
            //     missTargets.push(i)
            //     console.log(missTargets)
            // }

            // } else if (allTargets[i].r == 1) {
            //     allTargets.splice(i, 1)
            //     console.log("You missed")
            // }
        }
                // for (i = 0; i < 200; i++){
                //     r = 2;
                //     const sr = 0
                //     const er = 2 * Math.PI
                //     particleArray.push(new clickParticles(mouseX, mouseY, r, sr, er, getRandomFireColor))
                //     console.log(particleArray)
                // }

    }

    const missTargets = []

    // Creating a Cursor Object so That the user can meaningfully see where they are.

    // function isClicked(target, mouseX, mouseY)
    //      target.x COMPARE mouseX
    //      target.y COMPARE mouseY
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
            // ! sqrt(A*2 - B*2) Pythagorean    
            let distance = Math.sqrt(((mouseX - x1) ** 2) + ((mouseY - y1) ** 2)) // <--- forgot to sqrt lol
            // distance = 
            if (distance < this.r) {
                return true
            } else {
                return false
            }

            // ! BIG QUESTIONS: IF I CAN GET THE DISTANCE, AND IF DISTANCE IS LESS THAN RADIUS, HOW DO I GET HOW FAR IT IS FROM THE CENTER POINT
            // ! I.E. THIS.R DETERMINES HOW BIG THE CIRCLE IS BUT, X1 Y1 DETERMINE WHERE THE CENTER OF THE CIRCLE IS
            // ! WHAT IS THE DISTANCE BETWEEN THE TWO POINTS AND WHAT IS THAT A RATIO OF?
        }

        this.update = function () {
            // ! State is set to true so it will grow.
            // ! when it reaches 50 it will change to false and start shrinking
            // ! I should then have it decrement.
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
        return Math.floor(Math.random() * (max - min) + min)
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
    function clickParticles(x, y, r, startRadian, endRadian, getRandomFireColor) {
        this.x = x
        this.y = y
        this.r = r
        this.startRadian = startRadian 
        this.endRadian = endRadian 
        this.color = getRandomFireColor()

        this.draw = function () {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.r, this.startRadian, this.endRadian)
            ctx.fillStyle = this.color


            ctx.fill()
            ctx.stroke()
            ctx.closePath()
        }

        this.update = function (){

        }
    }


    // * SPAWNING MULTIPLE INSTANCES OF TARGETSQUARES
    const allTargets = [] // the array is local to this particular startGame so can be accessed
    function spawnTarget() {
        setInterval(() => {
            const spawnX = getRandomSpawn(0, canvas.width)
            const spawnY = getRandomSpawn(0, canvas.height)
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
    let animation;
    // ! DRAW () (i.e. Gameloop) // * WHAT IS THE REFRESH RATE?
    drawGameLoop = () => { 
        animation = requestAnimationFrame(drawGameLoop);
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
        myBlack = "rgba(0, 0, 0, 0.1)" // Opacity maybe creating ghosting 
        ctx.fillStyle = myBlack
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        let cursor = new aimPointer(mouseX, mouseY, "green", 10, 10)
        cursor.draw();
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
    }
    drawGameLoop();

    //! COUNTDOWN CLOCK
    function countDownTimer () {
        let oneMinute = 10
        setInterval(() => {
            timeBoard.innerText = oneMinute.toString()
            oneMinute--

            if (oneMinute <= 0) {
                timeBoard.innerText = "Times Up."
                clearInterval(countDownTimer)
                cancelAnimationFrame(animation)
            }
        }, 1000);

    }


countDownTimer();


    //! END GAME LOOP




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
