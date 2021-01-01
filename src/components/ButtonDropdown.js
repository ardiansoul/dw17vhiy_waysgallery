import React from "react";
import { useHistory } from "react-router-dom";

function ButtonDropdown({ src, page, title }) {
  const history = useHistory();

  return (
    <button
      className="w-40 h-12 flex items-center m-auto"
      onClick={() => {
        history.push(page);
      }}
      style={{
        cursor: "pointer",
      }}
    >
      <img src={src} alt="user" className="w-5 mr-2" />
      <h3 className="text-base text-lg font-bold">{title}</h3>
    </button>
  );
}

export default ButtonDropdown;
