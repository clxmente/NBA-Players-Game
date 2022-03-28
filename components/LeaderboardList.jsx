import { CalendarIcon, ChevronRightIcon, FireIcon, InformationCircleIcon } from '@heroicons/react/solid';
import moment from 'moment';
import Link from 'next/link';
import { FaCrown } from "react-icons/fa";

const crownColor = {
  1: "text-yellow-300",
  2: "text-slate-400",
  3: "text-[#9f7a34]"
}

export default function LeaderboardList(props) {
  return (
    <div className="shadow overflow-hidden">
      <ul role="list" className="space-y-4">
        {props.data.map((entry, index) => (
          <li key={entry.game_id} className="bg-gray-800 border border-1 border-gray-700 rounded-md hover:bg-[#18212F]">
            <Link href={`https://nba-game.solorio.dev/games/${entry.game_id}`} passHref>
              <a className="block">
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="min-w-0 flex-1 flex items-center">
                    <div className="flex-shrink-0">
                      { index+1 < 4 ? 
                        <FaCrown className={`h-6 w-6 ${crownColor[index+1]}`} /> 
                        : <p className="text-white font-bold text-lg">{index + 1}</p>}
                    </div>
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p className="text-sm font-medium text-white truncate">{entry.username}</p>
                        <p className="mt-2 flex items-center text-sm text-gray-400">
                          <InformationCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span className="truncate">Final Score: {entry.score}</span>
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <div>
                          <p className="text-sm text-gray-500 flex items-center">
                            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" />
                            {moment(entry.created_at, moment.ISO_8601).local().format("ddd MMM DD, YYYY @ hh:mm A")}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <FireIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" aria-hidden="true" />
                            Difficulty: {entry.difficulty}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
