import Image from "next/image";


function PlayerBoxEasy(props) {
  return ( 
    <div>
      <div className="mt-1 block rounded-md">
        <div className="rounded-tl-md rounded-tr-md border-gray-700 border border-b-0">
          <Image
            alt="player image"
            src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${props.nba_id}.png`}
            layout="intrinsic"
            width={271}
            height={200}
          />
        </div>
        <input type={"text"} name={"player-name"} id={props.name.toLowerCase()} 
          className="flex-1 block w-full px-3 py-1 sm:py-2 focus:ring-0 sm:text-sm border-gray-700 bg-gray-900 focus:border-red-400 text-white" readOnly
        />
        <div className="flex">
          <span className="shadow-md inline-flex items-center px-3 py-2 border border-t-0 border-gray-700 bg-gray-800 text-gray-400 text-xs sm:text-sm w-1/3 rounded-bl-md">
            {props.team}
          </span>
          <span className="shadow-md inline-flex items-center px-3 py-2 border border-l-0 border-t-0 border-gray-700 bg-gray-800 text-gray-400 text-xs sm:text-sm w-1/3">
            {props.number}
          </span>
          <span className="shadow-md inline-flex items-center px-3 py-2 border border-l-0 border-t-0 border-gray-700 bg-gray-800 text-gray-400 text-xs sm:text-sm w-1/3 rounded-br-md">
            {props.position}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlayerBoxEasy;