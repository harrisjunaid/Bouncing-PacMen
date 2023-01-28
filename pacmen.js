var pos = 0;
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
var direction = 0;
const pacMen = [];// This array holds all the pacMen

function setToRandom(scale) {//function returning an object with random values
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}
/////////////////////////////////////////////////////////////////////
// Factory to make a PacMan at a random position with random velocity
/////////////////////////////////////////////////////////////////////
function makePac() {//
  //random velocity and position objects
  let velocity = setToRandom(10);/*receives an object with random values x,y */console.log(`velocity: ${JSON.stringify(velocity)}`);
  let position = setToRandom(200);/*receives an object with random values x,y */console.log(`position: ${JSON.stringify(position)}`);
  
  //create and set image through JS (in div id = 'game')
  let game = document.getElementById('game');   //handle to element with unique id="game" (<div id='game'>)
  let newimg = document.createElement('img');      //handle to created 'img' element
  newimg.src = './images/PacMan1.png';             //setting img src
  newimg.width = 100;                              //setting img width
  newimg.style.position = 'absolute';              //style position to absolute
  newimg.style.left = position.x;                  //style left to value
  newimg.style.top = position.y;                   //style top to value
  //<img src="./images/PacMan1.png" width="100" style="position: absolute; left: 232.238px; top: 789.247px;"></img>
  
  //adding the created image to DOM
  game.appendChild(newimg); console.log(newimg);

  return {                                     //new style of creating and returning an object
    position,
    velocity,
    newimg,
  };
}
/////////////////////////////////////////////////////////////////////
//update image position after every 20ms
//-check for move in same direction or change by checkCollisions(item);
//-move in the decided direction
/////////////////////////////////////////////////////////////////////
function update() {//image position update
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);//decide direction of velocity

    //-move in the decided direction
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;//after adding velocity in x
    item.newimg.style.top = item.position.y;//after adding velocity in y
  });
  setTimeout(update, 20);//call update after every 20ms
}

function checkCollisions(item) {console.log(JSON.stringify(item));
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||//after  window width 
    item.position.x + item.velocity.x < 0                                    //OR before of window start 
  ){
    console.log(`item.position.x:  \t ${item.position.x}
               \nitem.velocity.x:  \t ${item.velocity.x}
               \nitem.newimg.width:   \t ${item.newimg.width}
               \nsum =             \t ${item.position.x + item.velocity.x + item.newimg.width}
               \n\t>
               \nwindow.innerWidth:\t${window.innerWidth}`);
    item.velocity.x = -item.velocity.x;
  }
  if (
    item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||//image will reach above window innerHeight
    item.position.y + item.velocity.y < 0                                      //OR image will reach  
  ){
    console.log(`item.position.y:  \t ${item.position.y}
               \nitem.velocity.y:  \t ${item.velocity.y}
               \nitem.newimg.width:   \t ${item.newimg.height}
               \nsum =             \t ${item.position.y + item.velocity.y + item.newimg.height}
               \n\t>
               \nwindow.innerWidth:\t${window.innerHeight}`);
   
    item.velocity.y = -item.velocity.y;
  }
}

function makeOne() {
  pacMen.push(makePac());/*add a new PacMan*/console.log(`pacMen array: ${JSON.stringify(pacMen)}`);
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
