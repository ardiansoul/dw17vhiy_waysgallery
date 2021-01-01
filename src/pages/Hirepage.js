import Axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import { baseUrl, options } from "../utils/API";

function Hirepage({ location }) {
  const [mutate] = useMutation((form) =>
    Axios.post(`${baseUrl}api/v1/hired`, form, options)
  );

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: null,
    endDate: null,
    price: null,
    orderTo: location.state.orderTo,
  });
  const [alert, setAlert] = useState(false);

  const history = useHistory();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutate(form, {
        onSuccess: (data) => {
          setAlert(true);
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-screen relative">
      <Header />
      {alert && (
        <div
          className="border-2 border-base h-20 rounded absolute bg-white flex justify-center items-center"
          style={{
            width: "500px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
          }}
          onClick={() => history.push("/transaction")}
        >
          <h1 className="text-lg text-base">
            We have sent you offer, please wait for the user to accept it
          </h1>
        </div>
      )}
      <div className="w-8/12 h-full m-auto">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-10/12 h-12 mb-2 border-2 border-base rounded-md px-2 mb-4"
            placeholder="Title"
            name="title"
            value={form.title}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <textarea
            placeholder="Description"
            name="description"
            className="w-10/12 h-32 mb-2 border-2 border-base rounded-md px-2 mb-4"
            value={form.description}
            onChange={(e) => {
              handleChange(e);
            }}
          ></textarea>
          <div className="w-10/12 mb-2 flex justify-between mb-4">
            <input
              type="date"
              className="w-5/12 h-12 border-2 border-base rounded-md"
              placeholder="Start Project"
              name="startDate"
              value={form.startDate}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              type="date"
              placeholder="End Project"
              className="w-5/12 h-12 border-2 border-base rounded-md"
              name="endDate"
              value={form.endDate}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <input
            type="text"
            className="w-10/12 h-12 mb-2 border-2 border-base rounded-md"
            placeholder="Price"
            name="price"
            value={form.price}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <div className="my-4">
            <button
              onClick={() => {
                history.push("/home");
              }}
              className="w-24 h-10 bg-white border-2 mr-2 border-base rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-24 h-10 text-white bg-base rounded-md"
            >
              Bidding
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Hirepage;
