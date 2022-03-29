import Head from "next/head";
import LeaderboardList from "../../components/LeaderboardList";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

const diff_colors = {
  easy: "text-green-400",
  normal: "text-orange-500",
  hard: "text-red-500"
}

const LBPage = ({ data, difficulty }) => {

   const noData = (
     <div className="bg-gray-800 border border-1 border-red-500 py-4 px-5 flex justify-center items-center rounded-md">
       <ExclamationCircleIcon className="h-5 w-auto text-red-500 mr-3" />
       <p className="text-red-500 text-sm">No Data Found</p>
     </div>
   )

  return(
    <div className="flex justify-center">
      <Head>
        <title>Leaderboards: {difficulty}</title>
        <meta name="og:image" content="https://cdn-icons-png.flaticon.com/512/889/889442.png" />
        <meta name="og:description" content={`Top scores for the ${difficulty} difficulty setting!`} />
        <meta name="description" content={`Top scores for the ${difficulty} difficulty setting!`} />
        <link rel="icon" href="/basketball-ball.png" />
      </Head>

      <main className="w-[80%]">
        <div className="flex justify-end">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide break-words pt-11 pb-7 text-white text-right">
            Leaderboards for <span className={diff_colors[difficulty]}>{difficulty}</span> Difficulty Games
          </h1>
        </div>
        <p className="text-base md:text-lg text-gray-400 mb-3">
          Check out the top scores for the <span className={`${diff_colors[difficulty]} italic`}>{difficulty}</span> difficulty setting. <br></br>Click on any of the games to
          view the game and see what NBA players they guessed or missed!
        </p>
        {data.length !== 0 ? <LeaderboardList data={data} /> : noData}
      </main>
    </div>
  )
}

export async function getServerSideProps({ query }) {

  const difficulty = query.diff;

  // check to see if the route is valid ( easy/normal/hard )
  // return 404 if its not a valid route
  if (difficulty !== "easy" && difficulty !== "normal" && difficulty !== "hard") {
    return { notFound: true };
  }

  // Fetch game data from API, if a valid route
  const res = await fetch(`http://nba-game.solorio.dev/api/leaderboards/${difficulty}`);
  const data = await res.json();
  
  return { props: { data, difficulty } };
}

export default LBPage;