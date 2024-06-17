import { useEffect, useState } from "react";
import { getArticles } from "../utils.js/api";
import { ArticleCard } from "./ArticleCard";

export const Home = () => {
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    getArticles().then((response) => {
      setArticles(response.articles);
      setTotalCount(response.totalCount);
    });
  }, []);
  console.log(articles);
  console.log(totalCount);
  return (
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
  );
};
