# PSEUDOCODE/TODO

### Render Menu
[ ] - create a menu in canvas <-- to research *DONE*
[ ] - set countdown that triggers event state
[ ] - 





### Render Canvas:
- create canvas element
- select the canvas
- defined canvas size (fixed (for geometry))
- set context

## Render Objects:
- render the cursor "box" DONE
- have box follow mouse pos & adjust for offset DONE
- render click box/circle DONE
- randomly spawn circles in interval DONE
- NEED TO MAKE EXPANSION AND CONTRACTION FUNCTION
        - COULD IMPLEMENT THIS AS A SET INTERVAL OF GROWTH FROM 0 UP TO CERTAIN LIMIT.
        - AFTER CERTAIN LIMIT IT SHRINKS
        - WILL THIS CONFLICT WITH THE REDRAW OF ELEMENTS?

## TO EXPLORE:
how to do i create an animation after a succesful "collision/click" event is solved
how do i create a global duration counter without interfering with the canvas animation rate
- https://stackoverflow.com/questions/36815987/use-js-countdown-timer-in-canvas-with-requestanimationframe
- http://blog.wolfire.com/2009/07/linear-algebra-for-game-developers-part-1/



## CODE INTERACTION LOGIC:
- make a grid that click box/circle will appear in DECIDED NOT TO DO THIS
        - Instead write logic to ensure that two cricles never spawn in the same area
- set these boxes to be size of an individual grid box
        
- add mouse/keyboard interaction logic so that game will take either keyboard "clicks" or "mouse clicks"
- there will have to be at least a 2x2 pixel 'center' for each square i.e. 1 -> 4 -> 9 -> 16 -> 25 -> 36 -> 49 -> 64 -> 81 -> 100 -> 121 -> 144.
- apparently only oddly squared boxes have a true center.

- 4 -> 16 -> 32 -> 64 -> 128 (square expansion?) (bigger target size?) more flexible?

- Circles dissapearing is a miss and not a "destruction"



## GAME SCORING LOGIC:
when and if a box/circle is clicked successfully, add +1
if missed, no penalty
### POSSIBLE METHODS FOR STORING SCORES
Store each successful click in an array:
{300, 100, 50, MISS}
{0, 0, 0, 0}





### STRUCTURE NOTES:
- create an equal grid of 50x50 or 25x25 squares on grid (Fill RECT?)
- 


if (c > 50) {
growing = false;
}
if (c < 0) {
growing = true;
}

if (growing == true) {
d += growingAmount
c += growingAmount
} else {
c -= growingAmount
d -= growingAmount
}  



    // let canvasRenderInterval= setInterval(drawGameLoop, 500)



    // ! Fourier, but actually finding transients ??
    // ! converts something  at an audio rate signal into a more manage thing
    //! smoothing the sampling, and letting the thing know when the event has passed.
    // envelope following

    //! Take an audio objects
    //! you give it a sample rate;
    //! take less samples, ever 2 ms u sample ur singal
    //! simple boolean greater than operator saying if its above this
    //! Notices when something changes from a 1 to a 0
    //! Some typee of smoothing, a 1 bang that is a gate that only lets something thru every x ms
    //! https://docs.cycling74.com/max7/tutorials/09_dynamicschapter01
