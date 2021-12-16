import { INVALID_MOVE } from 'boardgame.io/core';
export const gameUr = {
  setup: () => ({ mssg : "Inicio del juego", cells: Array(2).fill(Array(15).fill(null)), dice: Array(4).fill(0),
                 dice_sum: 0, pos_fichas: Array(2).fill(Array(7).fill(-1)),
                  was_dice_threw: false  }),

  moves: {

    throw_dice: (G, ctx) => {
      if (G.was_dice_threw === true){
         G.mssg = "Ya tiro los dados";
         //return 0;
G.cells[ctx.currentPlayer][id] = 1; //ctx.currentPlayer;
      G.cells[ctx.currentPlayer][id-G.dice_sum] = null;

      G.pos_fichas[ctx.currentPlayer] = replace_elements(G.pos_fichas[ctx.currentPlayer], id-G.dice_sum, id);


      //Eat pieces of your oponent:
      if (G.cells[1-ctx.currentPlayer][id] == 1){
        G.cells[1-ctx.currentPlayer][id] = null; //ctx.currentPlayer;

        G.pos_fichas[1-ctx.currentPlayer] = replace_elements(G.pos_fichas[1-ctx.currentPlayer], id, -1);

      }

      }

      G.was_dice_threw = true;
      const dice1 = Math.floor(Math.random() * 2);
      const dice2 = Math.floor(Math.random() * 2);
      const dice3 = Math.floor(Math.random() * 2);
      const dice4 = Math.floor(Math.random() * 2);
      G.dice = [dice1, dice2, dice3, dice4];
      G.dice_sum = dice1+dice2+dice3+dice4;

    },

    click: (G, ctc, id) => {
      G.mssg = "Mover a posicion: "+ id;
      if (G.was_dice_threw == false){
        G.mssg = "Tire los dados";
      }
      /*
      if (G.was_dice_threw == false){
         G.mssg = "Tire los dados";
         return 0;
      }*/
    },

    clickCell: (G, ctx, id) => {

      G.invalido = "droga";
      if (G.was_dice_threw === false){
         G.invalido = "tire_dado";
         return INVALID_MOVE;
      }

      if ((G.cells[ctx.currentPlayer][id] !== null && id !== 14)
          || G.pos_fichas[ctx.currentPlayer].every(el => el === -1)//id - G.dice_sum)
          || (G.cells[1-ctx.currentPlayer][id] == 1 && id ==6)) {
        G.invalido = "invalido";
        return INVALID_MOVE;
      }
      G.was_dice_threw = false;
      G.invalido = "valido";
      G.cells[ctx.currentPlayer][id] = 1; //ctx.currentPlayer;
      G.cells[ctx.currentPlayer][id-G.dice_sum] = null;

      G.pos_fichas[ctx.currentPlayer] = replace_elements(G.pos_fichas[ctx.currentPlayer], id-G.dice_sum, id);


      //Eat pieces of your oponent:
      if (G.cells[1-ctx.currentPlayer][id] == 1){
        G.cells[1-ctx.currentPlayer][id] = null; //ctx.currentPlayer;

        G.pos_fichas[1-ctx.currentPlayer] = replace_elements(G.pos_fichas[1-ctx.currentPlayer], id, -1);

      }

      if (id == 6 || id == 0 || id == 10){
        ctx.events.endTurn({ next: ctx.currentPlayer });
      }
      else{
        ctx.events.endTurn({ next: 1-ctx.currentPlayer });
      }
    }
  },


  turn: {
    moveLimit: 5,
  },


  endIf: (G, ctx) => {
    if (G.pos_fichas[ctx.currentPlayer].every(e => e == 14)){
      return {winner: ctx.currentPlayer};
    }
  }

/*
  endIf: (G, ctx) => {
    if (IsVictory(G.cellsA)) {
      return { whyner: ctx.currentPlayer };
    }
    if (IsDraw(G.cellsA)) {
      return { draw: true };
    }
  },
  ai: {
    enumerate: (G, ctx) => {
      let moves = [];
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          moves.push({ move: 'clickCell', args: [i] });
        }
      }
      return moves;
    },
  },
*/
};

// Return true if `cells` is in a winning configuration.
function IsVictory(cells) {
  const positions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ];

  const isRowComplete = row => {
    //it maps the elements of the row array according to the function f(i)= cells[i]
    const symbols = row.map(i => cells[i]);
    //Return True if every element gives True to the function: f(i):{i=== first element and is not null}
    return symbols.every(i => i !== null && i === symbols[0]);
  };
  //Map each straight 3cells-row into a value which says if the row has been marked by the same player
  const board_contains_row=positions.map(isRowComplete);

  //Return True if some row (rows [0,1,2], etc) is "complete"
  return board_contains_row.some(i => i === true);
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
  //Filter the array with the function f(el) {el===null}. f(el) is applied to each element, which is kept if the function
  //returns true.
  return cells.filter(c => c === null).length === 0;
}

function replace_elements(X, a, b){
  var b = X;
  return  b.map(function(item) { return item == a ? b: item; });
}
