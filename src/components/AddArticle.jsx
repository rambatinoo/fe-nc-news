export const AddArticle = () => {
  let topicSelected = false;
  return (
    <div>
      {!topicSelected ? (
        <div>
          <h3>Please select a topic</h3>
          <label>
            or create a new topic
            <input type="checkbox" />
          </label>
        </div>
      ) : null}
      <form>
        <label>
          {" "}
          Title:
          <input />
        </label>
        <label>
          {" "}
          Text:
          <input />
        </label>
        <label>
          {" "}
          Image URL:
          <input />
        </label>
      </form>
    </div>
  );
};

// POST /api/articles": {
//   "description": "adds a new article to the database and returns the added article, article url is optional",
//   "exampleBody": {
//     "author": "butter_bridge",
//     "title": "How to eat bricks",
//     "body": "don't",
//     "topic": "cats",
//     "article_img_url": "https://libreshot.com/wp-content/uploads/2018/02/orange-brick-wall.jpg"
//   },
//   "queries": [

//   ],
