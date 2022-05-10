//import all requrioed modules

const prompt = require('prompt-sync')({ sigint: true });
const clear = require('clear-screen');


//instantiating the variables

const hat = "^";
const hole = "O";
const fieldPatch = "░";
const playerPath = "*";
const row = 10;
const col = 10;

class Field {

    field = [];

    constructor() {
        this.locationX = 0;
        this.locationY = 0;
    
        for (let a = 0; a < col; a++) {
            this.field[a] = [];
        }
        this.generateField();
    }

    //generateField Method
    generateField() {
        for (let y = 0; y < row; y++) {
            for (let x = 0; x < col; x++) {
                const prob = Math.random();
                const holePortion = Math.random() * .2; //keeping hole to fieldpatch ratio on 1:4 max
                this.field[y][x] = prob > holePortion ? fieldPatch : hole; // got this from resource on how to fill an array
            }
        }

        // Set character starting position as [0][0]
        this.field[0][0] = playerPath;

        //Set the hat location
        const hatPosition = {
            x: Math.floor(Math.random() * row), //randomized till row length
            y: Math.floor(Math.random() * col) //randomized till height length
        };

        // Checkpoint for Hat start Location ! Player start position
        while (hatPosition.x === 0 && hatPosition.y === 0) {
            hatPosition.x = Math.floor(Math.random() * row);
            hatPosition.y = Math.floor(Math.random() * col);
        }
        this.field[hatPosition.y][hatPosition.x] = hat;
        return this.field;
    }

  runGame() {
    //implement your Codes
    let playing = true;
    while (playing) {
      this.print();
      this.askQuestion();
      if (!(
        this.locationY >= 0 && this.locationX >= 0 && this.locationY < this.field.length && this.locationX < this.field[0].length
      )) {
        console.log("Out of bounds - Game End!");
        playing = false;
        break;
      } else if (this.field[this.locationY][this.locationX] === hole) {
        console.log("Sorry, you fell down a hole!");
        playing = false;
        break;
      } else if (this.field[this.locationY][this.locationX] === hat) {
        console.log("Congrats, you found your hat!");
        playing = false;
        break;
      }
      // return the path taken so far 
      this.field[this.locationY][this.locationX] = playerPath;
    }
  }

  print() {
    clear();
    const displayString = this.field.map(row => {
      return row.join('');
    }).join('\n');
    console.log(displayString);
  }

  askQuestion() {
    let answer = prompt("Which way? ").toUpperCase;
    switch (answer) {
      case "L":
        this.field[this.locationX] -= 1;
        break;
      case "R":
        this.field[this.locationX] += 1;
        break;
      case "U":
        this.field[this.locationY] -= 1;
        break;
      case "D":
        this.field[this.locationY] += 1;
        break;
      default:
        console.log("Enter L = left, R = right, U = up, D = Down");
        this.askQuestion();
        break;
    }
  }
         // HAD TO ABANDON MY IF ELSE CONDITIONAL TO CHECK FOR INPUT VALUE BECAUSE OF COVERAGE PROBLEM MY ELSE STATEMENT GIVES

        // if (answer == "L") {
        //     this.locationX -= 1;
        // } else if (answer == "R") {
        //     this.locationX += 1;
        // } else if (answer == "U") {
        //     this.locationY -= 1;
        // } else if (answer == "D") {
        //     this.locationY += 1;;
        // } else {
        //     // console.log("You can only enter: \n L = for Left \n R = for Right \n D = for Down \n U = for Up");
        //     // this.askQuestion(); //at first I can't get this to work until I realized I need to used "this" keyword
        //     console.log("Which next");
        // }
  
    //current positions for player, holes and hat

  // getHole() {
  //   return this.field[this.locationY][this.locationX] === hole;
  // }

  // getHat() {
  //   return this.field[this.locationY][this.locationX] === hat;
  // }
  // getplayer() {
  //     return this.field[this.locationY][this.locationX] === playerPath;
  // }

    


} //End of Field Class



const myField = new Field();
myField.runGame();
