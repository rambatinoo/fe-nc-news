import Select from "react-select";
import { useState, useEffect } from "react";
import { getTopics } from "../utils/api";
import { useNavigate } from "react-router-dom";

export const TopicDropdown = () => {
  const navigate = useNavigate();
  const handleChange = (event) => {
    navigate(`/articles/topics/${event.value}`);
  };

  const [options, setOptions] = useState([]);
  useEffect(() => {
    getTopics().then((topics) => {
      const newOptions = topics.map((topic) => {
        return { value: topic.slug, label: topic.slug };
      });
      setOptions(newOptions);
    });
  }, []);

  return <Select options={options} onChange={handleChange} />;
};
