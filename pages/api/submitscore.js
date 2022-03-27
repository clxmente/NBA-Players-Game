import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler (req, res) {
  if (req.method !== "POST") { res.status(405).send({ message: "Only POST requests allowed." }); return;}

  const body = req.body;
  if (!body.username || !body.captcha) { return res.status(422).json({
    message: "Unprocessable request, please provide the required fields."
  })};

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${body.captcha}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        method: "POST",
      }
    );
    const captchaValidation = await response.json();
    /*
    Structure of response from captcha:
      {
        "success": true|false,
        "challenge_ts": timestamp,
        "hostname": string,
        "error-codes": [...]
      }
    */
    if (captchaValidation.success) {
      //! SAVE TO DATABASE HERE IF SUCCESS
      // generate a game id
      const game_id = uuidv4();
      console.log(body);
      return res.status(201).json({ link: `http://localhost:3000/games/${game_id}`});
    }

    // false captchaValidation
    return res.statsu(422).json({
      message: "called func ?"
    });

  } catch (error) {
    console.log(error);
    return res.status(422).json({ message: "Something went wrong" })
  }
}