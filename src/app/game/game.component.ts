import { Component, OnInit } from '@angular/core';
import { Gamelogic } from '../gamelogic'; // STEP 10

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [Gamelogic]
})
export class GameComponent implements OnInit {

  constructor(public game: Gamelogic) { } // STEP 10

  ngOnInit(): void {
  }

  startGame(): void { // STEP 13
    this.game.gameStart()

    // STEP 16:
    const currentPlayer = 'Current turn: Player ' + this.game.currentTurn;
    const information = document.querySelector('#current-status');
    information!.innerHTML = currentPlayer;
  }

  async clickSubfield( subfield: any ): Promise<void>{ // STEP 18
    if (this.game.gameStatus === 1){
      // Get the Square
      const position = subfield.currentTarget.getAttribute('position');
      console.log(position);
      
      // Pass the Square's data to the Model
      this.game.setField(position, this.game.currentTurn); // STEP 20, pt 1

      // STEP 21:
      // Get Player Color & Update Grid with it
      const color = this.game.getPlayerColorClass(); 
      subfield.currentTarget.classList.add(color);

      // STEP 27:
      await this.game.checkGameEndWinner().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end){
          const information = document.querySelector('#current-status')
          information!.innerHTML = `The winner is Player ` + this.game.currentTurn;
        }
      });

      // STEP 24:
      await this.game.checkGameEndFull().then((end: boolean) => { 
        if (this.game.gameStatus === 0 && end){
          const information = document.querySelector('#current-status')
          information!.innerHTML = `No winner: it's a draw`;
        }
      });

      // STEP 22:
      this.game.changePlayer(); 

      // STEP 23:
      if (this.game.gameStatus === 1) { 
        const currentPlayer = 'Current turn: Player ' + this.game.currentTurn;
        const information = document.querySelector('#current-status')
        information!.innerHTML = currentPlayer;
      }
    }
  }

}
