import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getWord } from "server/api/word";

export default withApiAuthRequired(async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const { word } = req.query;
      const response = await getWord(word as string);
      const data = response[0];
      res.json({ data });
      break;
    default:
      res.status(405).end();
      break;
  }
});
