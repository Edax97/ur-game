import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { gameUr } from './Game';
import { boardUr } from './Board';


const App = Client({
  game: gameUr,
  board: boardUr,
});

export default App;
