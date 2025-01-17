const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(myField) {
    this.myField = myField;
    this.playerX = 0;
    this.playerY = 0;
  }

  print() {
    const fieldString = this.myField.map(row => row.join('')).join('\n');
    console.log(fieldString);
  }

  isInBounds(x, y) {
    return x >= 0 && y >= 0 && x < this.myField.length && y < this.myField[0].length;
  }

  isHat(x, y) {
    return this.myField[x][y] === hat;
  }

  isHole(x, y) {
    return this.myField[x][y] === hole;
  }

  movePlayer(direction) {
    switch (direction) {
      case 'up':
        this.playerX -= 1;
        break;
      case 'down':
        this.playerX += 1;
        break;
      case 'left':
        this.playerY -= 1;
        break;
      case 'right':
        this.playerY += 1;
        break;
      default:
        console.log('Invalid move');
    }
  }

  playGame() {
    let playing = true;
    while (playing) {
      this.print();
      const direction = prompt('Which way? ').toLowerCase();
      this.movePlayer(direction);

      if (!this.isInBounds(this.playerX, this.playerY)) {
        console.log('Out of bounds! You lose.');
        playing = false;
      } else if (this.isHat(this.playerX, this.playerY)) {
        console.log('You found your hat! You win!');
        playing = false;
      } else if (this.isHole(this.playerX, this.playerY)) {
        console.log('You fell into a hole! You lose.');
        playing = false;
      } else {
        this.myField[this.playerX][this.playerY] = pathCharacter;
      }
    }
  }

  static generateField(height, width, holePercentage = 0.2) {
    const field = Array.from({ length: height }, () => Array(width).fill(fieldCharacter));

    // Place the hat
    const hatX = Math.floor(Math.random() * height);
    const hatY = Math.floor(Math.random() * width);
    field[hatX][hatY] = hat;

    // Place holes
    const totalHoles = Math.floor(height * width * holePercentage);
    let holesPlaced = 0;
    while (holesPlaced < totalHoles) {
      const holeX = Math.floor(Math.random() * height);
      const holeY = Math.floor(Math.random() * width);
      if (field[holeX][holeY] === fieldCharacter && (holeX !== 0 || holeY !== 0)) {
        field[holeX][holeY] = hole;
        holesPlaced++;
      }
    }

    return field;
  }
}

const randomField = Field.generateField(5, 5, 0.3); // Adjust size and hole percentage as needed
const myField = new Field(randomField);
myField.playGame();

