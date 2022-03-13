function PlayerBox(props) {
  // Find a way to have the value empty until the user enters the right name.
  // possibly use the id=props.name to find the correct element.
  // setState? useRef?
  return ( 
    <div>
      <div className="mt-1 block rounded-md">
        <input type={"text"} name={"player-name"} id={props.name.toLowerCase()} 
          className="flex-1 block w-full px-3 py-2 focus:ring-0 sm:text-sm border-gray-300 rounded-tl-md rounded-tr-md focus:border-red-400"
          value={props.name} readOnly
        />
        <div className="flex">
          <span className="shadow-md inline-flex items-center px-3 py-2 border border-t-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm w-1/3 rounded-bl-md">
            {props.team}
          </span>
          <span className="shadow-md inline-flex items-center px-3 py-2 border border-l-0 border-t-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm w-1/3">
            {props.number}
          </span>
          <span className="shadow-md inline-flex items-center px-3 py-2 border border-l-0 border-t-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm w-1/3 rounded-br-md">
            {props.position}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlayerBox;