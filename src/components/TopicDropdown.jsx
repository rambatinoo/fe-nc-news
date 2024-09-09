import Select from "react-select";
import { useState, useEffect } from "react";
import { getTopics } from "../utils/api";
import { useSearchParams } from "react-router-dom";

export const TopicDropdown = () => {
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event) => {
    const selectedTopic = event.value;
    if (selectedTopic) {
      setSearchParams({ topic: selectedTopic });
    } else {
      searchParams.delete("topic");
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    getTopics()
      .then((topics) => {
        const newOptions = topics.map((topic) => {
          return { value: topic.slug, label: topic.slug };
        });
        setOptions([{ value: null, label: "All Topics" }, ...newOptions]);
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

  return (
    <div id="topic_dropdown">
      <Select options={options} onChange={handleChange} />{" "}
    </div>
  );
};
