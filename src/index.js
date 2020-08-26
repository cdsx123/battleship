

/*things to do:
1: make it so App.js is the one that manages the board states, not GameBoard.js/
2: make an AI
3: make it so App.js is the one that checks whether or not 
all ships have been sunk, and ends the game, not GameBoard.js/
4: make it so you can rotate ships
5: implement turns
6: make it so the placement of ships on the AI's side is random
7: implement drag and drop
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
