import Head from "next/head";
import { useState, useEffect } from "react";

import PlayerBox from "../../components/PlayerBox";
import ScoreDisplay from "../../components/ScoreDisplay";
import Dropdown from "../../components/Dropdown";
import GuessedPlayers from "../../components/GuessedPlayers";

import Data from "../../data/players.json"; // player data json file
import { teams } from "../../data/teams";

const Game = ({ score, username, difficulty, guessed_players }) => {

  // Team Selection State
  const [selected, setSelected] = useState(teams[0]);

  // Convert from JSONB to JSON object
  const parsed_player_list = JSON.parse(guessed_players);

  // Players map
  const players_arr = Data.filter(player => player.TEAM===selected.abbreviation).map((data, id) => { // filter the whole player array data to players with team == currTeam
    var jersey_no = "#" + data.JERSEY_NUM;
    return (
      <PlayerBox key={id} nba_id={data.NBA_ID} height={data.HEIGHT} number={jersey_no} position={data.POS} />
    )
  })

  useEffect(() => {
    document.getElementsByName("player-name").forEach( element => element.value="" );
    updatePlayerCards();
  }, [selected]);

  function updatePlayerCards() {
    // first set all guessed players to a border style of red
    Data.filter(player => player.TEAM === selected.abbreviation).forEach(player_obj => {
      document.getElementById(player_obj.NBA_ID).value = player_obj.FULL_NAME;
      document.getElementById(player_obj.NBA_ID).style.border = "1px solid #f87171"
    })

    // then set all guessed players to green.
    let currTeamPlayers = parsed_player_list.filter(
      (player_object) => player_object.TEAM === selected.abbreviation
    );
    currTeamPlayers.forEach(
      (player_object) => {
        document.getElementById(player_object.NBA_ID).value = player_object.FULL_NAME;
        document.getElementById(player_object.NBA_ID).style.border = "1px solid #4ade80";
      }
    );
  }


  return(
    <div className="flex justify-center">
      <Head>
        <title>{username}&apos;s Game</title>
        <meta name="og:image" content="https://cdn-icons-png.flaticon.com/512/889/889442.png" />
        <meta name="og:title" content={`${username}'s Game`} />
        <meta name="og:description" content="Check out my game to see how many NBA players I guessed within 20 minutes!" />
        <meta name="description" content="Check out my game to see how many NBA players I guessed within 20 minutes!" />
        <link rel="icon" href="/basketball-ball.png" />
      </Head>

      <main className="w-[80%]">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide break-words flex justify-center py-7 px-5 text-white">
          {username}&apos;s Game
        </h1>

        {/* dropdown */}
        <div className='px-5 pt-5'>
          <div className='mb-5 md:mb-0 block md:flex justify-center md:items-end'>
            <div className="mb-3 flex justify-start"><ScoreDisplay currScore={score} /></div>
            <div className="bg-gray-800 border border-1 border-gray-700 text-white ml-0 md:ml-3 mb-3 font-medium px-7 py-2 flex md:block justify-center rounded-lg">Difficulty: {difficulty}</div>
          </div>
          <Dropdown selected={selected} setSelected={setSelected} teams={teams} />
        </div>
        {/* Player Boxes */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-4 px-5">
          {players_arr}
        </div>

        <GuessedPlayers guessed_list={parsed_player_list} />
      </main>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  // Fetch game data from API
  const game_id = query.game_id;
  const res = await fetch(`http://nba-game.solorio.dev/api/games/${game_id}`);
  const data = await res.json();
  
  const { score, guessed_players, difficulty, username } = data[0];

  return { props: { game_id, score, guessed_players, difficulty, username } };
}

export default Game;