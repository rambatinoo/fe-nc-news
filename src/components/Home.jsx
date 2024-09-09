import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import { ArticleCard } from "./ArticleCard";
import { TopicDropdown } from "./TopicDropdown";
import { useSearchParams, useLocation } from "react-router-dom";
import Select from "react-select";

export const Home = () => {
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const topic = searchParams.get("topic");
  const [sort_by, setSortBy] = useState(
    searchParams.get("sort_by") || "created_at"
  );
  const [order, setOrder] = useState(searchParams.get("order") || "desc");
  const [limit, setLimit] = useState(searchParams.get("limit") || 10);
  const p = Number(searchParams.get("p")) || 1;
  const numOfPages = Math.ceil(totalCount / limit);
  const sortByOptions = [
    { value: "created_at", label: "Date Added" },
    { value: "comment_count", label: "Number Of Comments" },
    { value: "votes", label: "Likes" },
  ];

  const orderOptions = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  const articlesPerPageOptions = [
    { value: "5", label: 5 },
    { value: "10", label: 10 },
    { value: "15", label: 15 },
    { value: "20", label: 20 },
    { value: "25", label: 25 },
    { value: "30", label: 30 },
    { value: "35", label: 35 },
    { value: "40", label: 40 },
    { value: "45", label: 45 },
    { value: "50", label: 50 },
  ];

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

  useEffect(() => {
    if (location.state && location.state.reset) {
      setSortBy("created_at");
      setOrder("desc");
      setLimit(10);
      setSearchParams({});
    }
  }, [location.state, setSearchParams]);

  const handleSortSelect = (event) => {
    const newSort = event.value;
    setSortBy(newSort);
    setSearchParams({ sort_by: newSort, order, limit, p });
  };

  const handleOrderSelect = (event) => {
    const newOrder = event.value;
    setOrder(newOrder);
    setSearchParams({ sort_by, order: newOrder, limit, p });
  };

  const handleLimitSelect = (event) => {
    const newLimit = event.value;
    setLimit(newLimit);
    setSearchParams({ sort_by, order, limit: newLimit, p: 1 });
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
        View articles relating to:
        <TopicDropdown />
      </label>
      <div className="sort_order_num_results">
        <label className="dropdown-label">
          Sort by:
          <Select
            options={sortByOptions}
            value={sortByOptions.find((option) => option.value === sort_by)}
            onChange={handleSortSelect}
            className="dropdown-select"
          />
        </label>
        <label className="dropdown-label">
          Order:
          <Select
            options={orderOptions}
            value={orderOptions.find((option) => option.value === order)}
            onChange={handleOrderSelect}
            className="dropdown-select"
          />
        </label>
        <label className="dropdown-label">
          Articles per page:
          <Select
            options={articlesPerPageOptions}
            value={articlesPerPageOptions.find(
              (option) => option.value === limit
            )}
            onChange={handleLimitSelect}
            className="dropdown-select"
          />
        </label>
      </div>
      <p>there are {totalCount} articles matching your search</p>
      <div id="container-for-article-cards">
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
      <div className="page_navigation">
        {p > 1 && (
          <button className="pageNavButton" onClick={() => handlePSelect(1)}>
            Back to Page 1
          </button>
        )}
        {p > 1 && (
          <button
            className="pageNavButton"
            onClick={() => handlePSelect(p - 1)}
          >
            Previous Page
          </button>
        )}
        {p < numOfPages && (
          <button
            className="pageNavButton"
            onClick={() => handlePSelect(p + 1)}
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};
