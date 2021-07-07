import { getSession, Session, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { deleteWord, getWordList, saveWord } from "server/api/word";

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = getSession(req, res) as Session;
  const userId = user.uid;
  switch (req.method) {
    case "GET":
      const data = await getWordList(userId);
      res.json({ data });
      break;
    case "POST":
      const { text, translation } = req.body;
      if (!text || !translation) {
        res.status(400).json({
          error: "bad_request",
          description: `invalid request`,
        });
        break;
      }
      await saveWord(userId, text, translation);
      res.json({});
      break;
    default:
      res.status(405).end();
      break;
  }
});
