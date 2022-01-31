
import './App.css';
import ChessBoard from './ChessBoard.js';

function App() {
  return (
    <div id="app">
      <div>
        <h2>Click on the Knight and it will hightlight the valid moving postion of the Knight [blue squres].</h2>
        <h2>Every time help button will highlight the next move to the solution [Green squre].</h2>
        <h2>If help does not hightlight any move you may have reach your destnation.</h2>
      </div>
      <ChessBoard/>
    </div>
  )
}

export default App;