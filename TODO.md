# PSEUDOCODE/TODO

### Render Menu
[ ] - create a menu in canvas <-- to research
[ ] - set countdown that triggers event state
[ ] - 





### Render Canvas:
- create canvas element
- select the canvas
- defined canvas size (fixed (for geometry))
- set context

## Render Objects:
- render the cursor "box"
- have box follow mouse pos & adjust for offset
- render click box/circle

## TO EXPLORE:
how to do i create an animation after a succesful "collision/click" event is solved
how do i create a global duration counter without interfering with the canvas animation rate


## CODE INTERACTION LOGIC:
- make a grid that click box/circle will appear in
- set these boxes to be size of an individual grid box
- add mouse/keyboard interaction logic so that game will take either keyboard "clicks" or "mouse clicks"
- there will have to be at least a 2x2 pixel 'center' for each square i.e. 1 -> 4 -> 9 -> 16 -> 25 -> 36 -> 49 -> 64 -> 81 -> 100 -> 121 -> 144.
- apparently only oddly squared boxes have a true center.

- 4 -> 16 -> 32 -> 64 -> 128 (square expansion?) (bigger target size?) more flexible?



## GAME SCORING LOGIC:
when and if a box/circle is clicked successfully, add +1
if missed, no penalty





### STRUCTURE NOTES:
- create an equal grid of 50x50 or 25x25 squares on grid (Fill RECT?)
- 