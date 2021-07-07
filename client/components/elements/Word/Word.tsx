import { PlusSquareIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import classNames from "classnames";
import { useState } from "react";

type Props = {
  text: string;
};

const Word = ({ text }: Props) => {
  const [selected, setSelected] = useState(false);
  const [translated, setTranslated] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [word, setWord] = useState("");
  const handleClick = async () => {
    if (selected) {
      setSelected(false);
    } else {
      setSelected(true);
      setTranslated("(Loading...)");
      const {
        data: { data },
      } = await axios.get(`/api/words/${text}`);
      if (data.translations.length > 0) {
        setTranslated(data.translations[0].displayTarget);
        setWord(data.displaySource);
        setLoaded(true);
      } else {
        setTranslated("(Not found)");
      }
    }
  };
  const handleSave = async () => {
    const ori = translated;
    setTranslated("(Saving...)");
    await axios.post(`/api/word-list`, {
      text: word,
      translation: translated,
    });
    setSaved(true);
    setTranslated(ori);
  };
  return (
    <Box display="inline-block" textAlign="center">
      {selected && (
        <Box>
          {translated}
          {loaded && !saved && (
            <PlusSquareIcon ml={2} onClick={handleSave} cursor="pointer" />
          )}
        </Box>
      )}
      <Box className={classNames("word", { selected })} onClick={handleClick}>
        {text}
      </Box>
    </Box>
  );
};

export default Word;
