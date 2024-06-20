import Select from "react-select";
import { useState, useEffect } from "react";
import { getTopics } from "../utils/api";
import { useNavigate } from "react-router-dom";

export const TopicDropdown = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (event) => {
    navigate(`/articles/topics/${event.value}`);
  };

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

  if (error) {
    return (
      <h3>
        topic bar not loading due to {error.status}: {error.msg}
      </h3>
    );
  }

  return <Select options={options} onChange={handleChange} />;
};
