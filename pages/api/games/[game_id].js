import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(req, res) {

  if (req.method !== "GET") { res.status(405).send({ message: "Only GET requests allowed" }); return;}

  const { game_id } = req.query;
  
  const { data, error } = await supabase
  .from("games")
  .select("*").eq("game_id", game_id);
  
  if (error) { throw error; }
  res.status(201).send(data);
}