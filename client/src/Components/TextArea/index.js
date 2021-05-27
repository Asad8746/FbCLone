import React, { useRef, useEffect, useState } from "react";
import "./index.style.scss";
const TextArea = ({ value, placeholder, id, setValue, error }) => {
  const [textAreaHeight, setTextHeight] = useState("");
  const textAreaRef = useRef();
  useEffect(() => {
    setTextHeight(textAreaRef.current.scrollHeight);
    if (value.length === 0) {
      setTextHeight("auto");
    }
  }, [value]);
  const onChange = (e) => {
    if (textAreaHeight !== "auto") {
      setTextHeight("auto");
    }
    setValue(e.target.value);
  };
  return (
    <textarea
      id={id ? id : ""}
      ref={textAreaRef}
      value={value}
      onChange={onChange}
      style={{ height: textAreaHeight }}
      className={`post__textarea ${error ? "error-input" : ""}`}
      placeholder={placeholder}
    ></textarea>
  );
};

export default TextArea;
