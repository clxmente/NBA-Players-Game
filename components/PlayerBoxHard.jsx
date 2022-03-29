function PlayerBoxHard(props) {
  return ( 
    <div>
      <div className="mt-1 block rounded-md">
        <input type={"text"} name={"player-name"} id={props.name.toLowerCase()} 
          className="flex-1 block w-full px-5 py-4 focus:ring-0 sm:text-sm border-gray-700 bg-gray-800 rounded-md focus:border-red-400 text-white" readOnly
        />
      </div>
    </div>
  );
}

export default PlayerBoxHard;