import { INVALID_MOVE } from 'boardgame.io/core';

export const gameUr = {
  setup: () => ({ ID:-1, COL:10,cells: Array(2).fill(Array(15).fill(0)), pieza: false, d1: 0, d2: 0, d3:0, d4:0,
    sum_dados:0, dice_mssg:"Tire los dados", pos_fichas: Array(2).fill(Array(7).fill(-1)), count_cells: 0,
    mssg:""}),

  /*
  turn: {
    moveLimit:1,
  },
  */
  moves: {

        configurar_fichas: (G, ctx, num_fichas) =>{
          G.pos_fichas = Array(2).fill(Array(num_fichas).fill(-1));
        },
        throw_dice: (G,ctx) =>{

          G.mssg = "";
          if (G.dice_mssg == "Tire los dados"){
          G.d1=Math.floor(Math.random() * 2);
          G.d2=Math.floor(Math.random() * 2);
          G.d3=Math.floor(Math.random() * 2);
          G.d4=Math.floor(Math.random() * 2);
          G.sum_dados=G.d1+G.d2+G.d3+G.d4;
          G.dice_mssg="Dados: "+G.sum_dados;

          for (let i = 0; i < 15; i++) {
            if ((G.cells[ctx.currentPlayer][i]==1 && i != 14) ||
                (G.cells[1-ctx.currentPlayer][i]==1 && i == 6) ||
                (G.pos_fichas[ctx.currentPlayer].every(el => el != i-G.sum_dados)))
            {
                G.count_cells = G.count_cells +1;
                //return INVALID_MOVE;
            }
         }
         if (G.sum_dados == 0 || G.count_cells == 15){G.dice_mssg="Tire los dados"; G.count_cells = 0; ctx.events.endTurn({ next: 1-ctx.currentPlayer });}
         else {G.count_cells = 0;}
         }


        },
        clickCell: (G, ctx, id, col) => {
          
          G.ID = id;
          G.COL = col;
          if ((G.dice_mssg == "Tire los dados") ||
              (G.cells[ctx.currentPlayer][id]==1 && id != 14) ||
              (G.cells[1-ctx.currentPlayer][id]==1 && id == 6) ||
              (G.pos_fichas[ctx.currentPlayer].every(el => el != id-G.sum_dados)) ||
              ((id<2 || id>9) && col != ctx.currentPlayer))
          {
              //para cada posicion id:0 ---> 14 comprobar,
              G.pieza = true;
              //return INVALID_MOVE;
          }
          else {
            G.pieza = false;
            //Move pieces
            G.cells[ctx.currentPlayer][id] = 1; //ctx.currentPlayer;

            if (id-G.sum_dados > -1){
            G.cells[ctx.currentPlayer][id-G.sum_dados] = 0;}

            //Move pieces
            G.pos_fichas[ctx.currentPlayer] = replace_elements(G.pos_fichas[ctx.currentPlayer], id-G.sum_dados, id);

            //Eat pieces of your oponent:
            if (G.cells[1-ctx.currentPlayer][id] == 1 && col==-1){
              G.cells[1-ctx.currentPlayer][id] = 0; //ctx.currentPlayer;

              G.pos_fichas[1-ctx.currentPlayer] = replace_elements(G.pos_fichas[1-ctx.currentPlayer], id, -1);

            }


            G.dice_mssg="Tire los dados";

            if (id == 6 || id == 0 || id == 10){
              ctx.events.endTurn({ next: ctx.currentPlayer });
              G.mssg = "¡Tiene un turno extra!";
            }
            else{
              ctx.events.endTurn({ next: 1-ctx.currentPlayer });
            }
            //ctx.events.endTurn({next:1-ctx.currentPlayer});
          }
      },
  },
  /*
  turn: {
    moveLimit:4,
  },
  */
  endIf: (G, ctx) => {
    //  G.dice_mssg ="Tire los dados";
    if (G.pos_fichas[ctx.currentPlayer].every(e => e == 14)){
      return {winner: ctx.currentPlayer};
    }
  },
  ai: {
   enumerate: (G, ctx) => {
     let moves = [];
     const columna_list=[0,2];
     let colum = columna_list[ctx.currentPlayer];

     //if (G.dice_mssg == "Tire los dados"){
     //   moves.push({ move: 'throw_dice'});
     //   return moves;
     //}
     moves.push({ move: 'throw_dice'});


     for (let i = 0; i < 15; i++) {
       if ((G.cells[ctx.currentPlayer][i] != 1 || i == 14) &&
           (G.cells[1-ctx.currentPlayer][i] != 1 || i != 6) &&
           (G.pos_fichas[ctx.currentPlayer].any(el => el == i-G.sum_dados)))
       {
           moves.push({ move:'throw_dice',move: 'clickCell', args: [i, columna_list[ctx.currentPlayer]] });
           //return INVALID_MOVE;
       }}


    return moves;
        },
 },
};


// Return true if `cells` is in a winning configuration.
function IsVictory(cells) {
  const positions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ];

  const isRowComplete = row => {
    const symbols = row.map(i => cells[i]);
    return symbols.every(i => i !== null && i === symbols[0]);
  };

  return positions.map(isRowComplete).some(i => i === true);
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
  return cells.filter(c => c === null).length === 0;
}

function replace_elements(X, a, b){
  var y = X;
  var ind = X.indexOf(a);
  y[ind] = b;
  return  y;
}
