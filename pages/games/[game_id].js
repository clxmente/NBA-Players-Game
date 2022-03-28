import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import PlayerBox from "../../components/PlayerBox";
import ScoreDisplay from "../../components/ScoreDisplay";
import Dropdown from "../../components/Dropdown";
import Data from "../../data/players.json"; // player data json file

const teams = [
  {
    id: 1,
    name: 'Atlanta Hawks',
    abbreviation: "ATL",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg',
  },
  {
    id: 2,
    name: 'Boston Celtics',
    abbreviation: "BOS",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg',
  },
  {
    id: 3,
    name: 'Brooklyn Nets',
    abbreviation: "BKN",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg',
  },
  {
    id: 4,
    name: 'Charlotte Hornets',
    abbreviation: "CHA",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg',
  },
  {
    id: 5,
    name: 'Chicago Bulls',
    abbreviation: "CHI",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg',
  },
  {
    id: 6,
    name: 'Cleveland Cavaliers',
    abbreviation: "CLE",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg',
  },
  {
    id: 7,
    name: 'Dallas Mavericks',
    abbreviation: "DAL",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg',
  },
  {
    id: 8,
    name: 'Denver Nuggets',
    abbreviation: "DEN",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg',
  },
  {
    id: 9,
    name: 'Detroit Pistons',
    abbreviation: "DET",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg',
  },
  {
    id: 10,
    name: 'Golden State Warriors',
    abbreviation: "GSW",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg',
  },
  {
    id: 11,
    name: 'Houston Rockets',
    abbreviation: "HOU",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg',
  },
  {
    id: 12,
    name: 'Indiana Pacers',
    abbreviation: "IND",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg',
  },
  {
    id: 13,
    name: 'Los Angeles Clippers',
    abbreviation: "LAC",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg',
  },
  {
    id: 14,
    name: 'Los Angeles Lakers',
    abbreviation: "LAL",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg',
  },
  {
    id: 15,
    name: 'Memphis Grizzlies',
    abbreviation: "MEM",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg',
  },
  {
    id: 16,
    name: 'Miami Heat',
    abbreviation: "MIA",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg',
  },
  {
    id: 17,
    name: 'Milwaukee Bucks',
    abbreviation: "MIL",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg',
  },
  {
    id: 18,
    name: 'Minnesota Timberwolves',
    abbreviation: "MIN",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg',
  },
  {
    id: 19,
    name: 'New Orleans Pelicans',
    abbreviation: "NOP",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg',
  },
  {
    id: 20,
    name: 'New York Knicks',
    abbreviation: "NYK",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg',
  },
  {
    id: 21,
    name: 'Oklahoma City Thunder',
    abbreviation: "OKC",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg',
  },
  {
    id: 22,
    name: 'Orlando Magic',
    abbreviation: "ORL",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg',
  },
  {
    id: 23,
    name: 'Philadelphia 76ers',
    abbreviation: "PHI",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg',
  },
  {
    id: 24,
    name: 'Phoenix Suns',
    abbreviation: "PHX",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg',
  },
  {
    id: 25,
    name: 'Portland Trail Blazers',
    abbreviation: "POR",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg',
  },
  {
    id: 26,
    name: 'Sacramento Kings',
    abbreviation: "SAC",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg',
  },
  {
    id: 27,
    name: 'San Antonio Spurs',
    abbreviation: "SAS",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg',
  },
  {
    id: 28,
    name: 'Toronto Raptors',
    abbreviation: "TOR",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg',
  },
  {
    id: 29,
    name: 'Utah Jazz',
    abbreviation: "UTA",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg',
  },
  {
    id: 30,
    name: 'Washington Wizards',
    abbreviation: "WAS",
    avatar:
      'https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg',
  },
]

const Game = () => {

  // Dynamic routing, get the game_id from URL
  const router = useRouter();
  const { game_id } = router.query;

  // states to create the page
  const [username, setUsername] = useState();
  const [guessedPlayers, setGuessedPlayers] = useState([]);
  const [score, setScore] = useState();
  const [timeSetting, setTimeSetting] = useState();

  // Team Selection State
  const [selected, setSelected] = useState(teams[0]);

  useEffect(() => {
    async function getData() {
      console.log(`/api/games/${game_id}`);
      let response = await fetch(`/api/games/${game_id}`);
      response = await response.json();
      setUsername(response.username);
      setGuessedPlayers(JSON.parse(response.guessedPlayers));
      setScore(response.score);
      setTimeSetting(props.timeSetting);
    }

    getData();
  }, [])

  // Players map
  const players_arr = Data.filter(player => player.TEAM===selected.abbreviation).map((data, id) => { // filter the whole player array data to players with team == currTeam
    if (data.JERSEY_NUM) {
      var jersey_no = "#" + data.JERSEY_NUM;
    } else { jersey_no = "-"}

    return (
      <PlayerBox key={id} name={data.FULL_NAME} team={data.TEAM} number={jersey_no} position={data.POS} />
    )
  })

  const guessed_players = guessedPlayers.map((pobj) => {
    return (
      <GuessedPlayerBox key={pobj.FULL_NAME.toLowerCase()} person={pobj.FULL_NAME} />
    )
  })

  return(
    <div>
      <Head>
        <title>{username}'s Game</title>
        <meta name="og:image" content="https://cdn-icons-png.flaticon.com/512/889/889442.png" />
        <meta name="og:description" content="Check out my game to see how many NBA players I guessed within 20 minutes!" />
        <link rel="icon" href="/basketball-ball.png" />
      </Head>

      <main>
        <p className="text-lg md:text-3xl font-bold tracking-wide break-words flex justify-center py-7 px-5 text-white">Game Id: {game_id}</p>
        <h1 className="text-lg md:text-3xl font-bold tracking-wide break-words flex justify-center py-7 px-5 text-white">
          {username}'s Game
        </h1>

        {/* dropdown */}
        <div className='px-5 pt-5'>
          <div className='flex justify-center items-end my-5'>
            <ScoreDisplay currScore={score} />
          </div>
          <Dropdown selected={selected} setSelected={setSelected} teams={teams} />
        </div>
        {/* Player Boxes */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-5 gap-4 px-5">
          {players_arr}
        </div>

        <div>
          <div className='px-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
            {guessed_players}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Game;