import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteComment,
  getArticleById,
  getComments,
  patchArticleLikes,
  postNewComment,
} from "../utils/api";
import { format } from "date-fns";
import { CommentCard } from "./CommentCard";
import { UserContext } from "../contexts/UserContext";

export const ArticleById = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [date, setDate] = useState("");
  const [clicked, setClicked] = useState(false);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeError, setlikeError] = useState(null);
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [error, setError] = useState(null);

  const handleCommentClick = () => {
    getComments(article_id).then((response) => {
      setComments(response);
      setClicked(true);
    });
  };

  const handleHideComments = () => {
    setClicked(false);
    setComments([]);
  };

  const handleArticleLike = () => {
    const increment = liked ? -1 : 1;
    setArticle({ ...article, votes: article.votes + increment });
    setLiked(!liked);
    setlikeError(null);
    patchArticleLikes(article_id, increment).catch((error) => {
      setlikeError("Unable to change likes, please try again");
      setArticle({ ...article, votes: article.votes - increment });
      setLiked(!liked);
    });
  };

  const handleNewComment = (event) => {
    event.preventDefault();
    const newComment = event.target[0].value;
    const userPosting = user.username;
    postNewComment(article_id, newComment, userPosting)
      .then((newComment) => {
        setNewComment("");
        setComments((currentComments) => {
          return [newComment, ...currentComments];
        });
        setCommentError(null);
      })
      .catch((error) => {
        setCommentError("unable to post comment, please try again");
      });
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId)
      .then(() => {
        setComments((currentComments) => {
          return currentComments.filter(
            (comment) => comment.comment_id !== commentId
          );
        });
        setDeleteError(null);
      })
      .catch((error) => {
        setDeleteError("Unable to delete comment, please try again");
      });
  };

  useEffect(() => {
    getArticleById(article_id)
      .then((response) => {
        setArticle(response);
        setDate(format(new Date(response.created_at), "EEE d MMMM yyyy"));
      })
      .catch((error) => {
        setError(error);
      });
  }, [comments]);

  if (error) {
    return (
      <div>
        <h2>Error status: {error.status}</h2>
        <h2>{error.msg}</h2>
      </div>
    );
  }
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
        {!liked ? (
          <button onClick={handleArticleLike}>Like</button>
        ) : (
          <button onClick={handleArticleLike}>Unlike</button>
        )}
        {likeError ? <p className="like_comment_error">{likeError}</p> : null}
        <p>Likes: {article.votes}</p>
      </div>
      {!clicked ? (
        <button onClick={handleCommentClick} className="show_hide_comments">
          See {article.comment_count} Comments
        </button>
      ) : (
        <div>
          <button onClick={handleHideComments} className="show_hide_comments">
            Hide Comments
          </button>
          <form onSubmit={handleNewComment}>
            <label>
              Add a new comment
              <textarea
                multiline="true"
                value={newComment}
                onChange={(event) => {
                  setNewComment(event.target.value);
                }}
              ></textarea>
            </label>
            <button>Add comment</button>
          </form>
          {commentError ? (
            <p className="post_comment_error">{commentError}</p>
          ) : null}
        </div>
      )}
      {deleteError ? (
        <p className="delete_comment_error">{deleteError}</p>
      ) : null}
      <ul>
        {comments.map((comment) => {
          return (
            <div key={comment.comment_id}>
              <CommentCard comment={comment} onDelete={handleDeleteComment} />
            </div>
          );
        })}
      </ul>
    </div>
  );
};
