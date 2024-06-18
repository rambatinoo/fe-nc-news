import { format } from "date-fns";

export const CommentCard = ({ comment }) => {
  return (
    <li key={comment.comment_id} className="comment_list_item">
      <div className="comment_card">
        <p className="comment_body">{comment.body}</p>
        <div className="comment_info">
          <div className="comment_likes">
            <button>Like</button>
            <p>{comment.votes}</p>
          </div>
          <p>By {comment.author}</p>
        </div>
      </div>
    </li>
  );
};
