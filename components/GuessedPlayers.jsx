import { SearchIcon } from "@heroicons/react/solid";
import { useState } from "react";
import GuessedPlayerBox from "./GuessedPlayerBox";

function GuessedPlayers(props) {
  const [nameField, setNameField] = useState("");

  const filtered = nameField === ""
    ? props.guessed_list
    : props.guessed_list.filter((object) => {
      return object.FULL_NAME.toLowerCase().includes(nameField.toLowerCase())
    })
  return ( 
    <div className="px-5 border-t-2 border-gray-700">
      <div className="my-4">
        <label htmlFor="queryName" className="block text-sm font-medium text-white">
          Search Guessed Players
        </label>
        <div className="mt-1 mb-5 relative rounded-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="queryName"
            id="queryName"
            className="bg-gray-800 border border-gray-700 block pl-10 sm:text-sm rounded-md text-white"
            placeholder="enter player name"
            value={nameField}
            onInput={e => setNameField(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mb-10">
        {filtered.map((object) =>{
          return <GuessedPlayerBox key={object.FULL_NAME} person={object.FULL_NAME} nba_id={object.NBA_ID} />
        })}
      </div>
    </div>
  );
}

export default GuessedPlayers;