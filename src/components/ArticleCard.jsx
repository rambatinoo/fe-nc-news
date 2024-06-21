import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    navigate(`/articles/${event.target.id}`);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image={article.article.article_img_url}
          alt="the picture associated with the article"
          id={article.article.article_id}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {article.article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.article.topic}
            <p>Author: {article.article.author}</p>
          </Typography>
        </CardContent>
        <p id="likes_comments_on_art_card">
          <span id="likes_art_card"> {article.article.votes} Likes </span>{" "}
          <span id="comments_art_card">
            {" "}
            {article.article.comment_count} Comments{" "}
          </span>
        </p>
      </CardActionArea>
    </Card>
  );
};
