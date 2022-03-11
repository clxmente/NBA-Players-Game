function ScoreDisplay(props) {
  return ( 
    <div className="flex justify-center">
      <div className="block">
        <h1 className="text-gray-500 font-bold">Score:</h1>
        <div className="px-10 py-2 rounded-lg bg-gray-300 text-black font-medium flex justify-center shadow-sm">{props.currScore}</div>
      </div>
    </div>
   );
}

export default ScoreDisplay;