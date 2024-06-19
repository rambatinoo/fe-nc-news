import { format } from "date-fns";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const CommentCard = ({ comment }) => {
  const { user } = useContext(UserContext);
  const canDelete = comment.author === user.username;

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
          {canDelete && <button>Delete</button>}
        </div>
      </div>
    </li>
  );
};
