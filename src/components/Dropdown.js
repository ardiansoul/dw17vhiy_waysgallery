import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import transIcon from "../assets/image/transIcon.png";
import userIcon from "../assets/image/userIcon.png";
import logoutIcon from "../assets/image/logoutIcon.png";
import ButtonDropdown from "./ButtonDropdown";

function Dropdown({ handleDropdown }) {
  const [dropdowns, setDropdowns] = useState([
    {
      title: "Profile",
      src: userIcon,
      page: "/profile",
    },
    {
      title: "Order",
      src: transIcon,
      page: "/transaction",
    },
  ]);
  const [state, dispatch] = useContext(AppContext);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    localStorage.clear();
    handleDropdown();
  };

  return (
    <div
      className="bg-white w-48 h-auto absolute z-50 flex flex-col justify-center rounded-lg"
      style={{
        boxShadow: "0px 0px 10px #9E9E9E",
        top: "100px",
        right: "20px",
      }}
    >
      <div>
        {dropdowns.map((dropdown) => (
          <ButtonDropdown
            src={dropdown.src}
            page={dropdown.page}
            title={dropdown.title}
          />
        ))}
        <span className="w-full border-2 flex border-base"></span>
        <button
          className="w-40 h-12 flex items-center m-auto mt-2"
          onClick={() => {
            handleLogout();
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <img src={logoutIcon} alt="logout" className="w-5 mr-2" />
          <h3 className="text-base text-lg font-bold">Logout</h3>
        </button>
      </div>
    </div>
  );
}

export default Dropdown;
