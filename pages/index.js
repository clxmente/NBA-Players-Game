import Head from 'next/head';
import { useState } from 'react';
import Countdown from 'react-countdown';
import PlayerBox from '../components/PlayerBox';
import Data from "../data/players.json"; // player data json file

const score = 0;

export default function Home() {

  // Input Field States
  const [name, setName] = useState("");
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);

  // Team Selection States
  const [currTeam, setCurrTeam] = useState("ATL");

  // Start/Timer Button States
  const [timerVal, setTimerVal] = useState("Start Game");
  const [timerDisabled, setTimerDisabled] = useState(false);
  
  // react-countdown timer renderer function
  const renderer = ({ formatted: {minutes, seconds}, completed}) => {
    /* formatted: takes the formatted componenets based on the props.
    in this case its used to utilize the zeroPadTime{2} prop to display
    numbers like 00:00. Numbers show as 0:0 without. */
    if (completed) {
        setTimerVal("Good Job!")
        return <span>{timerVal}</span>;
    } else {
        return <span>{minutes}:{seconds}</span>;
    }
  }
  const queryData = (e) => {
    e.preventDefault();
    if (Data.filter(player => player.FULL_NAME.toLowerCase() === name.toLowerCase()).length > 0) { // check if player exists

      score++;
      console.log("CURRENT SCORE: " + score)

      let curr_player_data = Data.find(player => player.FULL_NAME.toLowerCase() === name.toLowerCase());
      if (curr_player_data.TEAM != currTeam) { setCurrTeam(curr_player_data.TEAM) } // switch grid to player team if you guess correct player on another team

    } else { console.log("NO PLAYER WITH NAME: " + name) }
    setName(""); // clear field after enter
  }

  function startGameFunc() {
    /*  After click set the button text to a countdown timer. 
    The date prop decides how long the countdown is. We get the current
    time and add 300000 milliseconds (5 minutes) to set the timer to 5
    minutes.
    zeroPadTime{2} pads the time to appear as 00:00:00.
    The renderer prop uses the renderer function to format the countdown
    to our liking. */
    if (submitBtnDisabled === true) { setSubmitBtnDisabled(false); }
    setTimerDisabled(true);
    setTimerVal(<Countdown date={Date.now() + 30000} zeroPadTime={2} renderer={renderer} onComplete={() => {setTimerDisabled(false); setSubmitBtnDisabled(true); console.log("FINAL SCORE: " + score)}} />);
  }

  // Players map
  const players_arr = Data.filter(player => player.TEAM===currTeam).map((data, id) => { // filter the whole player array data to players with team == currTeam
    if (data.JERSEY_NUM) {
      var jersey_no = "#" + data.JERSEY_NUM;
    } else { jersey_no = "-"}

    return (
      <PlayerBox key={id} name={data.FULL_NAME} team={data.TEAM} number={jersey_no} position={data.POS} />
    )
  })

  return (
    <div>
      <Head>
        <title>NBA Player Guess</title>
        <meta name="description" content="Name as many NBA players as you can within the time limit!" />
        <link rel="icon" href="/basketball-ball.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <main>
        <h1 className="text-lg md:text-xl font-semibold tracking-wide break-words flex justify-center py-7 px-3 md:px-0">
          How Many NBA Players Can You Name Within The Time Limit?
        </h1>
        
        {/* Start Input/Submit */}
        <div className='flex justify-center items-center'>
          {/* Player Name Form */}
          <div className='flex justify-center'>
            <form className='block md:flex md:items-center' onSubmit={queryData}>
              <div className='flex border-b border-[#17408B] py-2'>
                <input
                  className='appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 focus:outline-none focus:ring-0'
                  type="text"
                  placeholder="NBA Player Name"
                  value={name}
                  onInput={e => {setName(e.target.value)}}
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
              <div className='flex justify-end'>
              <button
                className="flex-shrink-0 bg-[#C9082A] hover:bg-[#8D061D] border-[#C9082A] hover:border-[#8D061D] text-sm border-4 text-white py-1 px-7 rounded mt-5 md:mt-0 md:ml-8 disabled:hover:bg-[#C9082A] disabled:hover:cursor-not-allowed disabled:hover:border-[#C9082A]"
                disabled={timerDisabled}
                type="button"
                onClick={startGameFunc}
              >
                {timerVal}
              </button>
              {/* End Start BTN */}
              </div>
            </form>
          </div>
        </div>
        {/* End Input/Submit */}

        {/* Player Boxes */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-5 gap-4 px-5">
          {players_arr}
        </div>
      </main>
    </div>
  )
}
