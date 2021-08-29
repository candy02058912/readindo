import axios from "axios";

export const getNews = () =>
  axios.request({
    method: "GET",
    url: "https://free-news.p.rapidapi.com/v1/search",
    params: { q: "covid OR bitcoin OR olahraga", lang: "id", page_size: 5 },
    headers: {
      "x-rapidapi-host": "free-news.p.rapidapi.com",
      "x-rapidapi-key": process.env.NEWS_API_KEY,
    },
  });
