import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getNews } from "server/api/news";
export default withApiAuthRequired(async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const { data } = await getNews();
      if (!data.total_hits) {
        res.json({ data: [] });
        break;
      }

      res.json({
        data: data.articles.map(({ title, media, summary }: any) => ({
          title,
          media,
          summary,
        })),
      });
      break;
    default:
      res.status(405).json({
        error: "method_not_allowed",
        description: `${req.method} method not allowed`,
      });
      break;
  }
});
