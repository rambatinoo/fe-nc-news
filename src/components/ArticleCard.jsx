import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";

export const ArticleCard = ({ article }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={article.article.article_img_url}
          alt="the picture associated with the article"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {article.article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.article.topic}
          </Typography>
        </CardContent>
        <p>Author: {article.article.author}</p>
      </CardActionArea>
      <CardActions>
        <Button size="small">like</Button>
        <div>{article.article.votes}</div>
      </CardActions>
    </Card>
  );
};
