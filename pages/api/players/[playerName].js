// api endpoint: GET /api/players/{playerName}
// returns a JSON object with player information if player exists

import Data from "../../../data/players.json";

export default function handler(req, res) {
  const { playerName } = req.query;

  var player_data = Data.filter(player => player.FULL_NAME.toLowerCase() === playerName.toLowerCase());

  if (player_data.length > 0) {
    // player exists so return player data
    res.status(200).json(player_data);
  } else { res.status(404).json({ message: "No Record Found" }) }
}