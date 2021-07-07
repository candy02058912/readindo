import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { deleteWord, getWordList, saveWord } from "server/api/word";

export default withApiAuthRequired(async function handler(req, res) {
  const id = req.url!.split("/")[3];
  switch (req.method) {
    case "DELETE":
      console.log(id);
      await deleteWord(id);
      res.json({});
      break;
    default:
      res.status(405).end();
      break;
  }
});
