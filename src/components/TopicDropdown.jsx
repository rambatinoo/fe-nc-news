import Select from "react-select";
import { useState, useEffect } from "react";
import { getTopics } from "../utils/api";

export const TopicDropdown = () => {
  const [options, setOptions] = useState([
    { value: "apples", label: "apples" },
    { value: "pears", label: "pears" },
  ]);
  useEffect(() => {
    getTopics().then((response) => {
      console.log(response);
    });
  }, []);

  return <Select options={options} />;
};
