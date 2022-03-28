import Head from "next/head";
import LeaderboardList from "../../components/LeaderboardList";

const Game = ({ data }) => {

  return(
    <div className="flex justify-center">
      <Head>
        <title>Leaderboards: Normal</title>
        <meta name="og:image" content="https://cdn-icons-png.flaticon.com/512/889/889442.png" />
        <meta name="og:description" content="Top scores for the 20 minute time setting!" />
        <link rel="icon" href="/basketball-ball.png" />
      </Head>

      <main className="w-[80%]">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide break-words flex justify-end pt-11 pb-7 text-white">
          Leaderboards for Normal Difficulty Games
        </h1>
        <p className="text-base md:text-lg text-gray-400 mb-3">
          Check out the top scores for the <span className="text-orange-500 italic">Normal</span> difficulty setting. <br></br>Click on any of the games to
          view the game and see what NBA players they guessed or missed!
        </p>
        <LeaderboardList data={data} />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch game data from API
  const res = await fetch(`http://nba-game.solorio.dev/api/leaderboards/normal`);
  const data = await res.json();
  
  console.log(data);

  return { props: { data } };
}

export default Game;