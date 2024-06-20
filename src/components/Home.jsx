import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import { ArticleCard } from "./ArticleCard";
import { TopicDropdown } from "./TopicDropdown";
import { useSearchParams } from "react-router-dom";

export const Home = () => {
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);
    getArticles(null, sort_by, order)
      .then((response) => {
        setArticles(response.articles);
        setTotalCount(response.totalCount);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [sort_by, order]);

  const handleSortSelect = (event) => {
    const newSort = event.target.value;
    setSearchParams({ sort_by: newSort, order });
  };

  const handleOrderSelect = (event) => {
    const newOrder = event.target.value;
    setSearchParams({ sort_by, order: newOrder });
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <label>
        View articles relating to:
        <TopicDropdown />
      </label>
      <div className="sort_order_num_results">
        <label>
          Sort by:
          <select value={sort_by} onChange={handleSortSelect}>
            <option value="created_at">Date Added</option>
            <option value="comment_count">Number Of Comments</option>
            <option value="votes">Likes</option>
          </select>
        </label>
        <label>
          Order:
          <select value={order} onChange={handleOrderSelect}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
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
