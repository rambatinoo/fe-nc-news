import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getComments } from "../utils/api";
import { format } from "date-fns";
import { CommentCard } from "./CommentCard";

export const ArticleById = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [date, setDate] = useState("");
  const [clicked, setClicked] = useState(false);
  const [comments, setComments] = useState([]);

  const handleCommentClick = () => {
    getComments(article_id).then((response) => {
      setComments(response);
    });
  };

  const handleHideComments = () => {
    setClicked(false);
    setComments([]);
  };

  useEffect(() => {
    getArticleById(article_id).then((response) => {
      setArticle(response);
      setDate(format(new Date(response.created_at), "EEE d MMMM yyyy"));
    });
  }, []);
  return (
    <div>
      <h2 className="article_page_title">{article.title}</h2>
      <div className="article_page_main_info">
        <div className="article_side_by_side">
          <img
            src={article.article_img_url}
            className="main_article_image"
          ></img>
        </div>
        <div className="article_side_by_side">
          <h3 className="article_info">{article.topic}</h3>
          <h3 className="article_info">By: {article.author}</h3>
          <h3 className="article_info">Article Posted On: {date}</h3>
        </div>
      </div>

      <p className="article_body">{article.body}</p>

      <div>
        <button>Like</button>
        <p>Likes: {article.votes}</p>
      </div>
      {!clicked ? (
        <button onClick={handleCommentClick}>
          See {article.comment_count} Comments
        </button>
      ) : (
        <button onClick={handleHideComments}>Hide Comments</button>
      )}
      <ul>
        {comments.map((comment) => {
          return (
            <div>
              <CommentCard comment={comment} />
            </div>
          );
        })}
      </ul>
    </div>
  );
};
