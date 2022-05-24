const prompt = require('prompt-sync')({ sigint: true });
const clear = require('clear-screen');


const hat = '^';
const hole = 'O';
const fieldPatch = '░';
const playerPatch = '*';

let currentlyPlaying = true;

class Field {
    constructor(field) {
        this._field = field;
        this.y = 0;
        this.x = 0;
    }
//Added a get method for field 
    get field() {
        return this._field;
    }


    print() {
      clear();
        return this.field.map(row =>
            row.join('')
        ).join('\n');
    }



    static generateField(height, width, percentage) {

        //Added a control ratio for hole to field patches
        const fieldOrHole = (percentage) => {
            if (percentage >= 0 && percentage <= 100) {
              const randNumber = Math.random() * 100;
              if (randNumber < percentage) {
                return hole;
              } else {
                return fieldPatch;
              }
            } else {
              console.log('Please give a number between 0 - 100');
            }
        }

        //Function with new bare field without player nor hat
        const baseField = () => {
            function makeWidthArray() {
                let widthArray = [];
                for (let i=0; i < width; i++) {
                    widthArray.push(fieldOrHole(percentage));
                }
                return widthArray;
            }
            let baseField = [];
            for (let i=0; i < height; i++) {
                baseField.push(makeWidthArray());
            }
            return baseField;
        }

        const playerPath = baseField();

        // Checkpoint for Hat start Location ! Player start position
        do {
            playerPath[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)] = hat;
        }   while (playerPath[0][0] == hat);

          //Set the hat location
        playerPath[0][0] = playerPatch;

        return playerPath;
    }


    askQuestion() {
      let answer = prompt('Which way?  \nEnter L = left, R = right, U = up, D = Down:  ');
      switch(answer.toUpperCase()) {
          case 'U':
              this.y -= 1;
              break;
          case 'D':
              this.y += 1;
              break;
          case 'L':
              console.log('Moving left');
              this.x -= 1;
              break;
          case 'R':
              this.x += 1;
              break;
          default:
              break;
      }    
  }

  //Last run through to close game base on status of lose/win
  closeGame() {
      if (this.field[this.y] == undefined) {
          console.log('You lose - Out of boundary');
          return currentlyPlaying = false;            
      }
    
      switch (this.field[this.y][this.x]) {
          case hole:
              console.log('Sorry, you fell down a hole!');
              currentlyPlaying = false;
              break;
          case undefined:
              console.log('Out of bounds - Game Over');
              currentlyPlaying = false;
              break;
          case hat:
              console.log('Congrats, you found your hat!');
              currentlyPlaying = false;
              break;
          case fieldPatch:
              console.log('Keep looking for the hat...');
              this.field[this.y][this.x] = playerPatch;
              break;
          case playerPatch:
              console.log('Oops, you are stuck.. *');
              break;
      }    
  }

}

const myField = new Field(Field.generateField(10,10,30));

function runGame() {
    while(currentlyPlaying) {
        console.log(myField.print());
        myField.askQuestion();
        myField.closeGame();
    }
    console.log('Nice effort!');
}

runGame(); 