import axios from "axios";

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
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
