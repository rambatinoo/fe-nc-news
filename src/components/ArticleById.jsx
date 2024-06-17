import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/api";
import { format } from "date-fns";

export const ArticleById = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [date, setDate] = useState("");
  console.log(article);
  console.log(date);

  useEffect(() => {
    getArticleById(article_id).then((response) => {
      setArticle(response);
      setDate(format(new Date(response.created_at), "EEE d MMMM yyyy"));
    });
  }, []);
  return (
    <div>
      <h2>
        {article.title} By {article.author}
      </h2>
      <h3>
        {article.topic} - article posted: {date}
      </h3>
      <p>{article.body}</p>
      <img src={article.article_img_url}></img>
      <div>
        <button>Like</button>
        <p>Likes: {article.votes}</p>
      </div>
      <button>See {article.comment_count} Comments</button>
    </div>
  );
};
