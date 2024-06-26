// MAKE TOPIC A QUERY ON A REFACTOR SO THAT EVERYTHING IS CONTROLLED BY THE HOME PAGE - TOO MUCH COPY AND PASTE

import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import { TopicDropdown } from "./TopicDropdown";
import { ArticleCard } from "./ArticleCard";

export const SpecificTopicArticles = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);

  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";
  const limit = searchParams.get("limit") || 10;
  const p = Number(searchParams.get("p")) || 1;
  const numOfPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic, sort_by, order, limit, p)
      .then((response) => {
        setArticles(response.articles);
        setTotalCount(response.totalCount);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [topic, sort_by, order, limit, p]);

  const handleSortSelect = (event) => {
    const newSort = event.target.value;
    setSearchParams({ sort_by: newSort, order, limit, p });
  };

  const handleOrderSelect = (event) => {
    const newOrder = event.target.value;
    setSearchParams({ sort_by, order: newOrder, limit, p });
  };

  const handleLimitSelect = (event) => {
    const newLimit = event.target.value;
    setSearchParams({ sort_by, order, limit: newLimit, p });
  };

  const handlePSelect = (newP) => {
    setSearchParams({ sort_by, order, limit, p: newP });
  };

  if (error) {
    return (
      <div>
        <h2>Error status: {error.status}</h2>
        <h2>{error.msg}</h2>
      </div>
    );
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <label>
        You are viewing articles relating to {topic}, want to change?
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
        <label>
          Articles per page:
          <select value={limit} onChange={handleLimitSelect}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="35">35</option>
            <option value="40">40</option>
            <option value="45">45</option>
            <option value="50">50</option>
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
      <div className="page_navigation">
        {p > 1 && (
          <button onClick={() => handlePSelect(1)}>Back to Page 1</button>
        )}
        {p > 1 && (
          <button onClick={() => handlePSelect(p - 1)}>Previous Page</button>
        )}
        {p < numOfPages && (
          <button onClick={() => handlePSelect(p + 1)}>Next Page</button>
        )}
      </div>
    </div>
  );
};
