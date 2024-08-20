import { useState, useEffect } from "react";
import { getTopics } from "../utils/api";
import Select from "react-select";

export const AddArticle = () => {
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [titleError, setTitleError] = useState("");
  const [URLError, setURLError] = useState("");
  let topicSelected = false;

  const [options, setOptions] = useState([]);
  useEffect(() => {
    getTopics()
      .then((topics) => {
        const newOptions = topics.map((topic) => {
          return { value: topic.slug, label: topic.slug };
        });
        setOptions(newOptions);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleTopicSelect = (selectedTopic) => {
    setTopic(selectedTopic.value);
    topicSelected = true;
  };

  const resetTopic = () => {
    setTopic("");
  };

  const validateTitle = () => {
    if (title.length > 50) {
      setTitleError("Title must be less than 50 characters");
      return false;
    } else {
      setTitleError("");
      return true;
    }
  };

  const validateImageURL = () => {
    const regex =
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/;
    if (!regex.test(imageURL)) {
      setURLError("please enter a valid URL");
      return false;
    } else {
      setURLError("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateTitle()) console.log("successful submission");
  };

  return (
    <div>
      {!topic ? (
        <div>
          <h3>What topic is your article?</h3>
          <Select options={options} onChange={handleTopicSelect} />
          {/* here add ability to add a new topic if the article to be added does not fit into the current topics*/}
          {/* <label>
            or create a new topic
            <input type="checkbox" />
          </label> */}
        </div>
      ) : (
        <div>
          <h3>Article topic: {topic}</h3>
          <button onClick={resetTopic}>change topic</button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            {" "}
            Title:
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={validateTitle}
              required
            />
          </label>
          {titleError && <p>{titleError}</p>}
          <label>
            {" "}
            Image URL:
            <input
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              onBlur={validateImageURL}
              required
            />
          </label>
          {URLError && <p>{URLError}</p>}
        </div>
        <label>
          {" "}
          Text:
          <input required />
        </label>
        <button>Post Article!</button>
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
