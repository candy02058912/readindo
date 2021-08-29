import Carousel from "@elements/Carousel/Carousel";
import axios from "axios";
import { useEffect, useState } from "react";

const NewsCarousel = ({ onClick }: any) => {
  const [slides, setSlides] = useState([]);
  useEffect(() => {
    async function fetchNews() {
      try {
        const {
          data: { data },
        } = await axios.get(`/api/news`);
        setSlides(data);
      } catch (err) {
        const { data } = err.response;
        alert(data.description);
      }
    }
    fetchNews();
  }, []);
  return <Carousel slides={slides} onClickSlide={onClick} />;
};
export default NewsCarousel;
