import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import { TopicDropdown } from "./TopicDropdown";
import { ArticleCard } from "./ArticleCard";

export const SpecificTopicArticles = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic)
      .then((response) => {
        setArticles(response.articles);
        setTotalCount(response.totalCount);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [topic]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <label>
        You are viewing articles relating to {topic}, want to change?
        <TopicDropdown />
      </label>
      <p>there are {totalCount} articles matching your search</p>
      <ul className="articles_list">
        {articles.map((article) => {
          return (
            <div>
              <li className="article_card" key={article.article_id}>
                <ArticleCard article={{ article }} />
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
