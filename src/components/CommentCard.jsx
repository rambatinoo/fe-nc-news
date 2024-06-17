import { format } from "date-fns";

export const CommentCard = ({ comment }) => {
  console.log(comment.comment_id);
  //   const date = format(new Date(comment.created_at), "EEE d MMMM yyyy");

  return (
    <li key={comment.comment_id} className="comment_list_item">
      <div className="comment_card">
        <p className="comment_body">{comment.body}</p>
        <div className="comment_info">
          <button>Like</button>
          <p>{comment.votes}</p>
          <p>By {comment.author}</p>
        </div>
        {/* <p>On {date}</p> */}
      </div>
    </li>
  );
};
