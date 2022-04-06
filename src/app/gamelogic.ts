import { Status } from './gamestatus'

export class Gamelogic {

    gameStatus!: Status; // STEP 11

    currentTurn!: number; // STEP 12

    gameField: Array<number> = [];

    // STEP 28:
    winConditionsOne: Array<Array<number>> = [
        [1,1,1,0,0,0,0,0,0], // Horizontal wins
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,1,1,1],
        [1,0,0,1,0,0,1,0,0], // Vertical wins
        [0,1,0,0,1,0,0,1,0],
        [0,0,1,0,0,1,0,0,1],
        [1,0,0,0,1,0,0,0,1], // Diagonal wins
        [0,0,1,0,1,0,1,0,0],
    ]
    winConditionsTwo: Array<Array<number>> = [
        [2,2,2,0,0,0,0,0,0], // Horizontal wins
        [0,0,0,2,2,2,0,0,0],
        [0,0,0,0,0,0,2,2,2],
        [2,0,0,2,0,0,2,0,0], // Vertical wins
        [0,2,0,0,2,0,0,2,0],
        [0,0,2,0,0,2,0,0,2],
        [2,0,0,0,2,0,0,0,2], // Diagonal wins
        [0,0,2,0,2,0,2,0,0],
    ]

    public constructor(){
        this.gameField = [0,0,0,0,0,0,0,0,0]
        this.gameStatus = Status.STOP;
        this.currentTurn = 1;
    }

    // STEP 14:
    gameStart(): void { 
        this.gameStatus = Status.START;
        this.gameField = [0,0,0,0,0,0,0,0,0];
        this.currentTurn = this.randomPlayerStart();
        console.log(this.currentTurn); 
    }

    // STEP 15:
    randomPlayerStart(): number { 
        const startPlayer = Math.floor(Math.random() * 2) + 1;
        return startPlayer
    }

    setField(position: number, value: number): void { // STEP 20, pt 2
        // Store the the current player's id number for the given Square
        this.gameField[position] = value;
        console.log(this.gameField)
    }

    // STEP 21:
    getPlayerColorClass(): string { 
        const colorClass = (this.currentTurn === 2) ? 'player-two' : 'player-one'
        return colorClass
    }

    // STEP 22:
    changePlayer(): void { 
        this.currentTurn = (this.currentTurn === 2) ? 1 : 2;
    } 

    // STEP 30(b):
    arrayEquals(a: Array<any>, b: Array<any>): boolean {
        return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((value, index) => value === b[index])
    }

    // STEP 29:
    async checkGameEndWinner(): Promise<boolean> {
        let isWinner = false; // STEP 29

        // STEP 30(a):
        const checkWin = ( this.currentTurn === 1) ? this.winConditionsOne : this.winConditionsTwo;

        const currentBoard: any = [];

        this.gameField.forEach((subfield, index) => {
            if ( subfield !== this.currentTurn ) {
                currentBoard[index] = 0;
            } else {
                currentBoard[index] = subfield;
            }
        });

        console.log(`Here's the current state of the board: ${currentBoard}`)

        checkWin.forEach( (checkfield, checkindex) => {
            if (this.arrayEquals(checkfield, currentBoard)){
                isWinner = true;
            }
        })
        
        if ( isWinner ) { // STEP 29
            console.log('Three in a row: TIC-TAC-TOE!!!')
            this.gameEnd();
            return true;
        } else {
            return false;
        }
    }

    // STEP 24: 
    async checkGameEndFull(): Promise<boolean> {
        let isFull = true;
        // Check to see if gameField has any zeros (empties) left, or if all elements in the array have been set to either 1 or 2
        if (this.gameField.includes(0)) {
            console.log('Empty spaces still exist')
            isFull = false;
        }

        if ( isFull ) {
            console.log('All spaces taken')
            this.gameEnd();
            return true;
        } else {
            return false;
        }
    }
    
    // STEP 26:
    gameEnd(): void {
        this.gameStatus = Status.STOP;
    }
}
