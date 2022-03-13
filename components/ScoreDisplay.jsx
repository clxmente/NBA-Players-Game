import Data from "../data/players.json";

const numOfPlayers = Data.length;

function ScoreDisplay(props) {
  return ( 
    <div className="flex justify-center">
      <div className="block">
        <h1 className="text-white font-bold">Score:</h1>
        <div className="px-10 py-2 rounded-lg bg-gray-800 text-white font-medium border border-gray-700 flex justify-center shadow-sm">{props.currScore} / {numOfPlayers}</div>
      </div>
    </div>
   );
}

export default ScoreDisplay;