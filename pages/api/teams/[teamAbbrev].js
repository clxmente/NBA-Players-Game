// api endpoint: /api/teams/{teamAbbrev}
// returns an array of objects of all players in team

import Data from "../../../data/players.json";

export default function handler(req, res) {

  const { teamAbbrev } = req.query;

  var players_data = Data.filter(player => player.TEAM === teamAbbrev);
  if (players_data.length > 0) {
    // valid team so return data
    res.status(200).json(players_data);
  } else { res.status(404).json({ message: "No Record Found." }) }

}