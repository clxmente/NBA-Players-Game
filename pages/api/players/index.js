// api endpoint: GET /api/players
// returns an array of objects of ALL players
import Data from "../../../data/players.json";

export default function handler(req, res) {
  res.status(200).json(Data);
}