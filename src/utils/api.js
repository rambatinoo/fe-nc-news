import axios from "axios";
import { renderToPipeableStream } from "react-dom/server";

const newsAPI = axios.create({
  baseURL: "https://backend-project-nc-news-hftl.onrender.com/api",
});

export const getArticles = () => {
  return newsAPI
    .get("/articles")
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getArticleById = (id) => {
  return newsAPI
    .get(`/articles/${id}`)
    .then(({ data }) => {
      return data.article;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getComments = (id) => {
  return newsAPI.get(`/articles/${id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const patchArticleLikes = (id, increment) => {
  const body = { inc_votes: increment };
  return newsAPI
    .patch(`/articles/${id}`, body)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const postNewComment = (articleId, commentText, user) => {
  const body = { username: user, body: commentText };
  return newsAPI
    .post(`/articles/${articleId}/comments`, body)
    .then(({ data }) => {
      return data.comment;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const deleteComment = (id) => {
  return newsAPI
    .delete(`/comments/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const getTopics = () => {
  return newsAPI.get("/topics").then(({ data }) => {
    return data.topics;
  });
};
