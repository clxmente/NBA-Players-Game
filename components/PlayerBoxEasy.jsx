import Image from "next/image";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function PlayerBoxEasy(props) {
  const [isLoading, setLoading] = useState(true);
  
  return ( 
    <div>
      <div className="mt-1 block rounded-md">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden xl:aspect-w-3 xl:aspect-h-2 rounded-tl-md rounded-tr-md border-gray-700 border border-b-0">
          <Image
            alt="player image"
            src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${props.nba_id}.png`}
            layout="fill"
            objectFit="cover"
            className={classNames(
              "hover:opacity-75 duration-700 ease-in-out",
              isLoading
                ? "grayscale blur-2xl scale-110"
                : "grayscale-0 blur-0 scale-100"
            )}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
        <input type={"text"} name={"player-name"} id={props.nba_id} 
          className="flex-1 block w-full px-3 py-1 sm:py-2 focus:ring-0 sm:text-sm border-gray-700 bg-gray-900 focus:border-red-400 text-white" readOnly
        />
        <div className="flex">
          <span className="shadow-md inline-flex items-center px-3 py-2 border border-t-0 border-gray-700 bg-gray-800 text-gray-400 text-xs sm:text-sm w-1/3 rounded-bl-md">
            {props.number}
          </span>
          <span className="shadow-md inline-flex items-center px-3 py-2 border border-l-0 border-t-0 border-gray-700 bg-gray-800 text-gray-400 text-xs sm:text-sm w-1/3">
            {props.height.replace("-", "'") + '"'}
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