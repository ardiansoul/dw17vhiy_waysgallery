import React, { useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import logo from "../assets/image/logo.png";
import { API, options } from "../utils/API";
import Dropdown from "./Dropdown";
import avatar from "../assets/image/userIcon.png";

function Header() {
  const history = useHistory();

  const { data, isLoading } = useQuery("profile", () => {
    return API.get(`/user`, options);
  });

  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div
        className={`w-full bg-white h-32 flex justify-between items-center px-10 static`}
      >
        <img
          src={logo}
          alt="waybucks"
          className="w-16"
          onClick={() => {
            history.push("/");
          }}
          style={{
            cursor: "pointer",
          }}
        />
        <div className="w-56 flex justify-between items-center">
          <button
            className="w-20 h-8 bg-base rounded-md text-white outline-none"
            onClick={() => {
              history.push("/add-post");
            }}
          >
            upload
          </button>
          {isLoading || !data?.data.data.avatar ? (
            <img
              src={avatar}
              alt={data?.data.data.fullName}
              className="w-12 h-12 rounded-full  border-base border-2"
              onClick={handleDropdown}
              style={{
                cursor: "pointer",
              }}
            />
          ) : (
            <img
              src={data?.data.data.avatar}
              alt="user"
              className="w-12 h-12 rounded-full object-cover object-center"
              onClick={handleDropdown}
              style={{
                cursor: "pointer",
              }}
            />
          )}
        </div>
      </div>
      {showDropdown && <Dropdown handleDropdown={handleDropdown} />}
    </>
  );
}

export default Header;
