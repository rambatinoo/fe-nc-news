import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";

export const SpecificTopicArticles = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    console.log(topic);
    getArticles(topic).then((response) => {
      console.log(response);
    });
  }, []);

  return <h1>{topic} Articles</h1>;
};
