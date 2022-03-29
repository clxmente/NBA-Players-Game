import { useState } from "react";
import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function GuessedPlayerBox(props) {
  const [isLoading, setLoading] = useState(true);
  return (
    <div>
      <div className="w-full overflow-hidden rounded-t-md border-gray-700 border border-b-0 justify-center flex">
        <Image
          alt="player image"
          src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${props.nba_id}.png`}
          width={230}
          height={150}
          objectFit="contain"
          className={classNames(
            "hover:opacity-75 duration-700 ease-in-out",
            isLoading
              ? "grayscale blur-2xl scale-110"
              : "grayscale-0 blur-0 scale-100"
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <div className="border rounded-b-md border-gray-700 bg-gray-800 px-3 py-3 shadow-sm flex items-center space-x-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white">{props.person}</p>
        </div>
      </div>
    </div>
  )
}
