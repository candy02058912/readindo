import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getYTSubtitles } from "server/api/subtitle";
export default withApiAuthRequired(async function handler(req, res) {
  switch (req.method) {
    case "GET":
      if (!req.query.w) {
        res.status(400).json({
          error: "bad_request",
          description: "missing query param w",
        });
        break;
      }
      try {
        const { w } = req.query;
        const resp = await getYTSubtitles(w as string);
        res.json(resp);
      } catch (err) {
        res.status(404).json({
          error: "not_found",
          description: `subtitles for ${req.query.w} could not be found: ${err}`,
        });
      }
      break;
    default:
      res.status(405).json({
        error: "method_not_allowed",
        description: `${req.method} method not allowed`,
      });
      break;
  }
});
