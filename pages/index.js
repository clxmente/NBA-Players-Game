import Head from "next/head";
import axios from "axios";
import { useState, useEffect, useReducer } from "react";
import Countdown from "react-countdown";

// Component imports
import PlayerBox from "../components/PlayerBox";
import Data from "../data/players.json"; // player data json file
import Dropdown from "../components/Dropdown";
import GuessedPlayerBox from "../components/GuessedPlayerBox";
import ScoreDisplay from "../components/ScoreDisplay";
import TimeSelect from "../components/TimeSelect";
import { teams } from "../data/teams";

export default function Home() {
  let score = 0;

  // Input Field States
  const [name, setName] = useState("");
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);

  // Team Selection States
  const [selected, setSelected] = useState(teams[0]);

  // Start/Timer Button States
  const [timerVal, setTimerVal] = useState("Start Game");
  const [timerDisabled, setTimerDisabled] = useState(false);
  const [currTimer, setCurrTimer] = useState(1200000); // 20 minutes default

  // player guess list tracker
  const [guessedPlayers, setGuessedPlayers] = useState([]);

  // react-countdown timer renderer function
  const renderer = ({ formatted: { minutes, seconds }, completed }) => {
    /* formatted: takes the formatted componenets based on the props.
    in this case its used to utilize the zeroPadTime{2} prop to display
    numbers like 00:00. Numbers show as 0:0 without. */
    if (completed) {
      setTimerVal("Good Job!");
      return <span>{timerVal}</span>;
    } else {
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };
  const queryAPI = (e) => {
    e.preventDefault();

    if (!name) {
      return;
    } // no name in field
    // make the API call
    axios
      .get(`/api/players/${name}`)
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          if (!res.data[0].TEAM) {
            return;
          } // player doesn't have a team somehow???? ex; tacko fall

          if (
            guessedPlayers.some(
              (player_object) =>
                player_object.FULL_NAME.toLowerCase() === name.toLowerCase()
            )
          ) {
            console.log("Player already in guess");
          } else {
            // player hasn't been guessed
            score++;
            setGuessedPlayers([res.data[0], ...guessedPlayers]);
            if (res.data[0].TEAM != selected.abbreviation) {
              setSelected(
                teams.find((abbrev) => abbrev.abbreviation === res.data[0].TEAM)
              );
            } // switch boxes to team if player correct and on another team
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setName(""); // clear field after enter
  };

  useEffect(() => {
    document
      .getElementsByName("player-name")
      .forEach((element) => (element.value = ""));
    updatePlayerCards();
  }, [guessedPlayers, selected]);

  function updatePlayerCards() {
    // whenever a user inputs a name, update the player card
    // to show the name of the guessed player.
    let currTeamPlayers = guessedPlayers.filter(
      (player_object) => player_object.TEAM === selected.abbreviation
    );
    currTeamPlayers.forEach(
      (player_object) =>
        (document.getElementById(player_object.FULL_NAME.toLowerCase()).value =
          player_object.FULL_NAME)
    );
  }

  function startGameFunc() {
    /*  After click set the button text to a countdown timer. 
    The date prop decides how long the countdown is. We get the current
    time and add 300000 milliseconds (5 minutes) to set the timer to 5
    minutes. 450000 ms = 7.5 minutes
    zeroPadTime{2} pads the time to appear as 00:00:00.
    The renderer prop uses the renderer function to format the countdown
    to our liking. */
    if (submitBtnDisabled === true) {
      setSubmitBtnDisabled(false);
    }
    setTimerDisabled(true);
    setTimerVal(
      <Countdown
        date={Date.now() + currTimer}
        zeroPadTime={2}
        renderer={renderer}
        onComplete={() => {
          setTimerDisabled(false);
          setSubmitBtnDisabled(true);
          console.log("FINAL SCORE: " + score);
        }}
      />
    );
  }

  // Players map
  // TODO: Convert this to use API calls instead of data.json
  const players_arr = Data.filter(
    (player) => player.TEAM === selected.abbreviation
  ).map((data, id) => {
    // filter the whole player array data to players with team == currTeam
    if (data.JERSEY_NUM) {
      var jersey_no = "#" + data.JERSEY_NUM;
    } else {
      jersey_no = "-";
    }

    return (
      <PlayerBox
        key={id}
        name={data.FULL_NAME}
        team={data.TEAM}
        number={jersey_no}
        position={data.POS}
      />
    );
  });

  const guessed_players = guessedPlayers.map((pobj) => {
    return (
      <GuessedPlayerBox
        key={pobj.FULL_NAME.toLowerCase()}
        person={pobj.FULL_NAME}
      />
    );
  });

  return (
    <div className="flex justify-center">
      <Head>
        <title>NBA Player Guess</title>
        <meta
          name="description"
          content="Name as many NBA players as you can within the time limit!"
        />
        <link rel="icon" href="/basketball-ball.png" />
      </Head>

      <main className="w-[80%]">
        <h1 className="text-lg md:text-3xl font-bold tracking-wide break-words flex justify-center py-7 px-5 text-white">
          How Many NBA Players Can You Name Within The Time Limit?
        </h1>

        {/* Start Input/Submit */}
        <div className="flex justify-center items-center px-5">
          {/* Player Name Form */}
          <div className="flex justify-center">
            <form className="block md:flex md:items-center" onSubmit={queryAPI}>
              <div className="flex border-b border-[#17408B] py-2">
                <input
                  className="appearance-none bg-transparent border-none text-gray-50 mr-3 py-1 px-2 focus:outline-none focus:ring-0"
                  type="text"
                  placeholder="NBA Player Name"
                  value={name}
                  maxLength="24"
                  onInput={(e) => {
                    setName(e.target.value);
                  }}
                />
                <button
                  className="flex-shrink-0 bg-[#17408B] hover:bg-[#102D61] border-[#17408B] hover:border-[#102D61] text-sm border-4 text-white py-1 px-2 rounded disabled:bg-gray-500 disabled:border-gray-500 disabled:hover:cursor-not-allowed"
                  id="submitBtn"
                  disabled={submitBtnDisabled}
                >
                  Submit
                </button>
              </div>
              {/* Start BTN */}
              <div className="block md:flex justify-end">
                <button
                  className="flex-shrink-0 bg-[#C9082A] hover:bg-[#8D061D] border-[#C9082A] hover:border-[#8D061D] text-sm border-4 text-white py-1 px-7 rounded my-5 md:my-0 mr-8 md:mx-8 disabled:hover:bg-[#C9082A] disabled:hover:cursor-not-allowed disabled:hover:border-[#C9082A]"
                  disabled={timerDisabled}
                  type="button"
                  onClick={startGameFunc}
                >
                  {timerVal}
                </button>
                {/* End Start BTN */}
                <TimeSelect
                  timestate={currTimer}
                  setTime={setCurrTimer}
                  disabledState={timerDisabled}
                />
              </div>
            </form>
          </div>
        </div>
        {/* End Input/Submit */}

        {/* dropdown */}
        <div className="px-5 pt-5">
          <div className="flex justify-center items-end my-5">
            <ScoreDisplay currScore={score} />
          </div>
          <Dropdown
            selected={selected}
            setSelected={setSelected}
            teams={teams}
          />
        </div>
        {/* Player Boxes */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-4 px-5">
          {players_arr}
        </div>

        <div>
          <div className="px-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mb-10">
            {guessed_players}
          </div>
        </div>
      </main>
    </div>
  );
}
